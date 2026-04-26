// scripts/export-genders.mjs
// 全選手 (Featured + Roster) の性別リストを TSV で出力する。
// 出力先: docs/genders.tsv
//
// ユーザーがスプレッドシートで編集し、後で apply-genders.mjs でインポートする想定。

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

function extractEntries(content) {
  const entries = [];
  for (const m of content.matchAll(/\{\s*id:[^}]*?\}/g)) {
    const entry = m[0];
    const get = (key) => {
      const re = new RegExp(`\\b${key}:\\s*"([^"]*)"`);
      return entry.match(re)?.[1];
    };
    entries.push({
      id: get("id"),
      name: get("name"),
      org: get("org"),
      league: get("league"),
      gender: get("gender"),
      birthday: get("birthday"),
      birthplace: get("birthplace"),
      period: get("period"),
    });
  }
  return entries;
}

async function main() {
  const sources = [
    "app/players/data.ts",
    "app/players/roster/jpml.ts",
    "app/players/roster/saikouisen.ts",
    "app/players/roster/npm.ts",
    "app/players/roster/rmu.ts",
    "app/players/roster/mu.ts",
  ];

  const all = [];
  const seenIds = new Set();
  for (const rel of sources) {
    const content = await fs.readFile(path.join(REPO_ROOT, rel), "utf-8");
    for (const e of extractEntries(content)) {
      if (!e.id || !e.name || !e.org) continue;
      if (seenIds.has(e.id)) continue;
      seenIds.add(e.id);
      all.push(e);
    }
  }

  // Sort by org then name
  const orgOrder = { JPML: 1, NPM: 2, "最高位戦": 3, RMU: 4, "μ": 5 };
  all.sort((a, b) => {
    const oa = orgOrder[a.org] ?? 99;
    const ob = orgOrder[b.org] ?? 99;
    if (oa !== ob) return oa - ob;
    return a.name.localeCompare(b.name, "ja");
  });

  // Build TSV
  const header = ["id", "name", "org", "league", "gender", "birthday", "period", "birthplace"];
  const lines = [header.join("\t")];
  for (const e of all) {
    lines.push([
      e.id ?? "",
      e.name ?? "",
      e.org ?? "",
      e.league ?? "",
      e.gender ?? "",
      e.birthday ?? "",
      e.period ?? "",
      e.birthplace ?? "",
    ].join("\t"));
  }

  const outPath = path.join(REPO_ROOT, "docs/genders.tsv");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, lines.join("\n") + "\n");

  // Stats
  const total = all.length;
  const known = all.filter((e) => e.gender).length;
  const female = all.filter((e) => e.gender === "female").length;
  const male = all.filter((e) => e.gender === "male").length;
  const byOrg = {};
  for (const e of all) {
    byOrg[e.org] = byOrg[e.org] || { total: 0, known: 0 };
    byOrg[e.org].total++;
    if (e.gender) byOrg[e.org].known++;
  }
  console.error(`Wrote ${total} rows to docs/genders.tsv`);
  console.error(`  Known: ${known} (male ${male}, female ${female}) — ${(known / total * 100).toFixed(1)}%`);
  console.error(`  Unknown: ${total - known}`);
  console.error(`By org:`);
  for (const [org, s] of Object.entries(byOrg)) {
    console.error(`  ${org}: ${s.known}/${s.total} known`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
