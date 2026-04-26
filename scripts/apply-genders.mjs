// scripts/apply-genders.mjs
// docs/genders.tsv を読み、id をキーに data.ts / roster/*.ts の gender を更新する。
//
// 使い方:
//   1. docs/genders.tsv をスプレッドシート等で編集 (gender 列に "male" / "female" / 空 を入れる)
//   2. このスクリプトを実行
//   3. data.ts と roster/*.ts の各エントリに gender が反映される

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

async function loadTsv() {
  const content = await fs.readFile(path.join(REPO_ROOT, "docs/genders.tsv"), "utf-8");
  const lines = content.trim().split("\n");
  const header = lines[0].split("\t");
  const idIdx = header.indexOf("id");
  const genderIdx = header.indexOf("gender");
  if (idIdx === -1 || genderIdx === -1) throw new Error("TSV header must include id and gender");

  const map = new Map();
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    const id = cols[idIdx]?.trim();
    const gender = cols[genderIdx]?.trim();
    if (!id) continue;
    if (gender !== "male" && gender !== "female" && gender !== "") continue;
    map.set(id, gender);
  }
  return map;
}

async function processFile(rel, map) {
  const fullPath = path.join(REPO_ROOT, rel);
  const content = await fs.readFile(fullPath, "utf-8");
  let updated = 0;
  let added = 0;
  let removed = 0;
  let untouched = 0;

  const out = content.replace(/\{\s*id:\s*"([a-z0-9_-]+)"[^}]*\}/g, (entry, id) => {
    if (!map.has(id)) {
      untouched++;
      return entry;
    }
    const desired = map.get(id);
    const existing = entry.match(/\bgender:\s*"(male|female)"/);

    if (desired === "" && existing) {
      // Remove gender field
      removed++;
      return entry.replace(/,\s*gender:\s*"(male|female)"/, "");
    }
    if (desired === "" && !existing) {
      untouched++;
      return entry;
    }
    if (existing && existing[1] === desired) {
      untouched++;
      return entry;
    }
    if (existing) {
      // Update value
      updated++;
      return entry.replace(/\bgender:\s*"(male|female)"/, `gender: "${desired}"`);
    }
    // Insert after league field (or before closing brace)
    added++;
    if (/\bleague:\s*"[^"]*"/.test(entry)) {
      return entry.replace(/(league:\s*"[^"]*")/, `$1, gender: "${desired}"`);
    }
    return entry.replace(/\s*\}$/, `, gender: "${desired}" }`);
  });

  await fs.writeFile(fullPath, out);
  console.error(`  ${rel}: +${added} added, ~${updated} updated, -${removed} removed (${untouched} untouched)`);
}

async function main() {
  const map = await loadTsv();
  console.error(`Loaded ${map.size} entries from docs/genders.tsv`);

  const files = [
    "app/players/data.ts",
    "app/players/roster/jpml.ts",
    "app/players/roster/saikouisen.ts",
    "app/players/roster/npm.ts",
    "app/players/roster/rmu.ts",
    "app/players/roster/mu.ts",
  ];
  for (const f of files) {
    await processFile(f, map);
  }
  console.error("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
