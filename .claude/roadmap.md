# Hora.mg ロードマップ / 未実装要件

最終更新: 2026-04-26

## 完了済みのマイルストーン

- ✅ Featured / Roster の型分離 (`FeaturedPlayer extends RosterPlayer`)
- ✅ `RosterPlayerPage` コンポーネント (Hero slim + Facts + Related + Org)
- ✅ `[id]` ルーティング dispatch (Featured/Roster で自動分岐)
- ✅ 5団体スクレイパー (JPML 1047 / 最高位戦 1012 / NPM 743 / RMU 45 / μ 87)
- ✅ /players 一覧の検索 + ページネーション (URL `?page=N` 連動)
- ✅ Mリーガーブロックの page>1 で非表示化
- ✅ Org ページ 5団体 `OrgDetailPage` で構造統一
- ✅ Org ページの所属プロ・主要タイトル戦の他団体混入を整理
- ✅ Featured レジェンド7名削除 → 該当者を Roster へ移行
- ✅ 死リンク (`href="#"`) 全箇所修正

---

## 残タスク

### ★★ 中優先 — Roster データ完成度

#### #8 JPML 以外の `joinYear` 未計算
- 最高位戦 1012名、NPM 743名、μ 87名 — `joinYear` 0件
- JPML は `1984 + N (期)` の公式で計算済み
- 各団体の期 → 年マッピングを scraper に追加して再生成
  - 最高位戦: 「第N期前期/後期」 → 期と前期/後期の組合せから算出
  - NPM: 「第N期前期/後期」 → 半年単位
  - μ: 「YYYY年度」 → 直接年あり

#### #9 JPML 以外の `gender` 未取得
- 最高位戦・NPM・RMU・μ ともに 0件 (個別ページから抽出可能)
- 性別フィルタが現状 JPML 1047名+α しか効かない
- saikouisen.com の個別 dl に「性別」項目がある場合あり、確認要

#### #10 JPML 大半の `nameEn` 欠損 (1047中48のみ)
- ふりがなから romaji 生成すれば全員カバー (`scripts/romaji.mjs` 既存)
- saikouisen の `nameEn` 表記順 (surname-given e.g. "Kayamori Sayaka") と Featured order (given-surname e.g. "Sho Sonoda") の不揃いも要決定

#### #11 Roster データ品質バグ
- NPM 出身地に「富山県日本」のような余計な suffix
- RMU はライセンス保持者のみ取得 (45名)、アスリート選手 etc. 未取得
- 二階堂瑠美の roster 期表記 "第16期" は正しいか要確認 (姉妹の二階堂亜樹と同期)

### ★★ 中優先 — 大型ページがモック

#### #4 `/rankings` (685行)
全データハードコード、`getAllPlayers()` 連動なし。
- レーティングは現実には団体ごと制度異なるため、団体別 or Mリーグ統一の指標選定が必要

#### #5 `/schedule` (649行)
カレンダーがハードコードのモックデータ。
- 各団体の対局スケジュール (Mリーグ・鳳凰戦・雀王戦 etc.) を JSON で管理する設計が必要
- 現状: Mリーグ公式・各団体公式ともに API 提供なし → 手動入力 or HTML スクレイプ

#### #6 `/mleague` (502行)
Mリーグ順位表モック。
- 公式は ABEMA / m-league.jp で公開、API 無し
- スクレイパー実装してデータ取り込みなら可能

#### #7 `/titles` 配下の404 (6ページ未作成)
`/titles/{jakuou-isen, judan-isen, oui-isen, reishouisen, rmu-classic, saikouisen}` が `/titles` ページから link されているが実ページ無し。
- houou-isen のみ存在する。同等の作りを 6 ページぶん作る必要あり
- 設計: `/titles/[slug]/page.tsx` 動的ルートに統一して、データを `app/titles/data.ts` で管理する方が良い

### ★ 低優先 — UI 磨き

#### #12 Roster ページの体験改善
- `league: "—"` (引退/休場/未登録) の表示を「現リーグ未登録」「在籍中」等に置換
- 関連選手カードの "準備中" placeholder の扱い再考 (非表示でも可)

#### #13 ホームページ導線
- `/players` の検索機能や 2,975 名規模を home から見せる導線無し
- HERO の `2,975 PROS` カウントとリンク先の一致確認 (動的になっているか)

#### #14 SEO
- Roster 選手の `generateMetadata` description が薄い (`{name}のプロフィール。{org} {league}所属。`)
- Open Graph 画像未設定
- 動的 OG 画像 (Vercel OG Image) で団体カラー + 名前を生成すると良い

### ★ 低優先 — レジェンド対応

#### #16 故人の Hall of Fame セクション
- 飯田正人 (最高位戦)、前原雄大 (連盟、2024年逝去) など故人を「殿堂」セクションで紹介する案
- Roster 側で `league: "—"` 扱いになっているため、現状は埋もれている

---

## 自然言語検索 UI (ChatGPT風)

### 概要
ユーザーが自然言語で選手データを検索できる UI を `/players` または専用ページに追加する。
例: 「30代の女流Mリーガーで現役A1リーグ」「千葉県出身の連盟員で十段位以上」

### アーキテクチャ方針
- **DB は不要**。LLM をクエリパーサとして使い、TypeScript の `RosterPlayer[]` 配列に対して `.filter()` を適用する。
- 3000件規模では in-memory フィルタが最速 (<1ms)。
- 静的 SSG / Edge Runtime デプロイのままで動く。

### 実装スケッチ

#### 1. API Route (`app/api/search/route.ts`)
- Anthropic SDK の構造化出力 (tool use) で自然言語 → フィルタ JSON 変換
- 推奨モデル: `claude-haiku-4-5-20251001` (速度・コスト優先)
- フォールバック: `claude-sonnet-4-6` (複雑な複合条件で精度が必要な場合)

```ts
const FilterSchema = z.object({
  org: z.enum(["JPML","NPM","最高位戦","RMU","μ"]).optional(),
  league: z.string().optional(),         // "A1", "B2", "女流B" 等
  gender: z.enum(["male","female"]).optional(),
  ageRange: z.tuple([z.number(), z.number()]).optional(),
  isMleaguer: z.boolean().optional(),
  mleagueTeam: z.string().optional(),
  birthplace: z.string().optional(),     // 都道府県/支部
  rank: z.string().optional(),           // 段位 (連盟・RMU)
  joinYearRange: z.tuple([z.number(), z.number()]).optional(),
  hasTitle: z.boolean().optional(),
  query: z.string().optional(),          // 自由テキスト (名前/ニックネーム/エイリアス)
});
```

#### 2. UI コンポーネント
- 既存の `/players` 上部の検索ボックスを「自然言語入力可」にアップグレード
- もしくは `/players/ask` 専用ページ
- 入力 → LLM 呼び出し中スピナー → 結果カード一覧表示
- 抽出されたフィルタ条件を chip 表示 (削除可)
- 「絞り込み条件 + 件数」を可視化

#### 3. 拡張: 意味検索 (Phase 2)
- 各選手の `bio`・`title`・`nickname` を embedding 化
- `app/players/embeddings.ts` に `Record<id, number[]>` 形式で保存 (12MB程度)
- コサイン類似度をクライアント or Edge で計算
- 「打ち方が似てる選手」「同じスタイルの女流」等の semantic クエリに対応
- 候補ライブラリ: `@xenova/transformers` (ブラウザ推論)、`text-embedding-3-small`

### コスト試算
- Claude Haiku 4.5: 入力 $0.80/Mtok, 出力 $4/Mtok
- 1クエリ平均 ~500入力tok / ~150出力tok ≒ **$0.001/query**
- 10万クエリ/月でも $100 以下

### DB 化を検討するトリガー
1. 選手データ 50,000件超え (現3000件)
2. 試合結果・ランキングなど時系列データを大量保存する必要が出た
3. ユーザー投稿 (お気に入り・コメント) を保存する機能を実装する
4. ファセット集計クエリ ("40代女流の平均段位" 等) が常態化

### 関連ファイル (実装時に参照)
- `app/players/data.ts` — `RosterPlayer` / `FeaturedPlayer` 型 + `getAllPlayers()`
- `app/players/roster/*.ts` — 団体別ロスター (auto-generated)
- `components/PlayerPage.tsx` / `components/RosterPlayerPage.tsx` — 詳細表示
- `app/players/page.tsx` — 一覧 + 検索 (現状はテキストマッチのみ)
