# TSUMORA / ツモーラ

**The Pro Mahjong Review** — 日本のプロ麻雀界を横断する総合データベース・編集メディア。

「裏ドラのように、表に出ない麻雀の深さを、毎日編む」── JPML 39期・鷹見としや（@tt_23_mm）が編集・運営する編集調ポータル。
5 つのプロ団体 (JPML / 最高位戦 / NPM / RMU / μ) + Mリーグの選手・チーム・タイトル戦・対局スケジュールを 1 つの画面で扱う。

- 公開 URL: `https://tsumora.com`（メイン）/ tsumora.mg / tsumora.jp（防衛）
- ローンチ: 2026-05-04
- 開発開始: 2025-09（旧作業名 `hora`、2026-04-29 に `tsumora` にリネーム）
- フレームワーク: Next.js 15 (App Router) / React 19 / TypeScript / Tailwind v3 + 大量の手書き CSS

## 何ができるか

- **40 Mリーガー** の詳細プロフィール (経歴 / タイトル / 通算成績 / 動画ハイライト)
- **5 団体のロスター 全 2,900+ 名** を検索・絞り込み
- **主要タイトル戦** (鳳凰位 / 十段位 / 王位 / 雀王 / 雀竜 / 令昭位 / 最高位) の歴代記録 + 現保持者
- **Mリーグ 2025-26** レギュラー終了順位 + セミファイナル進行ボード
- **対局カレンダー** (7 日 × 時間軸の編集誌風レイアウト)
- **編集部選ニュース** + 個別記事ページ
- **`/predict`**: M リーグ予想ゲーム (UI のみ実装、バックエンド未接続)

## クイックスタート

```bash
# Node 20+ 推奨
npm install
npm run dev
# http://localhost:3000
```

ビルド:
```bash
npm run build
npm start
```

## ディレクトリ構造

```
tsumora/
├── app/
│   ├── page.tsx                # ホーム (NEWS hero + Mリーグ board + 番付)
│   ├── layout.tsx              # 共通レイアウト (Masthead + MainNav + SiteFooter)
│   ├── globals.css             # 全 CSS (タイポ・配色・コンポーネント全部)
│   ├── api/og/player/          # 動的 OG 画像 (Edge runtime)
│   ├── mleague/
│   │   ├── page.tsx
│   │   └── sf-data.ts          # 2025-26 シーズン実データ (レギュラー終了 + SF)
│   ├── news/
│   │   ├── page.tsx            # /news 一覧
│   │   ├── [slug]/page.tsx     # /news/:slug 詳細
│   │   └── data.ts             # 注目記事データ (手動更新中)
│   ├── organizations/{jpml,npm,saikouisen,rmu,mu}/
│   ├── players/
│   │   ├── data.ts             # 40 Mリーガー詳細
│   │   ├── roster.ts           # 統合ロスター
│   │   ├── roster/{jpml,npm,saikouisen,rmu,mu}.ts  # 団体別 (~2,900名)
│   │   └── [id]/page.tsx
│   ├── predict/                # 予想ゲーム (5 ページ、バックエンド未接続)
│   ├── rankings/, rules/, schedule/, teams/, titles/
│   └── titles/
│       ├── data.ts             # 7 主要タイトル戦データ
│       └── [slug]/page.tsx
├── components/                 # Masthead / MainNav / 各種詳細ページ
├── lib/computed.ts             # 集計ヘルパー (Mリーグ順位など)
├── scripts/                    # 各団体公式サイトの scraper
│   ├── scrape-jpml.mjs
│   ├── scrape-npm.mjs
│   ├── scrape-saikouisen.mjs
│   ├── scrape-rmu.mjs
│   └── scrape-mu.mjs
├── docs/, mockups/             # デザインモック・参考資料
└── .claude/
    ├── roadmap.md              # タスク追跡
    └── league-research-progress.md
```

## 技術スタック

| レイヤー | 採用 |
|---|---|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript 5.7 |
| UI | React 19 + 手書き CSS (Tailwind は最小利用) |
| フォント | Shippori Mincho / Noto Sans JP / Geist Mono / Instrument Serif |
| データソース | TS ファイル (静的) — 将来 Supabase 移行検討中 (`/predict` ゲームから) |
| デプロイ想定 | Vercel |

## デザイン方針

- **Editorial / 紙の新聞調**: 黒インク (`--ink: #0b0b09`) + 紙色 (`--paper: #ebe4d2`) + 朱 (`--vermilion: #c8282a`) + 金 (`--gold: #a07e28`)
- **タイポ駆動**: 大きなセリフ見出し + モノスペースの番号 + イタリック英文
- **ブルータル offset shadow** (`5px 5px 0 var(--ink)` パターン)
- **「番付」「鳳凰位」など漢字をビジュアル要素として活用**
- 詳しくは `app/globals.css` 冒頭のトークン定義を参照

## データ更新ワークフロー

### Featured 40 Mリーガー
`app/players/data.ts` を直接編集。各オブジェクトは:
```ts
{ id, name, nameEn, org, title, titles[], bio[], annualPoints[],
  currentSeason, videos[], mleagueTeam, ... }
```

### 団体ロスター (~2,900名)
`scripts/scrape-{org}.mjs` を実行 → `app/players/roster/{org}.ts` を再生成。
ロスター追加は基本 scraper 経由 (手書きはしない)。

### Mリーグ シーズンデータ
`app/mleague/sf-data.ts` の `REGULAR_FINAL_2025_26` / `SEMIFINAL_2025_26` を更新。
出典は Wikipedia + キンマweb + 公式。

### ニュース
`app/news/data.ts` の `NEWS` 配列に追記。`date` 降順でホームの Top Story が選ばれる。

## スクリプト

```bash
node scripts/scrape-jpml.mjs          # JPML 公式から選手データ取得
node scripts/scrape-npm.mjs           # 同 NPM
node scripts/scrape-saikouisen.mjs    # 同 最高位戦
node scripts/scrape-rmu.mjs           # 同 RMU (一部 404 で取得困難)
node scripts/scrape-mu.mjs            # 同 μ
node scripts/add-joinyear.mjs         # joinYear 一括補完
```

## 開発中の機能 (未完)

- `/predict` 予想ゲームのバックエンド (Supabase 連携、#G1-G5)
- 対局スケジュールの実データ統合 (#G3, 公式 API 不在のため scraper 必要)
- ニュース自動収集 (X / Google News / 5ch ハイブリッド検討中)
- RMU 選手の `joinYear` / `nameEn` 補完 (公式プロフィールページ 404 多数)

詳細は `.claude/roadmap.md`。

## ライセンス・データ出典

- 選手・対局データは各団体公式サイト + Mリーグ公式 + Wikipedia + キンマweb から集約
- 各データの著作権は各出典元に帰属
- サイト構造・コードの再配布は未定

## 連絡先

(運営) 鷹見としや（JPML 39期）/ X DM `@tt_23_mm`
