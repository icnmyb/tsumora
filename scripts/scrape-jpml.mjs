// scripts/scrape-jpml.mjs
// 日本プロ麻雀連盟（JPML）の連盟員名簿をスクレイプし、Ampai の現リーグ情報をマージして
// app/players/roster.ts を生成する。
//
// データソース:
//   - 連盟員名簿: https://www.ma-jan.or.jp/activity/members.html
//   - 現リーグ:   https://app.ampai.jp/public/leagues/{token}/members  (19リーグ)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toRomaji } from "./romaji.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const MEMBERS_URL = "https://www.ma-jan.or.jp/activity/members.html";

const AMPAI_LEAGUES = [
  { league: "A1",  token: "355a516a4145564c36567a726a4370494f704d7178773d3d" },
  { league: "A2",  token: "7a564f687677553534566b554d39693636634a5854773d3d" },
  { league: "B1",  token: "7a69693370482b4a62787133677758307642684d65773d3d" },
  { league: "B2",  token: "2f6749744f7333347852334e48694977362b576e6f413d3d" },
  { league: "C1",  token: "395763534b6e6d3762356b2f314772636c4f2b5551773d3d" },
  { league: "C2",  token: "7363457670316371412b3639697449544742323576773d3d" },
  { league: "C3",  token: "4a666c42686c4e504d68465835755642572f794838773d3d" },
  { league: "D1①", token: "47735a35506775716b36376f7a454e68324d4d7057673d3d" },
  { league: "D1②", token: "424d626279305a466979387242673967657069506c773d3d" },
  { league: "D2①", token: "5063504c37527251494b5067694c41484567394d2b673d3d" },
  { league: "D2②", token: "426971315561545279385558313038424450426d51513d3d" },
  { league: "D3①", token: "7966447a6778324a456d423459743972704c2b3241773d3d" },
  { league: "D3②", token: "67394a6d647072354d503339633363632f4a426a6e673d3d" },
  { league: "E1①", token: "316e7762335632634845762f6a73334a4445682b50773d3d" },
  { league: "E1②", token: "4a79693555537a2b466f3172624459314f57694e48513d3d" },
  { league: "E2①", token: "6471427868535745793435426a38734c614267324f513d3d" },
  { league: "E2②", token: "362b41755544714a614a4461747864576372754670413d3d" },
  { league: "E3①", token: "616c634a67346b4866796b7842664c4779646e5245673d3d" },
  { league: "E3②", token: "6c374f53622f64436a68726f4268614c6c6e6f7751513d3d" },
];

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
    .replace(/&nbsp;/g, " ");
}

function parseMembers(html) {
  const tbody = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/);
  if (!tbody) throw new Error("tbody not found");
  const rows = [...tbody[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
  const members = [];
  for (const r of rows) {
    const cells = [...r[1].matchAll(/<td[^>]*class="column-(\d+)"[^>]*>([\s\S]*?)<\/td>/g)];
    if (cells.length < 6) continue;
    const col = {};
    for (const c of cells) col[c[1]] = c[2];

    const region = decodeEntities(col["1"].replace(/<[^>]+>/g, "").trim());
    const nameField = col["2"]
      .split(/<br\s*\/?>/i)
      .map((s) => decodeEntities(s.replace(/<[^>]+>/g, "")).trim())
      .filter(Boolean);
    const name = nameField[0] ?? "";
    const furigana = nameField[1] ?? "";
    const genderJp = decodeEntities(col["3"].replace(/<[^>]+>/g, "").trim());
    const periodRaw = decodeEntities(col["4"].replace(/<[^>]+>/g, "").trim());
    const rank = decodeEntities(col["5"].replace(/<[^>]+>/g, "").trim());
    const birthdayRaw = decodeEntities(col["6"].replace(/<[^>]+>/g, "").trim());

    if (!name) continue;
    members.push({
      region,
      name,
      furigana,
      gender: genderJp === "女" ? "female" : genderJp === "男" ? "male" : undefined,
      period: periodRaw ? `第${periodRaw}` : undefined,
      rank,
      birthday: birthdayRaw,
    });
  }
  return members;
}

function parseAmpaiMembers(html) {
  // Member block: <p class="Member_name__...">氏名</p><p class="Member_role__...">期・支部</p>
  // Image src may contain user_id and romaji slug. We collect name + image slug.
  const blocks = [...html.matchAll(/<div class="Member_member__[^"]+">([\s\S]*?)<div class="Member_right__/g)];
  const out = [];
  for (const b of blocks) {
    const block = b[1];
    const nameMatch = block.match(/<p class="Member_name__[^"]+">([^<]+)<\/p>/);
    const roleMatch = block.match(/<p class="Member_role__[^"]+">([^<]+)<\/p>/);
    const imgMatch = block.match(/<img src="https:\/\/cloudfront-production\.ampai\.jp\/icon\/user\/(\d+)\/([^"]+)\.webp"/);
    if (!nameMatch) continue;
    out.push({
      name: nameMatch[1].trim(),
      role: roleMatch ? roleMatch[1].trim() : "",
      ampaiId: imgMatch ? imgMatch[1] : null,
      slug: imgMatch ? imgMatch[2] : null,
    });
  }
  return out;
}

async function buildLeagueMap() {
  const map = new Map(); // name → { league, slug, ampaiId }
  for (const lg of AMPAI_LEAGUES) {
    const url = `https://app.ampai.jp/public/leagues/${lg.token}/members`;
    process.stderr.write(`  fetch ${lg.league} ... `);
    const html = await fetchText(url);
    const members = parseAmpaiMembers(html);
    for (const m of members) {
      if (!map.has(m.name)) {
        map.set(m.name, { league: lg.league, slug: m.slug, ampaiId: m.ampaiId });
      }
    }
    process.stderr.write(`${members.length} members\n`);
    await new Promise((r) => setTimeout(r, 300));
  }
  return map;
}

function makeId(member, takenIds) {
  // Prefer Ampai romaji slug (kansuke.sugiura → kansuke_sugiura)
  // Fallback: romanize furigana
  const fromSlug = member.ampaiSlug
    ? member.ampaiSlug.replace(/\./g, "_").replace(/[^a-z0-9_-]/g, "").toLowerCase()
    : null;
  let id = fromSlug ?? toRomaji(member.furigana);
  if (!id) return null;
  let candidate = id;
  let n = 2;
  while (takenIds.has(candidate)) {
    candidate = `${id}-${n}`;
    n++;
  }
  takenIds.add(candidate);
  return candidate;
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
    rank: p.rank,
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

function formatNameEn(slug) {
  // "kansuke.sugiura" → "Kansuke Sugiura"
  if (!slug) return undefined;
  return slug
    .split(".")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// 連盟員名簿のふりがな ("あらまさよし" など) からローマ字 nameEn を生成。
// Ampai に romaji avatar が無い 999名以上のフォールバック。
// 姓名分割は不可能なため、フルローマ字を Capitalize した一語表記とする。
// 例: "あらまさよし" → "Aramasayoshi"
function formatNameEnFromFurigana(furigana) {
  if (!furigana) return undefined;
  const romaji = toRomaji(furigana);
  if (!romaji) return undefined;
  return romaji.charAt(0).toUpperCase() + romaji.slice(1);
}

// JPML 期 → 入会年: 39期 = 2023年入会 を基点に逆算
// joinYear = 1984 + 期番号
function periodToJoinYear(periodRaw) {
  if (!periodRaw) return undefined;
  const m = periodRaw.match(/(\d+)/);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  if (Number.isNaN(n) || n < 1 || n > 100) return undefined;
  return 1984 + n;
}

async function main() {
  console.error("[1/3] fetch JPML members registry");
  const html = await fetchText(MEMBERS_URL);
  const members = parseMembers(html);
  console.error(`      → ${members.length} members`);

  console.error("[2/3] fetch Ampai 19 leagues for current league assignment");
  const leagueMap = await buildLeagueMap();
  console.error(`      → ${leagueMap.size} unique names with league info`);

  console.error("[3/3] merge + generate roster.ts");

  // Read existing FEATURED player names + ids to dedup
  const dataTs = await fs.readFile(path.join(REPO_ROOT, "app/players/data.ts"), "utf-8");
  const featuredIds = new Set(
    [...dataTs.matchAll(/id:\s*"([a-z0-9_-]+)"/g)].map((m) => m[1])
  );
  const featuredNames = new Set(
    [...dataTs.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])
  );

  const taken = new Set(featuredIds);
  const rosterEntries = [];
  let skipped = 0;
  let withLeague = 0;
  let withoutLeague = 0;
  for (const m of members) {
    if (featuredNames.has(m.name)) {
      skipped++;
      continue;
    }
    const ampai = leagueMap.get(m.name);
    if (ampai) withLeague++;
    else withoutLeague++;

    const id = makeId({ ...m, ampaiSlug: ampai?.slug }, taken);
    if (!id) continue;
    rosterEntries.push({
      id,
      name: m.name,
      org: "JPML",
      league: ampai?.league ?? "—",
      nameEn: formatNameEn(ampai?.slug) ?? formatNameEnFromFurigana(m.furigana),
      period: m.period,
      joinYear: periodToJoinYear(m.period),
      gender: m.gender,
      birthday: m.birthday,
      birthplace: m.region || undefined,
      rank: m.rank || undefined,
      href: `/players/${id}`,
    });
  }

  console.error(`      → ${rosterEntries.length} roster entries (skipped ${skipped} featured, ${withLeague} with league, ${withoutLeague} without)`);

  const header = `// app/players/roster/jpml.ts
// AUTO-GENERATED by scripts/scrape-jpml.mjs — do not edit by hand.
// Sources:
//   https://www.ma-jan.or.jp/activity/members.html
//   https://app.ampai.jp/public/leagues/*/members
import type { RosterPlayer } from "../data";

export const JPML_ROSTER: RosterPlayer[] = [
`;
  const body = rosterEntries.map(serializePlayer).join(",\n");
  const footer = "\n];\n";
  await fs.writeFile(path.join(REPO_ROOT, "app/players/roster/jpml.ts"), header + body + footer);
  console.error(`      ✓ wrote app/players/roster/jpml.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
