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

function katakanaToHiragana(s) {
  return s
    .replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .replace(/\s+/g, " ")
    .trim();
}

function extractOfficialFurigana(html) {
  const match = html.match(/<h3[^>]*>[\s\S]*?<small[^>]*>([\s\S]*?)<\/small>[\s\S]*?<\/h3>/);
  if (!match) return undefined;
  const kana = stripTags(match[1]);
  if (!/[ァ-ヶ]/.test(kana)) return undefined;
  return katakanaToHiragana(kana);
}

const source = await fs.readFile(DATA_PATH, "utf-8");
const lines = source.split("\n");
const targets = lines
  .map((line, index) => {
    if (!line.includes('org: "最高位戦"')) return undefined;
    const url = line.match(/officialUrl: "(https:\/\/saikouisen\.com\/members\/[^/]+\/)"/)?.[1];
    return url ? { index, url } : undefined;
  })
  .filter(Boolean);

let updated = 0;
let unchanged = 0;
for (const { index, url } of targets) {
  const html = await fetchText(url);
  const furigana = extractOfficialFurigana(html);
  if (!furigana) {
    console.error(`WARN missing official kana: ${url}`);
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
console.error(`updated ${updated}/${targets.length} featured Saikouisen records (${unchanged} unchanged)`);
