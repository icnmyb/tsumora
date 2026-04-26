// scripts/scrape-saikouisen.mjs
// 最高位戦日本プロ麻雀協会の会員名簿をスクレイプし、app/players/roster/saikouisen.ts を生成する。
//
// データソース:
//   - 一覧:   https://saikouisen.com/members/
//   - 個別:   https://saikouisen.com/members/{slug}/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const LIST_URL = "https://saikouisen.com/members/";
const CONCURRENCY = 8;
const THROTTLE_MS = 100;

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "hora-scraper/1.0 (research)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return await res.text();
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "")).trim();
}

function parseList(html) {
  // <li><a href="https://saikouisen.com/members/{slug}"> ... <p class="name">{display}</p></a></li>
  const blocks = [...html.matchAll(/<li><a href="https:\/\/saikouisen\.com\/members\/([a-z0-9-]+)"[\s\S]*?<p class="name">([^<]+)<\/p>/g)];
  const seen = new Set();
  const out = [];
  for (const b of blocks) {
    const slug = b[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug, displayName: b[2].trim() });
  }
  return out;
}

function parseMemberPage(html) {
  // Title contains kanji name: <title>選手名 – 最高位戦日本プロ麻雀協会</title>
  // Note: title may contain HTML-encoded en-dash (&#8211;); decode before match.
  const titleRaw = (html.match(/<title>([\s\S]+?)<\/title>/) || [])[1] || "";
  const titleDecoded = decodeEntities(titleRaw);
  const kanjiNameWithSpace = titleDecoded.replace(/\s*[–\-—]\s*最高位戦.*$/s, "").trim();
  // Normalize: strip whitespace inside Japanese names so "茅森 早香" → "茅森早香"
  const kanjiName = /[一-龥ぁ-んァ-ヴ]/.test(kanjiNameWithSpace)
    ? kanjiNameWithSpace.replace(/\s+/g, "")
    : kanjiNameWithSpace;

  // Profile dl
  const dlMatch = html.match(/<dl class="profile-list">([\s\S]*?)<\/dl>/);
  const fields = {};
  if (dlMatch) {
    const pairs = [...dlMatch[1].matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)];
    for (const p of pairs) {
      const key = stripTags(p[1]);
      const val = stripTags(p[2]);
      fields[key] = val;
    }
  }
  return { kanjiName, fields };
}

function parseLeague(raw) {
  // Examples:
  //   "A1リーグ" → "A1"
  //   "C3リーグ" → "C3"
  //   "当期リーグ戦未登録 / 女流Bリーグ" → "女流B" (if only women's), else "—"
  //   "A2リーグ / 女流Aリーグ" → "A2" (main league wins)
  if (!raw) return "—";
  const mainMatch = raw.match(/(?:^|\s|\/)\s*([ABCD][1-3])リーグ/);
  if (mainMatch) return mainMatch[1];
  const womenMatch = raw.match(/女流([ABC])リーグ/);
  if (womenMatch) return `女流${womenMatch[1]}`;
  if (/未登録/.test(raw)) return "—";
  return raw.replace(/リーグ/g, "").trim() || "—";
}

function parseBirthday(raw) {
  // "1982/5/4" → "1982/05/04"
  if (!raw) return undefined;
  const m = raw.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!m) return raw;
  return `${m[1]}/${m[2].padStart(2, "0")}/${m[3].padStart(2, "0")}`;
}

function normalizeBloodType(raw) {
  if (!raw) return undefined;
  // Convert fullwidth to halfwidth: Ａ → A
  return raw.replace(/[Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function inferGender(raw) {
  // saikouisen profile has "性別" sometimes? Or infer from 女流リーグ.
  // We mostly leave undefined; women's league flag suggests female but isn't reliable.
  return undefined;
}

function isJapaneseSlug(slug, kanjiName) {
  // Heuristic: slug like "kayamori-sayaka" or "ikeda-takashi" — Japanese surname-given.
  // Foreign members: "aaron-liao", "nima-hosseini" → kanji name might be empty/Latin.
  return /[一-龥ぁ-んァ-ヴ]/.test(kanjiName);
}

function escapeJsString(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function fmtField(key, val) {
  if (val === undefined || val === null || val === "") return null;
  return `${key}: "${escapeJsString(String(val))}"`;
}

function serializePlayer(p) {
  const parts = [
    `id: "${escapeJsString(p.id)}"`,
    `name: "${escapeJsString(p.name)}"`,
    `org: "${p.org}"`,
    `league: "${escapeJsString(p.league)}"`,
  ];
  for (const [k, v] of Object.entries({
    nameEn: p.nameEn,
    period: p.period,
    gender: p.gender,
    birthday: p.birthday,
    birthplace: p.birthplace,
    bloodType: p.bloodType,
    href: p.href,
  })) {
    const f = fmtField(k, v);
    if (f) parts.push(f);
  }
  if (typeof p.joinYear === "number") {
    parts.push(`joinYear: ${p.joinYear}`);
  }
  return `  { ${parts.join(", ")} }`;
}

// 最高位戦 期 → 入会年: 第26期後期 = 2001年入会 を基点に逆算
// joinYear = 1975 + 期番号
function periodToJoinYear(periodRaw) {
  if (!periodRaw) return undefined;
  const m = periodRaw.match(/(\d+)/);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  if (Number.isNaN(n) || n < 1 || n > 100) return undefined;
  return 1975 + n;
}

function formatNameEnFromSlug(slug) {
  // "kayamori-sayaka" → "Kayamori Sayaka"
  // Slugs are surname-givenname order in Japanese members.
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function pool(items, concurrency, fn) {
  const results = [];
  let i = 0;
  const workers = Array(concurrency).fill(0).map(async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
      if (THROTTLE_MS) await new Promise((r) => setTimeout(r, THROTTLE_MS));
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  console.error("[1/3] fetch members listing");
  const listHtml = await fetchText(LIST_URL);
  const list = parseList(listHtml);
  console.error(`      → ${list.length} members listed`);

  console.error(`[2/3] fetch ${list.length} individual member pages (concurrency=${CONCURRENCY}, throttle=${THROTTLE_MS}ms)`);
  let done = 0;
  const profiles = await pool(list, CONCURRENCY, async (m) => {
    try {
      const html = await fetchText(`https://saikouisen.com/members/${m.slug}/`);
      const parsed = parseMemberPage(html);
      done++;
      if (done % 100 === 0) process.stderr.write(`      ${done}/${list.length}\n`);
      return { ...m, ...parsed };
    } catch (err) {
      console.error(`      WARN ${m.slug}: ${err.message}`);
      done++;
      return { ...m, kanjiName: "", fields: {} };
    }
  });

  console.error("[3/3] merge + generate roster/saikouisen.ts");

  // Read featured for dedup
  const dataTs = await fs.readFile(path.join(REPO_ROOT, "app/players/data.ts"), "utf-8");
  const featuredNames = new Set(
    [...dataTs.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])
  );
  const featuredIds = new Set(
    [...dataTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1])
  );

  // Read existing JPML roster ids to avoid id collisions across orgs
  const jpmlTs = await fs.readFile(path.join(REPO_ROOT, "app/players/roster/jpml.ts"), "utf-8");
  const jpmlIds = new Set(
    [...jpmlTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1])
  );

  const taken = new Set([...featuredIds, ...jpmlIds]);
  const rosterEntries = [];
  let skipped = 0;
  let foreignSkipped = 0;
  for (const p of profiles) {
    const name = p.kanjiName || p.displayName;
    if (!name) continue;
    if (featuredNames.has(name)) {
      skipped++;
      continue;
    }
    // For foreign members (no kanji), use displayName as primary, slug as id.
    const isJP = isJapaneseSlug(p.slug, p.kanjiName);

    let id = p.slug.replace(/-/g, "_");
    while (taken.has(id)) id = `${id}-2`;
    taken.add(id);

    const f = p.fields || {};
    const league = parseLeague(f["所属リーグ"]);
    const periodRaw = f["入会期"] || "";
    const period = periodRaw ? (periodRaw.startsWith("第") ? periodRaw : `第${periodRaw}`) : undefined;
    const branch = f["所属本部・支部"] || undefined;
    const birthday = parseBirthday(f["誕生日"]);
    const birthplace = f["出身地"] || undefined;
    const bloodType = normalizeBloodType(f["血液型"]) || undefined;

    rosterEntries.push({
      id,
      name,
      org: "最高位戦",
      league,
      nameEn: isJP ? formatNameEnFromSlug(p.slug) : p.displayName,
      period,
      joinYear: periodToJoinYear(period),
      gender: inferGender(f),
      birthday,
      birthplace,
      bloodType,
      href: `/players/${id}`,
    });
  }

  console.error(`      → ${rosterEntries.length} roster entries (skipped ${skipped} featured)`);

  const header = `// app/players/roster/saikouisen.ts
// AUTO-GENERATED by scripts/scrape-saikouisen.mjs — do not edit by hand.
// Source: https://saikouisen.com/members/
import type { RosterPlayer } from "../data";

export const SAIKOUISEN_ROSTER: RosterPlayer[] = [
`;
  const body = rosterEntries.map(serializePlayer).join(",\n");
  const footer = "\n];\n";
  await fs.writeFile(path.join(REPO_ROOT, "app/players/roster/saikouisen.ts"), header + body + footer);
  console.error(`      ✓ wrote app/players/roster/saikouisen.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
