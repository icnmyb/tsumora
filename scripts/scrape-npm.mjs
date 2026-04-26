// scripts/scrape-npm.mjs
// 日本プロ麻雀協会 (NPM) の選手名簿をスクレイプし、app/players/roster/npm.ts を生成する。
//
// データソース:
//   - 一覧:   https://npm2001.com/player/
//   - 個別:   https://npm2001.com/player/{slug}/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const LIST_URL = "https://npm2001.com/player/";
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
  // Extract all unique /player/{slug}/ URLs
  const matches = [...html.matchAll(/href="https:\/\/npm2001\.com\/player\/([a-z0-9_-]+)\/"/g)];
  const seen = new Set();
  const out = [];
  for (const m of matches) {
    const slug = m[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug });
  }
  return out;
}

function parseMemberPage(html) {
  // Extract <article> content as a flat text blob for label-based parsing.
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  if (!articleMatch) return { kanjiName: "", fields: {} };
  const article = articleMatch[1];
  const text = decodeEntities(article.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

  // Title might be "逢川恵夢 | 日本プロ麻雀協会"
  const titleMatch = html.match(/<title>([\s\S]+?)<\/title>/);
  const titleRaw = titleMatch ? decodeEntities(titleMatch[1]) : "";
  const titleClean = titleRaw.replace(/\s*[|｜]\s*日本プロ麻雀協会.*$/s, "").trim();
  const kanjiName = /[一-龥ぁ-んァ-ヴ]/.test(titleClean)
    ? titleClean.replace(/\s+/g, "")
    : titleClean;

  // Field extraction by label position in the flat text
  function extract(label, stopLabels) {
    const idx = text.indexOf(label);
    if (idx === -1) return undefined;
    const start = idx + label.length;
    let end = text.length;
    for (const s of stopLabels) {
      const i = text.indexOf(s, start);
      if (i !== -1 && i < end) end = i;
    }
    return text.slice(start, end).trim();
  }

  const stops = [
    "入 会", "入会", "本部所属", "支部所属",
    "生 年 月 日", "出 身 地", "血 液 型", "身 長", "利 き 手",
    "獲得タイトル", "タイトル戦所属リーグ", "雀王戦", "女流雀王戦", "雀竜位戦",
    "好きな麻雀牌", "好きな役", "目標とする麻雀プロ", "麻雀をはじめたきっかけ",
    "Aikawa", "(未定)", "@",
  ];

  const period = extract("入 会", stops) || extract("入会", stops);
  const birthday = extract("生 年 月 日", stops);
  const birthplace = extract("出 身 地", stops);
  const bloodType = extract("血 液 型", stops);

  // 雀王戦 リーグ (e.g., "B2" or "A1")
  const leagueRaw = extract("雀王戦", ["女流雀王戦", "雀竜位戦", "好きな", "獲得"]);
  const womenLeagueRaw = extract("女流雀王戦", ["雀竜位戦", "好きな", "獲得"]);
  const branch = extract("本部所属", stops);

  // Try to grab furigana from the leading portion of article
  // Pattern: "kanjiName ふりがな" appears at start
  const furiganaMatch = text.match(/^[一-龥ぁ-んァ-ヴ\s]+?\s+([ぁ-んー\s]{3,30})\s+(?:入|本部|関西|九州|東北|北海道)/);
  const furigana = furiganaMatch ? furiganaMatch[1].replace(/\s+/g, "") : undefined;

  return {
    kanjiName,
    fields: {
      period: period?.replace(/\s+/g, ""),
      birthday: birthday?.replace(/\s+/g, ""),
      birthplace: birthplace?.replace(/\s+/g, ""),
      bloodType: bloodType?.replace(/\s+/g, ""),
      league: leagueRaw?.match(/^[ABCDEF][1-3]/)?.[0],
      womenLeague: womenLeagueRaw?.match(/^[ABC]/)?.[0],
      furigana,
    },
  };
}

function parseLeague(league, womenLeague) {
  if (league) return league;
  if (womenLeague) return `女流${womenLeague}`;
  return "—";
}

function parseBirthday(raw) {
  if (!raw) return undefined;
  // "8月28日" → "08/28", "8月 28日" already collapsed
  const m = raw.match(/(\d{1,2})月(\d{1,2})日/);
  if (m) return `${m[1].padStart(2, "0")}/${m[2].padStart(2, "0")}`;
  return raw;
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

// NPM 期 → 入会年: 第10期前期 = 2010年入会 を基点に逆算
// joinYear = 2000 + 期番号
function periodToJoinYear(periodRaw) {
  if (!periodRaw) return undefined;
  const m = periodRaw.match(/(\d+)/);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  if (Number.isNaN(n) || n < 1 || n > 100) return undefined;
  return 2000 + n;
}

function formatNameEnFromSlug(slug) {
  // "aikawa-megumu" → "Aikawa Megumu"
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
  console.error("[1/3] fetch player listing");
  const listHtml = await fetchText(LIST_URL);
  const list = parseList(listHtml);
  console.error(`      → ${list.length} player URLs`);

  console.error(`[2/3] fetch ${list.length} individual pages (concurrency=${CONCURRENCY}, throttle=${THROTTLE_MS}ms)`);
  let done = 0;
  const profiles = await pool(list, CONCURRENCY, async (m) => {
    try {
      const html = await fetchText(`https://npm2001.com/player/${m.slug}/`);
      const parsed = parseMemberPage(html);
      done++;
      if (done % 100 === 0) process.stderr.write(`      ${done}/${list.length}\n`);
      return { ...m, ...parsed };
    } catch (err) {
      done++;
      console.error(`      WARN ${m.slug}: ${err.message}`);
      return { ...m, kanjiName: "", fields: {} };
    }
  });

  console.error("[3/3] merge + generate roster/npm.ts");

  const dataTs = await fs.readFile(path.join(REPO_ROOT, "app/players/data.ts"), "utf-8");
  const featuredNames = new Set(
    [...dataTs.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])
  );

  // Read existing rosters to avoid id collisions
  const jpmlTs = await fs.readFile(path.join(REPO_ROOT, "app/players/roster/jpml.ts"), "utf-8");
  const saiTs = await fs.readFile(path.join(REPO_ROOT, "app/players/roster/saikouisen.ts"), "utf-8");
  const usedIds = new Set([
    ...[...dataTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
    ...[...jpmlTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
    ...[...saiTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
  ]);

  const rosterEntries = [];
  let skipped = 0;
  for (const p of profiles) {
    const name = p.kanjiName;
    if (!name) continue;
    if (featuredNames.has(name)) {
      skipped++;
      continue;
    }
    let id = p.slug.replace(/-/g, "_");
    while (usedIds.has(id)) id = `${id}-2`;
    usedIds.add(id);

    const f = p.fields || {};
    const periodRaw = f.period;
    const period = periodRaw
      ? (periodRaw.startsWith("第") ? periodRaw : `第${periodRaw}`)
      : undefined;
    const league = parseLeague(f.league, f.womenLeague);
    const birthday = parseBirthday(f.birthday);
    const birthplace = f.birthplace;
    const bloodType = f.bloodType;

    rosterEntries.push({
      id,
      name,
      org: "NPM",
      league,
      nameEn: formatNameEnFromSlug(p.slug),
      period,
      joinYear: periodToJoinYear(period),
      birthday,
      birthplace,
      bloodType,
      href: `/players/${id}`,
    });
  }

  console.error(`      → ${rosterEntries.length} roster entries (skipped ${skipped} featured)`);

  const header = `// app/players/roster/npm.ts
// AUTO-GENERATED by scripts/scrape-npm.mjs — do not edit by hand.
// Source: https://npm2001.com/player/
import type { RosterPlayer } from "../data";

export const NPM_ROSTER: RosterPlayer[] = [
`;
  const body = rosterEntries.map(serializePlayer).join(",\n");
  const footer = "\n];\n";
  await fs.writeFile(path.join(REPO_ROOT, "app/players/roster/npm.ts"), header + body + footer);
  console.error(`      ✓ wrote app/players/roster/npm.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
