# TSUMORA ロードマップ / 未実装要件

最終更新: 2026-05-01

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
- ✅ 全10チーム fact-check (Wikipedia ベース) + チーム個別ページ
- ✅ joinYear 補完 (saikouisen 1012 / NPM 743 / μ 87) — RMU のみ未対応
- ✅ gender 補完 (全5団体・2,934名 完全カバー: 男2,297 / 女637)
- ✅ nameEn 補完 (JPML 1047 / saikouisen 1012 / NPM 743 / μ 87) — RMU 30名のみ未対応
- ✅ Roster データ品質修正 (#11): NPM出身地suffix 11件、二階堂亜樹の期/joinYear訂正
- ✅ Roster ページUX改善 (#12): league:"—" を「現リーグ未登録」に、関連プロ空時は隠す
- ✅ ホーム → /players 導線 (#13): 全プロ数CTA + 団体別実データカウント
- ✅ SEO強化 (#14): rich generateMetadata + 動的OG画像 (/api/og/player)
- ✅ 故人エントリ削除 (#16): 飯田正人をsaikouisenロスターから削除 (現役のみ掲載方針)
- ✅ /players 一覧の五十音順ソート (ID昇順)
- ✅ ホーム捏造データ撲滅 (#H1-H6, #H10-H12) — 前原雄大言及削除・偽スコア削除・偽記事削除
  - HEROトップストーリー → 現タイトル保持者カードに置換
  - HEROスコアボード → Mリーグ実順位 (top4) に置換
  - TODAY_ITEMS / SCHED_DAYS / LIVE NOW → 削除 (試合データDBが整うまで)
  - EDITOR'S PICK / NEWS → 削除 (誤情報含むため)
  - TITLES / RANKINGS / Mリーグ番付 → 動的計算化
  - lib/computed.ts (computeMleagueStandings 等) を共通ヘルパー化
- ✅ Masthead/Footer の日付・時刻・Vol番号動的化
- ✅ Mリーグ予想ゲーム (`/predict`) 5画面実装 — claude design からの handoff
  - ホーム / 予想投稿 / マイページ / シーズンランキング / 試合結果
- ✅ 案A の獲得ptルール定義 + 全ページ整合
  - `(基本100 + 少数派50 + 連続50/100/200) × X連携(2 or 1)`
- ✅ 大型ページのモック撲滅 (#4-#7)
  - `/rankings`: 685行モック → Featured 40名 + Roster 3000名から動的計算 (6カテゴリ)
  - `/schedule`: 649行日次モック → 年間フェーズ + タイトル戦カレンダー (honest版)
  - `/mleague`: 502行モック → teams + players の annualPoints 実績で順位計算
  - `/titles/[slug]`: 6 タイトル戦の404を解消、動的ルート + verified データ
  - 旧 `/titles/houou-isen/page.tsx` (668行、捏造standings含む) を削除

---

## 残タスク

### ★★★ 高優先 — ニュース制作・編集ワークフロー

#### #N1 Codexによるニュース生成フロー設計
- ニュースはユーザーが毎回手書きする前提にしない。Codex が出典確認、構成、本文作成、メタデータ案、公開前チェックまで担当できる流れにする
- 対象: Mリーグ速報・試合後レビュー、タイトル戦結果、選手ニュース、団体ニュース、TSUMORA編集記事
- 必須: 出典URL、確認日、公開日時、事実と推測の分離、未確認情報を書かないためのチェック項目
- 速報記事と編集記事で文体・構成・公開前確認の粒度を分ける

#### #N2 ニュース記事データモデル整備
- `slug`, `title`, `summary`, `body`, `category`, `status`, `publishedAt`, `updatedAt`, `sources`, `relatedPlayers`, `relatedTeams`, `relatedTitles`, `ogImage` を持つ構造へ整理
- 当面は `app/news/data.ts` の静的TSで運用し、将来 CMS / DB に移せるように型とID設計を先に固める
- Mリーグ成績DBやタイトル戦DBと自然に紐づけ、将来の「データに聞けるGPT風UI」でも使える形にする

#### #N3 Codexニュース執筆ガイドライン
- 見出し、リード、本文、出典、関連記事、SEO title / description の型を決める
- TSUMORAらしい編集者調に寄せつつ、煽り・断定しすぎ・未確認情報の混入を避ける
- 日付、試合フェーズ、チーム名、選手名、タイトル名は必ず既存データまたは確認済みソースと照合する

#### #N4 ニュース面のUI/UX設計
- ホーム、ニュース一覧、記事詳細、関連記事導線を設計する
- 速報性がある記事と保存版記事を見た目で区別し、読者が「今読むべきもの」と「後で参照するもの」を迷わない構造にする
- 記事詳細は出典・更新履歴・関連データへの導線を自然に置き、信頼性と読みやすさを両立する

### ★★ 中優先 — Roster データ完成度

#### #8 RMU 45名の `joinYear` 未取得
- saikouisen 1012 / NPM 743 / μ 87 / JPML 1047 は計算済
- RMU は個別プロフィールページが現在 404 のため取得困難
- 候補: ライセンス発行日 (`/発行日 SSS (YYYY/M/D)`) からの推定 or 手動入力

~~#9 JPML 以外の gender 未取得~~ → 完了 (2,934名 100%)

#### #10 RMU 30名の `nameEn` 欠損
- 4団体 (JPML/saikouisen/NPM/μ) は 100%カバー済み (2,889名)
- RMU 30/45 のみ欠損: 公式 prof ページが現在 404 で yomi 取得不可
- 将来 RMU site が復旧したら自動補完可
- 表記順 (surname-given vs given-surname) の不統一はサイト全体の課題として別途整理

~~#11 Roster データ品質バグ~~ → 完了 (NPM suffix・二階堂亜樹訂正)
- 残: RMU はライセンス保持者のみ取得 (45名)、アスリート選手 etc. 未取得
  → 公式サイトの構造変更待ち

### ★★ 中優先 — 大型ページがモック [完了済み 2026-04-27]

~~#4 `/rankings`~~ → 動的計算化
~~#5 `/schedule`~~ → 年間カレンダー版
~~#6 `/mleague`~~ → 動的計算化
~~#7 `/titles` 配下~~ → 動的ルート化

### ~~★ 低優先 — UI 磨き~~ [完了済 2026-04-28]
~~#12 Roster ページ体験改善~~ → "—"表示改善・準備中placeholder廃止
~~#13 ホームページ導線~~ → /players CTA + 実データカウント
~~#14 SEO~~ → 動的OG画像 + rich metadata

~~#16 故人の Hall of Fame セクション~~ → 採用せず、故人は削除する方針
- 削除済: 飯田正人、前原雄大 (両名とも roster から除外)
- 灘麻太郎は健在 (2024年87歳・現役) のため保持

---

## Mリーグ予想ゲーム (Hora.mg) — 残タスク

UI は claude design からの handoff を元に5画面 (`/predict`, `/predict/match/[id]`,
`/predict/me`, `/predict/ranking`, `/predict/result/[id]`) を実装済み。
獲得ptルールは案A (`(基本100 + 少数派50 + 連続50/100/200) × X連携(2 or 1)`) で
全ページ整合。以下が「動かす」ために必要な残タスク。

### ★★★ 高優先 — バックエンド (Supabase接続)

#### #G1 Supabase スキーマ + マイグレーション
- 必須テーブル: `profiles` / `matches` / `match_results` / `predictions` / `prediction_scores`
- Auth は Supabase 標準 (auth.users) + X (Twitter) OAuth プロバイダ
- RLS ポリシー: 試合開始 (`starts_at`) を過ぎたら predictions の INSERT/UPDATE 不可
- 設計詳細は会話ログ (2026-04-27 Mリーグ予想ゲーム DB 設計) 参照

#### #G2 X (Twitter) OAuth ログイン導線
- 「未ログイン状態」カードのCTAを Supabase Auth の `signInWithOAuth({ provider: 'twitter' })` に接続
- ログイン後ユーザーを `profiles` テーブルに upsert (handle, avatar)

#### #G3 試合スケジュール データ投入機構
- Mリーグ公式 (m-league.jp/schedule) はJS描画なのでスクレイプ困難
- **第一案:** 管理画面 (`/admin/predict/matches`) を作って週次手入力
- **第二案:** ABEMA番組表RSSをパースして自動投入
- 1シーズン80試合 × 4選手 = 400レコード/シーズン

#### #G4 試合結果入力 + スコア計算
- 試合終了後に1着〜4着 + 点数 (素点) を `match_results` に登録
- 登録時にトリガー or サーバー側ジョブで `prediction_scores` を一括更新
- スコアロジック: 案A 計算式をTSで実装 (`lib/predict/scoring.ts`)

#### #G5 予想投稿フォームの実動作化
- 現状 `<button className="btn-predict">` は飾り → onClick で投稿API叩く
- `app/api/predict/[matchId]/route.ts` で POST → predictions テーブル INSERT
- 締切過ぎたら 403 (UI でも disable)
- 投稿後リダイレクト or トースト表示

### ★★ 中優先 — UX / インタラクティブ要素

#### #G6 予想ページの X連携トグルを動的に
- 現状: `.toggle.on` 静的、合計 +300pt 固定表示
- 期待: トグル切替で reward-block の合計表示が `+300 ↔ +150` 切り替わる
- `"use client"` コンポーネントとして再実装、useState で管理

#### #G7 ptルール説明モーダル
- info-strip の「仕組みを見る →」リンク先が現状ない
- ルールを画面で見られるダイアログ or 専用 `/predict/rules` ページ
- 4種ボーナスの内訳 + 計算式 + 例 + ファイナル進出ライン

#### #G8 ファイナル進出ラインの確定
- ホームのサイドバー「ファイナル進出ライン +340pt」は仮値
- 実運用想定: 80試合 × 平均的中率 35% × 平均150pt ≒ 4,200pt → 5,000pt前後が目安
- /predict ホームと /predict/me の表示を統一

#### #G9 ランキングのフィルタ実動作
- /predict/ranking の pill (期間/対象/並び) は現状 className="on" 静的
- URL state (`?period=week&sort=hit`) と Supabase クエリに接続

### ★ 低優先 — 拡張機能

#### #G10 推し雀士フォロー機能
- /predict/me の「推し雀士」枠 (現状3名固定) を実機能化
- フォロー/フォロー解除ボタン (各 PlayerPage 上にも)
- Supabase に `follows(user_id, player_id)` テーブル追加

#### #G11 推し雀士ボーナス (案Aには現状なし)
- 案Aから外したが、追加するなら +30pt or X連携前 +50pt
- スコアロジック更新が必要

#### #G12 通知システム (推し選手出場・試合結果)
- /predict/me のベル + 「新着通知」枠を実機能化
- 候補: メール (Resend) / Web Push / X DM
- `notifications(user_id, type, payload, read_at)` テーブル

#### #G13 バッジシステムの実動作
- /predict/me の「獲得バッジ 7/24」は静的
- 実装には: バッジ定義テーブル + 達成判定ロジック (cron or trigger)

#### #G14 共有機能 (X 投稿テンプレ)
- 結果ページの「𝕏 で共有」ボタン → Twitter Web Intent
- 予想時の自動投稿 (X連携2倍ボーナスの前提条件)
- Twitter Developer App 取得 + access token 管理

#### #G15 Mリーグオフシーズン対応
- Mリーグは 9〜5月開催。6〜8月は試合がない
- ホームの「試合のない日」状態をオフシーズン全体で表示
- オフシーズン中は前シーズンランキングを参照モードに

---

## ホーム (`app/page.tsx`) の静的データ撲滅

### ~~#H1-H6, #H10-H12~~ → 完了 (2026-04-28)

### 残: #H7-H9 (試合データDB依存、#G3完了後)

#### #H7 「本日の対局」復活
- 試合スケジュールDB (`#G3`) と連動して当日の対局カードを表示
- 現状はホームから完全削除済 (代わりに /schedule への導線)

#### #H8 直近7日カレンダー復活
- 同上 (#G3 依存)

#### #H9 LIVE NOW sidebar 復活
- 同上 (試合進行データ要)

---

### コスト見積もり (運用後)
- Supabase free tier: 500MB DB / 50k MAU → 初年度カバー可能
- 5,000ユーザー × 80試合 × 1予想 = 40万行 ≈ 80MB. 余裕
- Pro ($25/月) は 50k MAU 超 or DB 8GB 超で必要

### 実装順序 (推奨)
1. #G1 Supabase スキーマ
2. #G2 X OAuth
3. #G3 + #G4 試合データ + 結果入力 (管理画面込み)
4. #G5 予想投稿
5. #G6 X連携トグル + #G7 ptルール表示
6. (シーズン開幕に間に合わせる) — 2025-26 開幕は 9〜10月
7. 順次 #G8〜#G15

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
