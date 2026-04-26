// scripts/scrape-rmu.mjs
// RMU の選手名簿をスクレイプし、app/players/roster/rmu.ts を生成する。
//
// データソース:
//   - 一覧:   https://rmu.jp/player_index/license, /player_index/girl, /cms/player_index/player_athlete, /cms/player_index/player_nagasaki
//   - 個別:   https://rmu.jp/player/prof/{id}.htm

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const LIST_URLS = [
  { url: "https://rmu.jp/player_index/license", category: "license" },
  { url: "https://rmu.jp/player_index/girl", category: "girl" },
  { url: "https://rmu.jp/cms/player_index/player_athlete", category: "athlete" },
];
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

function parseListImgs(html) {
  // <img src="/img/player/{id}_index_{rank}.jpg" alt="{name}" ...>
  const matches = [...html.matchAll(/<img[^>]+src="\/img\/player\/(\d+)_index_([A-Za-z]+)\.jpg"[^>]*alt="([^"]+)"/g)];
  return matches.map((m) => ({
    playerId: m[1],
    rank: m[2],
    name: decodeEntities(m[3]).replace(/\s+/g, ""),
  }));
}

function parseMemberPage(html) {
  // Extract structured profile from <td> pairs
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

  const stops = ["選手番号", "氏名", "ヨミ", "生年月日", "出身地", "血液型", "ライセンス", "■", "登録日"];
  const kanjiName = extract("氏名", stops)?.replace(/\s+/g, "") || "";
  const yomi = extract("ヨミ", stops)?.trim() || "";
  const birthday = extract("生年月日", stops)?.trim() || "";
  const birthplace = extract("出身地", stops)?.trim() || "";
  const bloodType = extract("血液型", stops)?.trim() || "";
  const license = extract("ライセンス", stops)?.trim() || "";

  return { kanjiName, yomi, birthday, birthplace, bloodType, license };
}

function parseBirthday(raw) {
  if (!raw) return undefined;
  const m = raw.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (m) return `${m[1]}/${m[2].padStart(2, "0")}/${m[3].padStart(2, "0")}`;
  return raw;
}

function parseLicense(raw) {
  if (!raw) return undefined;
  // "/発行日 SSS (2019/4/1)" → "SSS"
  const m = raw.match(/\b(SSS|SS|S|A|B)\b/);
  return m ? m[1] : undefined;
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
    birthday: p.birthday,
    birthplace: p.birthplace,
    bloodType: p.bloodType,
    rank: p.rank,
    href: p.href,
  })) {
    const f = fmtField(k, v);
    if (f) parts.push(f);
  }
  return `  { ${parts.join(", ")} }`;
}

// Hepburn romanization for ID generation
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
  // "おおい たかはる" → "Takaharu Ooi" (given-surname order, like other featured)
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
  console.error("[1/3] fetch RMU listing pages");
  const allPlayers = new Map(); // playerId → { rank, name, category }
  for (const lst of LIST_URLS) {
    try {
      const html = await fetchText(lst.url);
      const found = parseListImgs(html);
      for (const f of found) {
        if (!allPlayers.has(f.playerId)) {
          allPlayers.set(f.playerId, { ...f, category: lst.category });
        }
      }
      console.error(`      ${lst.category}: ${found.length} entries`);
    } catch (err) {
      console.error(`      WARN ${lst.url}: ${err.message}`);
    }
  }
  console.error(`      → ${allPlayers.size} unique RMU players`);

  console.error(`[2/3] fetch ${allPlayers.size} individual prof pages`);
  let done = 0;
  const profiles = await pool([...allPlayers.values()], CONCURRENCY, async (m) => {
    try {
      const html = await fetchText(`https://rmu.jp/player/prof/${m.playerId}.htm`);
      const parsed = parseMemberPage(html);
      done++;
      if (done % 50 === 0) process.stderr.write(`      ${done}/${allPlayers.size}\n`);
      return { ...m, ...parsed };
    } catch (err) {
      done++;
      console.error(`      WARN ${m.playerId}: ${err.message}`);
      return m;
    }
  });

  console.error("[3/3] merge + generate roster/rmu.ts");

  const dataTs = await fs.readFile(path.join(REPO_ROOT, "app/players/data.ts"), "utf-8");
  const featuredNames = new Set(
    [...dataTs.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])
  );

  const jpmlTs = await fs.readFile(path.join(REPO_ROOT, "app/players/roster/jpml.ts"), "utf-8");
  const saiTs = await fs.readFile(path.join(REPO_ROOT, "app/players/roster/saikouisen.ts"), "utf-8");
  const npmTs = await fs.readFile(path.join(REPO_ROOT, "app/players/roster/npm.ts"), "utf-8");
  const usedIds = new Set([
    ...[...dataTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
    ...[...jpmlTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
    ...[...saiTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
    ...[...npmTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1]),
  ]);

  const rosterEntries = [];
  let skipped = 0;
  for (const p of profiles) {
    const name = (p.kanjiName || p.name || "").replace(/\s+/g, "");
    if (!name) continue;
    if (featuredNames.has(name)) {
      skipped++;
      continue;
    }
    let id = toRomaji(p.yomi || "").replace(/\s+/g, "_");
    if (!id) id = `rmu_${p.playerId}`;
    while (usedIds.has(id)) id = `${id}-2`;
    usedIds.add(id);

    const license = parseLicense(p.license) || p.rank;
    rosterEntries.push({
      id,
      name,
      org: "RMU",
      league: license || "—",
      nameEn: formatNameEn(p.yomi),
      birthday: parseBirthday(p.birthday),
      birthplace: p.birthplace,
      bloodType: p.bloodType,
      rank: license,
      href: `/players/${id}`,
    });
  }

  console.error(`      → ${rosterEntries.length} roster entries (skipped ${skipped} featured)`);

  const header = `// app/players/roster/rmu.ts
// AUTO-GENERATED by scripts/scrape-rmu.mjs — do not edit by hand.
// Source: https://rmu.jp/player_index/*, https://rmu.jp/player/prof/{id}.htm
import type { RosterPlayer } from "../data";

export const RMU_ROSTER: RosterPlayer[] = [
`;
  const body = rosterEntries.map(serializePlayer).join(",\n");
  const footer = "\n];\n";
  await fs.writeFile(path.join(REPO_ROOT, "app/players/roster/rmu.ts"), header + body + footer);
  console.error(`      ✓ wrote app/players/roster/rmu.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
