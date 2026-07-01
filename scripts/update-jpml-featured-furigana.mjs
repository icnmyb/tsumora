import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(REPO_ROOT, "app/players/data.ts");
const MEMBERS_URL = "https://www.ma-jan.or.jp/activity/members.html";

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
    .replace(/&nbsp;/g, " ");
}

function parseMembers(html) {
  const tbody = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/);
  if (!tbody) throw new Error("tbody not found");
  const rows = [...tbody[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
  const map = new Map();
  for (const row of rows) {
    const cells = [...row[1].matchAll(/<td[^>]*class="column-(\d+)"[^>]*>([\s\S]*?)<\/td>/g)];
    const col = {};
    for (const cell of cells) col[cell[1]] = cell[2];
    if (!col["2"]) continue;
    const nameField = col["2"]
      .split(/<br\s*\/?>/i)
      .map((s) => decodeEntities(s.replace(/<[^>]+>/g, "")).trim())
      .filter(Boolean);
    const name = nameField[0]?.replace(/\s+/g, "");
    const furigana = nameField[1]?.replace(/\s+/g, "");
    if (name && furigana) map.set(name, furigana);
  }
  return map;
}

const [source, html] = await Promise.all([
  fs.readFile(DATA_PATH, "utf-8"),
  fetchText(MEMBERS_URL),
]);
const furiganaByName = parseMembers(html);
const lines = source.split("\n");

let updated = 0;
let unchanged = 0;
let missing = 0;
for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  if (!line.includes('org: "JPML"')) continue;
  const name = line.match(/name: "([^"]+)"/)?.[1];
  if (!name) continue;
  const furigana = furiganaByName.get(name);
  if (!furigana) {
    missing++;
    console.error(`WARN missing JPML furigana: ${name}`);
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
  }
}

await fs.writeFile(DATA_PATH, lines.join("\n"));
console.error(`updated ${updated} featured JPML records (${unchanged} unchanged, ${missing} missing)`);
