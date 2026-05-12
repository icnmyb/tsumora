// Add official organization profile URLs to featured/M-League player records.
// This does not change manually curated M-League data; it only inserts officialUrl.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const SOURCES = {
  NPM: "https://npm2001.com/player/",
  "最高位戦": "https://saikouisen.com/members/",
  RMU: "https://rmu.jp/player_index/license",
  "μ": "https://mu-mahjong.jp/player/",
};

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "TSUMORA official-url updater/1.0" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return await res.text();
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

function cleanName(s) {
  return decodeEntities(s).replace(/<[^>]+>/g, "").replace(/\s+/g, "");
}

function add(map, org, name, url) {
  if (!name || !url) return;
  map.set(`${org}:${cleanName(name)}`, url);
}

async function buildOfficialUrlMap() {
  const map = new Map();

  const npm = await fetchText(SOURCES.NPM);
  for (const m of npm.matchAll(/<a class="player-archive-name" href="([^"]+)"[\s\S]*?<h3>([^<]+)<\/h3>/g)) {
    add(map, "NPM", m[2], m[1]);
  }

  const saikouisen = await fetchText(SOURCES["最高位戦"]);
  for (const m of saikouisen.matchAll(/<li><a href="(https:\/\/saikouisen\.com\/members\/[^"]+)"[\s\S]*?<p class="name">([^<]+)<\/p>/g)) {
    add(map, "最高位戦", m[2], `${m[1].replace(/\/$/, "")}/`);
  }

  const rmu = await fetchText(SOURCES.RMU);
  for (const m of rmu.matchAll(/<img[^>]+src="\/img\/player\/(\d+)[^"]*"[^>]*alt="([^"]*)"/g)) {
    add(map, "RMU", m[2], `https://rmu.jp/player/prof/${m[1]}.htm`);
  }

  const mu = await fetchText(SOURCES["μ"]);
  for (const m of mu.matchAll(/<a class='(?:blue|green|pink|gold)' href='([^']+)'>\s*([^<]+?)\s*<\/a>/g)) {
    add(map, "μ", m[2], m[1]);
  }

  return map;
}

async function main() {
  const dataPath = path.join(REPO_ROOT, "app/players/data.ts");
  const map = await buildOfficialUrlMap();
  const input = await fs.readFile(dataPath, "utf-8");
  const lines = input.split("\n");
  let changed = 0;
  const missing = [];

  const output = lines.map((line) => {
    if (!line.startsWith("  { id: ")) return line;
    if (line.includes("officialUrl:")) return line;

    const name = line.match(/name:\s*"([^"]+)"/)?.[1];
    const org = line.match(/org:\s*"([^"]+)"/)?.[1];
    if (!name || !org) return line;

    const officialUrl = map.get(`${org}:${cleanName(name)}`);
    if (!officialUrl) {
      missing.push(`${org}:${name}`);
      return line;
    }

    changed++;
    return line.replace(/href:\s*"([^"]+)"/, `href: "$1", officialUrl: "${officialUrl}"`);
  }).join("\n");

  await fs.writeFile(dataPath, output);
  console.error(`updated ${changed} featured players`);
  if (missing.length > 0) {
    console.error(`missing official URLs: ${missing.join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
