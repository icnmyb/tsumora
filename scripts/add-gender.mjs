// scripts/add-gender.mjs
// 漢字最終文字 + リーグ情報のヒューリスティックで roster 各ファイルに gender を付与する。
//
// JPML は registry に 性別 があるので既に gender 持ち。saikouisen/npm/mu/rmu に追加。

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

// 高信頼度: 末尾漢字でほぼ女性確定
const FEMALE_LAST = new Set([
  "子","美","香","恵","奈","菜","江","乃","葉","帆","紗","沙","凛","凜",
  "玲","鈴","桃","花","莉","里","琴","雪","萌","楓","杏","彩","咲","綾","愛",
  "歩","藍","姫","茜","蘭","麗","遥","瑠","瞳","梨","栞","緒","澪","華","葵",
  "桜","胡","緋","雛","鞠","結","凪","織","羅","佳",
]);

// 高信頼度: 末尾漢字でほぼ男性確定 (曖昧な「央/幸/真/由/充/明/希/都/平」を除外)
const MALE_LAST = new Set([
  "雄","男","介","朗","郎","也","樹","哉","司","仁","弘","浩","健","義","信",
  "孝","隆","治","士","夫","馬","貴","次","吾","彦","輔","蔵","造","邦","宏",
  "武","正","誠","久","光","清","勇","史","聡","聖","茂","秀","雅","道","英",
  "輝","哲","学","拓","直","展","暢","謙","則","太","裕","旭","俊","賢","純",
  "龍","巧","稔","駿","佑","祐","岳","泰","康","良","翼","翔","侑","章","渉",
  "耕","人","紘","隼","響","守","規","蓮","行","卓","琢","至","昭","典","寛",
  "勝","成","喜","彬","継","策","継","龍","峻","護","新","敦","勉","勲","起",
  "渡","紀","哲","駿","志","護","昇",
]);

// 末尾の単一ひらがなで女性傾向が強いもの (ん/つ などは男性可能性高め)
const FEMALE_HIRAGANA_TAIL = new Set([
  "り","み","な","か","こ","え","お","ら","ね","ち","ま","さ","ゆ","か","ほ","あ","う",
]);

// リーグ名で女性確定するもの
function leagueImpliesFemale(league) {
  if (!league) return false;
  if (league.startsWith("女流")) return true;
  if (league.includes("女流")) return true;
  return false;
}

// μ 種別 (= league field) で女性確定
function categoryImpliesFemale(league) {
  if (!league) return false;
  return league === "女流ツアー" || league === "女流ツアー選手";
}

function inferGender(name, league) {
  if (!name) return undefined;
  if (leagueImpliesFemale(league) || categoryImpliesFemale(league)) return "female";
  const last = name.charAt(name.length - 1);
  if (FEMALE_LAST.has(last)) return "female";
  if (MALE_LAST.has(last)) return "male";
  // ひらがな末尾 (e.g. 高宮まり=り, 東城りお=お): 特定文字のみ女性
  if (/[ぁ-ん]/.test(last) && FEMALE_HIRAGANA_TAIL.has(last)) {
    // 名前の最後が2文字以上ひらがなで、末尾文字が女性傾向 → female
    const hiraganaTail = name.match(/[ぁ-ん]{2,}$/);
    if (hiraganaTail) return "female";
  }
  return undefined;
}

async function processFile(rel) {
  const fullPath = path.join(REPO_ROOT, rel);
  const content = await fs.readFile(fullPath, "utf-8");
  let added = 0;
  let skipped = 0;
  let unknown = 0;
  const updated = content.replace(
    /\{\s*id:[^}]*?\}/g,
    (entry) => {
      if (/\bgender:/.test(entry)) {
        skipped++;
        return entry;
      }
      const nameMatch = entry.match(/name:\s*"([^"]+)"/);
      const leagueMatch = entry.match(/league:\s*"([^"]+)"/);
      if (!nameMatch) return entry;
      const gender = inferGender(nameMatch[1], leagueMatch?.[1]);
      if (!gender) {
        unknown++;
        return entry;
      }
      added++;
      // Insert gender after league field for readability
      return entry.replace(
        /(league:\s*"[^"]+")/,
        `$1, gender: "${gender}"`
      );
    }
  );
  await fs.writeFile(fullPath, updated);
  console.error(`  ${rel}: +${added} gender (${unknown} unknown, ${skipped} existing)`);
}

async function verifyAgainstJpml() {
  // Sanity check: apply heuristic to JPML and compare against actual gender
  const jpmlPath = path.join(REPO_ROOT, "app/players/roster/jpml.ts");
  const content = await fs.readFile(jpmlPath, "utf-8");
  let correct = 0;
  let wrong = 0;
  let unknown = 0;
  let totalKnown = 0;
  for (const m of content.matchAll(/\{\s*id:[^}]*?\}/g)) {
    const entry = m[0];
    const nameMatch = entry.match(/name:\s*"([^"]+)"/);
    const leagueMatch = entry.match(/league:\s*"([^"]+)"/);
    const actualMatch = entry.match(/gender:\s*"(male|female)"/);
    if (!nameMatch || !actualMatch) continue;
    totalKnown++;
    const inferred = inferGender(nameMatch[1], leagueMatch?.[1]);
    if (!inferred) {
      unknown++;
    } else if (inferred === actualMatch[1]) {
      correct++;
    } else {
      wrong++;
      // Sample log for first few wrong cases
      if (wrong <= 5) console.error(`  WRONG: ${nameMatch[1]} actual=${actualMatch[1]} inferred=${inferred}`);
    }
  }
  console.error(
    `[verify] JPML: ${correct}/${totalKnown} correct (${(correct / totalKnown * 100).toFixed(1)}%), ${wrong} wrong, ${unknown} unknown`
  );
}

async function main() {
  console.error("[verify against JPML ground truth]");
  await verifyAgainstJpml();
  console.error("");
  console.error("[add-gender] processing roster files...");
  await processFile("app/players/roster/saikouisen.ts");
  await processFile("app/players/roster/npm.ts");
  await processFile("app/players/roster/mu.ts");
  await processFile("app/players/roster/rmu.ts");
  console.error("[add-gender] done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
