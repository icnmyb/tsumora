import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "app/players/data.ts");
const ROSTER_DIR = path.join(ROOT, "app/players/roster");
const OUTPUT_FILE = path.join(ROOT, "app/players/wiki-titles.ts");

const WIKI_API = "https://ja.wikipedia.org/w/api.php";
let lastWikiRequestAt = 0;

const titleYearRules = [
  { re: /女流雀王/, offset: 2001 },
  { re: /女流最高位/, offset: 2000 },
  { re: /女流令昭位/, offset: 2009 },
  { re: /鳳凰位/, offset: 1983 },
  { re: /十段位/, offset: 1983 },
  { re: /發王位|発王位/, offset: 1992 },
  { re: /最強位/, offset: 1989 },
  { re: /王位/, offset: 1975 },
  { re: /雀竜位/, offset: 2001 },
  { re: /雀王(?!位)|雀王位/, offset: 2001 },
  { re: /最高位(?!戦Classic)/, offset: 1976 },
  { re: /プロクイーン/, offset: 2002 },
  { re: /桜蕾戦|桜蕾/, offset: 2020 },
  { re: /令昭位/, offset: 2009 },
  { re: /RMUクラウン/, offset: 2008 },
  { re: /将王/, offset: 2002 },
  { re: /日本オープン/, offset: 2002 },
  { re: /麻雀マスターズ/, offset: 1992 },
  { re: /チャンピオンズリーグ/, offset: 1997 },
];

const specialPeriodYears = new Map([
  ["鳳凰位:26", "2009"],
  ["鳳凰位:27", "2010"],
  ["鳳凰位:29", "2012"],
  ["鳳凰位:37", "2021"],
  ["鳳凰位:38", "2022"],
  ["鳳凰位:39", "2023"],
  ["鳳凰位:40", "2024"],
  ["モンド杯:9", "2008"],
  ["モンド杯:11", "2010"],
  ["モンド杯:12", "2011"],
  ["モンド杯:17", "2016"],
  ["女流モンド杯:13", "2015"],
  ["女流モンド杯:17", "2019"],
  ["モンド名人:16", "2022"],
  ["麻雀グランプリMAX:7", "2017"],
  ["麻雀グランプリMAX:9", "2019"],
  ["麻雀グランプリMAX:10", "2019"],
  ["麻雀グランプリMAX:11", "2020"],
  ["麻雀グランプリMAX:16", "2025"],
  ["麻雀日本シリーズ:4", "2018"],
  ["麻雀日本シリーズ:6", "2020"],
  ["麻雀マスターズ:32", "2024"],
  ["麻雀マスターズ:34", "2026"],
  ["日本オープン:13", "2015"],
  ["日本オープン:17", "2019"],
  ["日本オープン:22", "2024"],
  ["オータムチャンピオンシップ:8", "2013"],
  ["ウェスタン・チャンピオンシップ:17", "2023"],
  ["チャンピオンズリーグ:10", "2007"],
  ["チャンピオンズリーグ:13", "2010"],
]);

function cleanWikiText(input) {
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<ref[\s\S]*?<\/ref>/g, "")
    .replace(/<ref[^>]*\/>/g, "")
    .replace(/\{\{r\|[^}]+}}/g, "")
    .replace(/\{\{lang\|[^|}]+\|([^}]+)\}\}/g, "$1")
    .replace(/\{\{[^}]+\}\}/g, "")
    .replace(/\{\{[^}]*$/g, "")
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/'''?/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[（）]/g, (m) => (m === "（" ? "(" : ")"))
    .replace(/[、，]/g, "・")
    .replace(/\}+\s*$/g, "")
    .trim();
}

function normalizeName(name) {
  return name.replace(/\s+/g, "").replace(/[髙﨑﨑]/g, (m) => ({ 髙: "高", "﨑": "崎", "﨑": "崎" })[m] ?? m);
}

function extractInlinePlayers(source, featuredOnly = false) {
  const rows = [];
  const re = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"([\s\S]*?)(?=\n\s*\{\s*id:|\n\s*\/\/ ──|\n\];)/g;
  let m;
  while ((m = re.exec(source))) {
    const block = m[0];
    const league = block.match(/league:\s*"([^"]*)"/)?.[1] ?? "";
    const org = block.match(/org:\s*"([^"]*)"/)?.[1] ?? "";
    const mleagueTeam = block.match(/mleagueTeam:\s*"([^"]*)"/)?.[1];
    if (featuredOnly && !mleagueTeam) continue;
    rows.push({ id: m[1], name: m[2], org, league, mleagueTeam });
  }
  return rows;
}

function isUpperLeague(league) {
  return /^(A|B)/.test(league) || /^女流[AB]/.test(league);
}

async function getTargetPlayers() {
  const dataSource = await fs.readFile(DATA_FILE, "utf8");
  const featured = extractInlinePlayers(dataSource, true);
  const rosterFiles = (await fs.readdir(ROSTER_DIR)).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  const roster = [];
  for (const file of rosterFiles) {
    const source = await fs.readFile(path.join(ROSTER_DIR, file), "utf8");
    roster.push(...extractInlinePlayers(source).filter((p) => isUpperLeague(p.league)));
  }
  const seen = new Map();
  for (const p of [...featured, ...roster]) seen.set(p.id, p);
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

async function wikiGet(params) {
  const elapsed = Date.now() - lastWikiRequestAt;
  if (elapsed < 750) {
    await new Promise((resolve) => setTimeout(resolve, 750 - elapsed));
  }
  const url = new URL(WIKI_API);
  Object.entries({
    format: "json",
    formatversion: "2",
    ...params,
  }).forEach(([key, value]) => url.searchParams.set(key, value));
  for (let attempt = 0; attempt < 4; attempt += 1) {
    lastWikiRequestAt = Date.now();
    const res = await fetch(url, {
      headers: { "user-agent": "TSUMORA local data update/1.0" },
    });
    if (res.ok) return res.json();
    if (res.status !== 429 || attempt === 3) throw new Error(`${res.status} ${res.statusText}`);
    await new Promise((resolve) => setTimeout(resolve, 3000 * (attempt + 1)));
  }
}

async function fetchExactPages(players) {
  const pages = new Map();
  for (let i = 0; i < players.length; i += 50) {
    const batch = players.slice(i, i + 50);
    process.stderr.write(`Fetching Wikipedia batch ${Math.floor(i / 50) + 1}/${Math.ceil(players.length / 50)}\n`);
    const exact = await wikiGet({
      action: "query",
      prop: "revisions",
      rvprop: "content",
      titles: batch.map((p) => p.name).join("|"),
    });
    for (const page of exact.query.pages ?? []) {
      pages.set(normalizeName(page.title), page);
    }
  }
  return pages;
}

function findWikiPage(player, pageCache) {
  const page = pageCache.get(normalizeName(player.name));
  if (!page || page.missing) return null;
  if (hasTitleFields(page.revisions?.[0]?.content ?? "")) return page;
  return null;
}

async function findWikiPageSlow(player) {
  const exact = await wikiGet({
    action: "query",
    prop: "revisions",
    rvprop: "content",
    titles: player.name,
  });
  const page = exact.query.pages[0];
  if (!page.missing && hasTitleFields(page.revisions?.[0]?.content ?? "")) return page;
  return null;
}

function hasTitleFields(content) {
  return /^\|\s*タイトル\d+\s*=.+/m.test(content) || /==+\s*獲得タイトル\s*==+/.test(content);
}

function extractTitleLines(content) {
  const lines = [];
  const infoboxTitleRe = /\|\s*タイトル\d+\s*=\s*([\s\S]*?)(?=\|\s*タイトル\d+\s*=|\n\||\n\}\}|\}\}|$)/g;
  let m;
  while ((m = infoboxTitleRe.exec(content))) {
    const value = cleanWikiText(m[1]);
    if (value && !/^獲得タイトル/.test(value)) lines.push(value);
  }

  const section = content.match(/==+\s*獲得タイトル\s*==+\s*([\s\S]*?)(?=\n==[^=]|$)/);
  const sectionLines = section
    ? section[1]
        .split("\n")
        .filter((line) => /^\s*[*;]/.test(line))
        .map((line) => cleanWikiText(line.replace(/^\s*[*;]\s*/, "")))
        .filter(Boolean)
    : [];

  return [...sectionLines, ...lines];
}

function inferYear(titleName, period) {
  const keyCandidates = [
    `${titleName}:${period}`,
    ...titleName.split(/[・/]/).map((name) => `${name}:${period}`),
  ];
  for (const key of keyCandidates) {
    if (specialPeriodYears.has(key)) return specialPeriodYears.get(key);
  }
  const rule = titleYearRules.find((item) => item.re.test(titleName));
  if (rule) return String(Number(period) + rule.offset);
  return null;
}

function splitPeriodExpression(expr) {
  const normalized = expr.replace(/第/g, "").replace(/期|回|代/g, "");
  return normalized
    .split(/[・,、／/]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const m = part.match(/\d+/);
      return m?.[0] ?? null;
    })
    .filter(Boolean);
}

function parseTitleLine(line) {
  const normalized = line.replace(/（/g, "(").replace(/）/g, ")").replace(/\s+/g, "");
  if (!normalized || /準優勝|第[23]位|[23]位|平均打点王/.test(normalized)) return [];
  const paren = normalized.match(/^(.+?)\((.+)\)$/);
  if (!paren) {
    const yearMatches = [...normalized.matchAll(/((?:19|20)\d{2})(?:年)?/g)].map((m) => m[1]);
    if (yearMatches.length > 0) {
      return yearMatches.map((year) => ({ year, name: normalized.replace(/年/g, "") }));
    }
    const periodFirst = normalized.match(/^第(\d+)(期|回|代)(.+)$/);
    if (periodFirst) {
      const [, period, suffix, rawName] = periodFirst;
      const baseName = rawName.replace(/優勝$/, "").replace(/連覇.*$/, "");
      const year = inferYear(baseName, period);
      return year ? [{ year, name: `第${period}${suffix}${baseName}` }] : [];
    }
    const periodLast = normalized.match(/^(.+?)第?(\d+)(期|回|代)$/);
    if (periodLast && normalized.includes("第")) {
      const [, rawName, period, suffix] = periodLast;
      const baseName = rawName.replace(/優勝$/, "").replace(/連覇.*$/, "");
      const year = inferYear(baseName, period);
      return year ? [{ year, name: `第${period}${suffix}${baseName}` }] : [];
    }
    return [];
  }

  const baseName = paren[1].replace(/優勝$/, "").replace(/連覇.*$/, "").replace(/\d+期$/, "");
  const detail = paren[2];
  const yearMatches = [...detail.matchAll(/((?:19|20)\d{2})(?:年)?/g)].map((m) => m[1]);
  if (yearMatches.length > 0) {
    return yearMatches.map((year) => ({ year, name: `${baseName}${year}` }));
  }

  const periods = splitPeriodExpression(detail);
  return periods
    .map((period) => {
      const year = inferYear(baseName, period);
      if (!year) return null;
      const suffix = /回/.test(detail) ? `第${period}回` : `第${period}期`;
      return { year, name: `${suffix}${baseName}` };
    })
    .filter(Boolean);
}

function titleSummary(titles) {
  const counts = new Map();
  for (const title of titles) {
    const name = title.name.replace(/^第\d+(期|回|代)/, "").replace(/\d{4}$/, "").replace(/連覇.*$/, "");
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  const [name, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
  return name ? `${name}${count > 1 ? `×${count}` : ""}` : "";
}

function uniqueTitles(entries) {
  const seen = new Set();
  const seenSemantic = new Set();
  return entries
    .filter((entry) => entry.year && entry.name)
    .filter((entry) => {
      const semanticName = entry.name
        .replace(/^第\d+(期|回|代)/, "")
        .replace(/(19|20)\d{2}/g, "")
        .replace(/優勝$/, "");
      const semanticKey = `${entry.year}:${semanticName}`;
      if (seenSemantic.has(semanticKey)) return false;
      seenSemantic.add(semanticKey);
      const key = `${entry.year}:${entry.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => Number(b.year.slice(0, 4)) - Number(a.year.slice(0, 4)) || a.name.localeCompare(b.name, "ja"));
}

async function main() {
  const players = await getTargetPlayers();
  const pageCache = await fetchExactPages(players);
  const rows = {};
  const missing = [];
  const unresolved = [];

  for (const [i, player] of players.entries()) {
    process.stderr.write(`[${i + 1}/${players.length}] ${player.name}\n`);
    const page = findWikiPage(player, pageCache);
    if (!page) {
      missing.push(player);
      continue;
    }
    const content = page.revisions?.[0]?.content ?? "";
    const lines = extractTitleLines(content);
    const titles = uniqueTitles(lines.flatMap(parseTitleLine));
    if (titles.length === 0) {
      unresolved.push({ player, page: page.title, lines });
      continue;
    }
    rows[player.id] = {
      title: titleSummary(titles),
      titles,
      source: `https://ja.wikipedia.org/wiki/${encodeURIComponent(page.title).replace(/%20/g, "_")}`,
      sourceTitle: page.title,
    };
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const body = `// app/players/wiki-titles.ts
// Wikipedia の雀士 infobox「タイトル」欄から生成。
// 対象: Mリーガー + 各団体A/Bリーガーのうち、Wikipedia記事にタイトル欄がある選手。

import type { TitleEntry } from "./data";

export interface WikiTitleOverride {
  title: string;
  titles: TitleEntry[];
  source: string;
  sourceTitle: string;
}

export const WIKI_TITLE_OVERRIDES = ${JSON.stringify(rows, null, 2)} as const satisfies Record<string, WikiTitleOverride>;
`;
  await fs.writeFile(OUTPUT_FILE, body);

  const tmpDir = path.join(ROOT, "tmp");
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.writeFile(
    path.join(tmpDir, "wiki-title-report.json"),
    JSON.stringify({ targetCount: players.length, updatedCount: Object.keys(rows).length, missing, unresolved }, null, 2),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
