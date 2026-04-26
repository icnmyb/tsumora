// scripts/scrape-mu.mjs
// 麻将連合（μ）の選手名簿をスクレイプし、app/players/roster/mu.ts を生成する。
//
// データソース:
//   - 一覧:   https://mu-mahjong.jp/player/
//   - 個別:   https://mu-mahjong.jp/player/profile/?player_id={id}

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const LIST_URL = "https://mu-mahjong.jp/player/";
const CONCURRENCY = 6;
const THROTTLE_MS = 150;
const UA = "Mozilla/5.0 (compatible; hora-scraper/1.0)";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
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

function parseList(html) {
  const ids = [...new Set([...html.matchAll(/player_id=(\d+)/g)].map((m) => m[1]))];
  return ids.map((id) => ({ playerId: id }));
}

function parseMemberPage(html) {
  const text = decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

  function extract(label, stops) {
    const idx = text.indexOf(label);
    if (idx === -1) return undefined;
    let start = idx + label.length;
    let end = text.length;
    for (const s of stops) {
      const i = text.indexOf(s, start);
      if (i !== -1 && i < end) end = i;
    }
    return text.slice(start, end).trim();
  }

  const stops = [
    "ID", "名前", "ふりがな", "種別", "年度", "出身地", "在住地",
    "麻雀スタイル", "キャッチフレーズ", "戦績", "タイトル", "ツアー",
    "ライバル", "強いと思う人", "尊敬してる人", "ブログ", "ブログURL",
    "一緒に打てるお店", "将来の目標", "趣味", "好きな芸能人", "その他",
  ];

  const kanjiName = extract("名前", stops)?.replace(/\s+/g, "") || "";
  const yomi = extract("ふりがな", stops)?.trim() || "";
  const category = extract("種別", stops)?.trim() || "";
  const year = extract("年度", stops)?.trim() || "";
  const birthplace = extract("出身地", stops)?.replace(/\s+/g, "") || "";

  return { kanjiName, yomi, category, year, birthplace };
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
    birthplace: p.birthplace,
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

// μ 年度 → 入会年: "1997年度" → 1997
function periodToJoinYear(periodRaw) {
  if (!periodRaw) return undefined;
  const m = periodRaw.match(/(\d{4})/);
  if (!m) return undefined;
  const y = parseInt(m[1], 10);
  if (y < 1900 || y > 2100) return undefined;
  return y;
}

const KANA = {
  あ:"a",い:"i",う:"u",え:"e",お:"o",
  か:"ka",き:"ki",く:"ku",け:"ke",こ:"ko",
  さ:"sa",し:"shi",す:"su",せ:"se",そ:"so",
  た:"ta",ち:"chi",つ:"tsu",て:"te",と:"to",
  な:"na",に:"ni",ぬ:"nu",ね:"ne",の:"no",
  は:"ha",ひ:"hi",ふ:"fu",へ:"he",ほ:"ho",
  ま:"ma",み:"mi",む:"mu",め:"me",も:"mo",
  や:"ya",ゆ:"yu",よ:"yo",
  ら:"ra",り:"ri",る:"ru",れ:"re",ろ:"ro",
  わ:"wa",を:"o",ん:"n",
  が:"ga",ぎ:"gi",ぐ:"gu",げ:"ge",ご:"go",
  ざ:"za",じ:"ji",ず:"zu",ぜ:"ze",ぞ:"zo",
  だ:"da",ぢ:"ji",づ:"zu",で:"de",ど:"do",
  ば:"ba",び:"bi",ぶ:"bu",べ:"be",ぼ:"bo",
  ぱ:"pa",ぴ:"pi",ぷ:"pu",ぺ:"pe",ぽ:"po",
};
function toRomaji(yomi) {
  if (!yomi) return "";
  let s = yomi.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (KANA[ch]) out += KANA[ch];
    else if (/[a-z0-9]/.test(ch)) out += ch;
  }
  return out;
}

function formatNameEn(yomi) {
  if (!yomi) return undefined;
  const parts = yomi.trim().split(/\s+/);
  if (parts.length < 2) return toRomaji(yomi).replace(/^./, (c) => c.toUpperCase());
  const [surname, ...rest] = parts;
  const given = rest.join("");
  const cap = (s) => toRomaji(s).replace(/^./, (c) => c.toUpperCase());
  return `${cap(given)} ${cap(surname)}`;
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
  console.error("[1/3] fetch μ player listing");
  const listHtml = await fetchText(LIST_URL);
  const list = parseList(listHtml);
  console.error(`      → ${list.length} player_ids`);

  console.error(`[2/3] fetch ${list.length} individual profile pages`);
  let done = 0;
  const profiles = await pool(list, CONCURRENCY, async (m) => {
    try {
      const html = await fetchText(`https://mu-mahjong.jp/player/profile/?player_id=${m.playerId}`);
      const parsed = parseMemberPage(html);
      done++;
      if (done % 25 === 0) process.stderr.write(`      ${done}/${list.length}\n`);
      return { ...m, ...parsed };
    } catch (err) {
      done++;
      console.error(`      WARN ${m.playerId}: ${err.message}`);
      return m;
    }
  });

  console.error("[3/3] merge + generate roster/mu.ts");

  const dataTs = await fs.readFile(path.join(REPO_ROOT, "app/players/data.ts"), "utf-8");
  const featuredNames = new Set(
    [...dataTs.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])
  );

  const usedIds = new Set();
  for (const file of ["jpml.ts", "saikouisen.ts", "npm.ts", "rmu.ts"]) {
    try {
      const t = await fs.readFile(path.join(REPO_ROOT, "app/players/roster", file), "utf-8");
      for (const m of t.matchAll(/id:\s*"([a-z0-9_-]+)"/g)) usedIds.add(m[1]);
    } catch {
      // file may not exist yet
    }
  }
  for (const m of dataTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)) usedIds.add(m[1]);

  const rosterEntries = [];
  let skipped = 0;
  for (const p of profiles) {
    const name = (p.kanjiName || "").replace(/\s+/g, "");
    if (!name) continue;
    if (featuredNames.has(name)) {
      skipped++;
      continue;
    }
    let id = toRomaji(p.yomi || "").replace(/\s+/g, "_");
    if (!id) id = `mu_${p.playerId}`;
    while (usedIds.has(id)) id = `${id}-2`;
    usedIds.add(id);

    const period = p.year ? `${p.year}年度` : undefined;
    rosterEntries.push({
      id,
      name,
      org: "μ",
      league: p.category || "—",
      nameEn: formatNameEn(p.yomi),
      period,
      joinYear: periodToJoinYear(period),
      birthplace: p.birthplace || undefined,
      href: `/players/${id}`,
    });
  }

  console.error(`      → ${rosterEntries.length} roster entries (skipped ${skipped} featured)`);

  const header = `// app/players/roster/mu.ts
// AUTO-GENERATED by scripts/scrape-mu.mjs — do not edit by hand.
// Source: https://mu-mahjong.jp/player/
import type { RosterPlayer } from "../data";

export const MU_ROSTER: RosterPlayer[] = [
`;
  const body = rosterEntries.map(serializePlayer).join(",\n");
  const footer = "\n];\n";
  await fs.writeFile(path.join(REPO_ROOT, "app/players/roster/mu.ts"), header + body + footer);
  console.error(`      ✓ wrote app/players/roster/mu.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
