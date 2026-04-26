// scripts/add-joinyear.mjs
// JPML 以外の roster ファイルに joinYear を追加する one-off スクリプト。
// 各団体の period から年を逆算する:
//   最高位戦: 1975 + N  (第N期前期/後期 → 1975+N年)
//   NPM:      2000 + N  (第N期前期/後期 → 2000+N年)
//   μ:        YYYY年度 から年抽出

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

function jpFromPeriodN(period, base) {
  const m = period?.match(/第(\d+)期/);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  if (Number.isNaN(n) || n < 1 || n > 100) return undefined;
  return base + n;
}

const saikouisenJoinYear = (period) => jpFromPeriodN(period, 1975);
const npmJoinYear = (period) => jpFromPeriodN(period, 2000);
const muJoinYear = (period) => {
  const m = period?.match(/(\d{4})年度/);
  if (!m) return undefined;
  const y = parseInt(m[1], 10);
  if (y < 1900 || y > 2100) return undefined;
  return y;
};

async function processFile(rel, computeFn) {
  const fullPath = path.join(REPO_ROOT, rel);
  const content = await fs.readFile(fullPath, "utf-8");
  let added = 0;
  let skipped = 0;
  const updated = content.replace(
    /\{\s*id:[^}]*?\}/g,
    (entry) => {
      if (/\bjoinYear:/.test(entry)) {
        skipped++;
        return entry;
      }
      const periodMatch = entry.match(/period:\s*"([^"]+)"/);
      if (!periodMatch) return entry;
      const year = computeFn(periodMatch[1]);
      if (year === undefined) return entry;
      added++;
      // Insert " joinYear: YYYY," before the closing brace
      return entry.replace(/\s*\}$/, `, joinYear: ${year} }`);
    }
  );
  await fs.writeFile(fullPath, updated);
  console.error(`  ${rel}: +${added} joinYear (skipped ${skipped} existing)`);
}

async function main() {
  console.error("[add-joinyear] processing roster files...");
  await processFile("app/players/roster/saikouisen.ts", saikouisenJoinYear);
  await processFile("app/players/roster/npm.ts", npmJoinYear);
  await processFile("app/players/roster/mu.ts", muJoinYear);
  console.error("[add-joinyear] done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
