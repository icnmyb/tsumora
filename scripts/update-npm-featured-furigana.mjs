import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(REPO_ROOT, "app/players/data.ts");

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "TSUMORA local data update/1.0" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
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

function extractOfficialFurigana(html) {
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  const article = articleMatch?.[1] ?? html;
  const headingMatch = article.match(/<h1[^>]*class="[^"]*player-name[^"]*"[^>]*>([\s\S]*?)<\/h1>/);
  const furiganaMatch = headingMatch?.[1].match(/<span[^>]*>([\s\S]*?)<\/span>/);
  return furiganaMatch ? stripTags(furiganaMatch[1]).replace(/\s+/g, " ").trim() : undefined;
}

const source = await fs.readFile(DATA_PATH, "utf-8");
const lines = source.split("\n");
const targets = lines
  .map((line, index) => {
    if (!line.includes('org: "NPM"')) return undefined;
    const url = line.match(/officialUrl: "(https:\/\/npm2001\.com\/player\/[^/]+\/)"/)?.[1];
    return url ? { index, url } : undefined;
  })
  .filter(Boolean);

let updated = 0;
let unchanged = 0;
for (const { index, url } of targets) {
  const html = await fetchText(url);
  const furigana = extractOfficialFurigana(html);
  if (!furigana) {
    console.error(`WARN missing official furigana: ${url}`);
    continue;
  }
  const before = lines[index];
  lines[index] = lines[index]
    .replace(/furigana: "[^"]+", /, "")
    .replace(/(nameEn: "[^"]+", )/, `$1furigana: "${furigana}", `);
  if (lines[index] !== before) {
    updated++;
  } else if (before.includes(`furigana: "${furigana}", `)) {
    unchanged++;
  } else {
    console.error(`WARN replace failed: ${url}`);
  }
}

await fs.writeFile(DATA_PATH, lines.join("\n"));
console.error(`updated ${updated}/${targets.length} featured NPM records (${unchanged} unchanged)`);
