// scripts/fix-saikouisen-missing.mjs
// 最高位戦の3エントリ (period未取得) を再スクレイプして period + joinYear を補完。
//   - tomitani-yuko, sakamoto-koki, kondo-shunsuke

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const TARGETS = ["tomitani-yuko", "sakamoto-koki", "kondo-shunsuke"];
const ID_TO_SLUG = {
  tomitani_yuko: "tomitani-yuko",
  sakamoto_koki: "sakamoto-koki",
  kondo_shunsuke: "kondo-shunsuke",
};

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)));
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

function periodToJoinYear(period) {
  const m = period?.match(/第(\d+)期/);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  if (n === 0) return 1976;
  return 1975 + n;
}

async function fetchPeriod(slug) {
  const url = `https://saikouisen.com/members/${slug}/`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.error(`  WARN ${slug}: ${res.status}`);
    return undefined;
  }
  const html = await res.text();
  const dlMatch = html.match(/<dl class="profile-list">([\s\S]*?)<\/dl>/);
  if (!dlMatch) return undefined;
  const pairs = [...dlMatch[1].matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)];
  for (const p of pairs) {
    const key = stripTags(p[1]);
    if (key === "入会期") {
      const val = stripTags(p[2]);
      return val.startsWith("第") ? val : `第${val}`;
    }
  }
  return undefined;
}

async function main() {
  const filePath = path.join(REPO_ROOT, "app/players/roster/saikouisen.ts");
  let content = await fs.readFile(filePath, "utf-8");
  let updated = 0;

  for (const [id, slug] of Object.entries(ID_TO_SLUG)) {
    const period = await fetchPeriod(slug);
    if (!period) {
      console.error(`  no period found for ${id} (${slug})`);
      continue;
    }
    const joinYear = periodToJoinYear(period);
    if (!joinYear) {
      console.error(`  bad period for ${id}: ${period}`);
      continue;
    }
    // Insert period and joinYear before the closing brace of that entry
    const re = new RegExp(`(\\{\\s*id:\\s*"${id}"[^}]*?), href:`);
    if (!re.test(content)) {
      console.error(`  entry not found: ${id}`);
      continue;
    }
    content = content.replace(re, `$1, period: "${period}", joinYear: ${joinYear}, href:`);
    updated++;
    console.error(`  ${id}: ${period} → ${joinYear}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  await fs.writeFile(filePath, content);
  console.error(`[fix-saikouisen-missing] +${updated} entries updated`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
