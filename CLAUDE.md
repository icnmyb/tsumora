# TSUMORA / ツモーラ — Claude Code Working Notes

このファイルは Claude Code がこの repo で作業する際の前提知識・規約・ハマりどころをまとめたもの。
ユーザー向け概要は `README.md`、タスク追跡は `.claude/roadmap.md` を参照。

---

## 🟢 現在の状態（最終更新: 2026-05-01）

**この欄はセッション終わりに必ず更新する。次セッションで `/clear` しても引き継げるように。**

### 進行中タスク
- ✅ `/mleague` 順位表の品位改善
  - 各行のチームカラー全面グラデーションを廃止
  - 左端の太めアクセント + チームらしさが残る濃い色面に変更
  - 色相はチームカラー準拠、明度と彩度だけを深い方向に補正
- ✅ `/mleague` 成績DB化の初期導線
  - `app/mleague/stats-db.ts` を追加
  - フェーズ別チーム成績・セミファイナル個人成績を構造化
  - 個人成績は `PlayerPhaseStats` として、半荘数・着順・1位率・ラス回避率・最高素点・ptを保持
  - 順位表の平均1位率/最高素点はフェーズ別データを優先
  - フェーズ別データがないFinal開幕前は平均1位率/最高素点を空表示
  - セミファイナルの個人成績Top10とカード内ptはSF個人ptを優先
  - 2026-05-01: SF個人成績24名分を実データで投入。出典は M.LEAGUE公式Stats、M.LEAGUE応援まとめサイト、クランクイン！、補助確認に麻雀ウォッチ。Final未開催時の個人ptは空表示に変更。検証は `next build` / `tsc --noEmit` 通過（環境に `npm` がないため実体コマンドで実行）
- ✅ `/mleague` スマホ順位表の一覧性改善
  - フェーズ切替を縦並びから3分割セグメントへ変更
  - 1画面で把握しやすいコンパクト順位表を追加
  - コンパクト表の右端は文脈に合わせ、レギュラー=1位率 / SF=期間pt / Final=首位差をヘッダー表記し、各行は値だけ表示
  - コンパクト行タップで既存の詳細カードへスムーズスクロール
  - 既存カードの質感は残し、スマホ見出しは「チーム詳細」に変更
- ✅ `/mleague` 順位表フェーズ切替UI
  - ページ遷移ではなく、同一ページ内の state でレギュラー/SF/Finalを切替
  - デフォルトはFinal表示
  - Finalは開幕前の持越pt表示（SF最終ptの1/2）に対応
  - `FINAL_2025_26.standings` を追加し、自動更新ジョブがFinal進行データを書ける構造にした
- ✅ Mリーグ 2025-26 セミファイナル最終結果反映
  - `SEMIFINAL_2025_26` を 2026-04-30 終了時点へ更新
  - Final進出: EX風林火山 / BEAST X / KONAMI麻雀格闘倶楽部 / TEAM RAIDEN/雷電
  - ホームのMリーグボードを FINALISTS 表示 + 5/4 Final初日 NEXT MATCH へ更新
  - `/mleague` をセミファイナル最終順位表示へ切替
  - `/schedule` の Final 発表待ち文言を進出4チーム名へ更新
- ✅ 5/4リリース必須タスク R1-R3 対応
  - `/mleague` は Final 開幕前の持越pt表示を維持し、Final未開催時は平均1位率・最高素点・個人ptを空表示
  - ホームのMリーグボードを Final 開幕前の開始時順位・持越pt・首位差・5/4 NEXT MATCH 文脈へ更新
  - `/schedule` の Final 日程の雷電表記を `TEAM RAIDEN/雷電` に統一
  - `app/mleague/stats-db.ts` は `phase: "final"` レコードを確認済みソースから追記できる構造を明記。未確認の最高素点は空のままにできる
  - `app/news/data.ts` は静的TSのまま、公開日時・出典URL・確認日・関連選手/チーム・SEO文言を持てる最小構造に更新
  - ニュース詳細ページは出典と関連チーム表示に対応
  - 検証: `npm` がないため Codexランタイムの Node で `./node_modules/.bin/tsc --noEmit` と `./node_modules/.bin/next build` を実行し通過
- ✅ 5/4リリース前の信頼性修正
  - MリーグSFデータを 2026-04-28 終了時点へ更新（5/1に最終結果へ更新済み）
  - Mリーグページの「レギュラー進行中」文言をSF終盤へ修正
  - 団体一覧/団体詳細の所属プロ数をTSUMORA掲載数へ更新
  - `/titles` のDUMMY UIをURL query式フィルタに置換
  - `/rankings` の未実装露出文言を削除
  - `/predict` CTAをComing Soonに合わせた表現へ修正
  - 選手詳細のランダム生成スタイル分析を削除
  - 重複していた BgLayers / CustomScrollbar を個別ページ側から削除
  - `metadataBase` を `https://tsumora.com` に設定
  - `npm run lint` を対話式で止まらない `tsc --noEmit` に変更
- ✅ Mリーグページ スマホUI 全面改修
  - team-card 折りたたみロスター（checkbox + label の CSS のみ実装）
  - FINAL進出ライン: 4位カードと5位カードの間に `.grid-border-line` 独立要素
  - ボーダー差・試合数・1位率・最高素点をカード内 stats 行に
  - 個人成績Top10 とリーグ概要を縦積み（two-col → 1fr）
  - ルールシート Mリーグルール改題、ラベル+値の縦並び 2列に
  - 1万点棒スクロールバーをモバイル非表示
- ✅ 順位表 tint: 各チーム色は全面に敷かず、左アクセント + 低彩度の余韻で表現
- ✅ BEAST X 配色: ドーンブルー (#002953) + dark forest green bg (#2d3f23)
- ✅ ホーム/Mリーグ以外のスマホUI再整備（指摘反映）
  - `/news` の見出しを「ニュース」に統一（PC/スマホ共通）
  - `/schedule` はスマホ見出しを「対局」に短縮。週カレンダーは既存表示を維持
  - `/titles` / `/teams` はスマホ見出しを「タイトル戦」「Mチーム」に短縮し、長い見出しの不自然な改行を回避
  - `/players` はスマホのみ「Mリーガー / 全選手一覧」切替を追加。PCは従来どおり両セクション表示
  - `/players` / `/titles` / `/rules` のフィルタはスマホで横一列の押しやすいタブ帯に寄せ、折返しの見苦しさを軽減

### 直近の主要決定
- **UX判断軸**: とにかく細部までユーザーのことを考え抜く。目を引くことより、読んでいる人が迷わず、疲れず、気持ちよく理解できることを優先する。
- **Mリーグ順位表**: `/mleague` は `regular` / `semifinal` / `final` をページ内で即時切替。5/4 Final開幕後は `FINAL_2025_26.standings` を更新すれば表示へ反映される。
- **Mリーグデータ方針**: 元データは `stats-db.ts` のようにDBへ移せる構造で保持し、表示用データは必要に応じて静的TSへ焼き込む。外部サイト依存を本番ランタイムに持ち込まない。確認不能な指標は入れず、Final未開催フェーズは個人成績も空表示。
- **5/4リリース優先順位**: 5/4までに必要なのは Final初日の表示・更新導線、ホーム/Mリーグ/スケジュールの文脈チェック、ニュース生成の最小運用、基本検証。Regular個人成績40名分の移行、出典メタデータのUI連携、ニュース制作ワークフロー本実装は5/4後でよい。
- **スマホ最終確認**: 2026-05-01の再指摘を受け、ホーム `/` と `/mleague` 以外は `/players`, `/schedule`, `/titles`, `/teams`, `/rules`, `/news` を中心に再調整済み。グロナビは既存の横スクロール型を維持する。リリース前の実機確認では、スケジュールが右切れしないか、フィルタが押しやすいかを優先して見る。
- **5/4ニュース最小運用**: CMS化はしない。Codex が `app/news/data.ts` に `publishedAt`、`sources`、`related`、`seoTitle`、`seoDescription` を埋めて短報を追加する。外部サイト名は正確に扱い、確認できない事実や数値は書かない。
- **Mリーグ成績の次の一手**: 麻雀ウォッチ等の記事ページは出場告知・速報文脈の確認に使い、成績値は M.LEAGUE公式Stats / M.LEAGUE応援まとめサイト / 公式発表系記事で二重確認する。Regular個人成績を `PlayerPhaseStats` に全40名分移す作業は重要だが、5/4リリース後に落ち着いて進める。
- **ニュース制作方針**: ニュースはユーザー手書き前提にしない。Codex が出典確認、構成、本文、メタデータ案、公開前チェックまで担える設計にする。未確認情報は書かない。
- **信頼性優先**: 確認不能な評価値（選手スタイル分析のランダム値）は表示しない方針。
- **fmtPts**: 負号は ASCII "-" に統一（U+2212 だと mono フォントで幅ズレ）
- **PC team-card は 153f80e 時点と pixel 一致**（モバイル改修は @media 内に閉じ込める鉄則）
- **モバイル順位表**: standings-wrap 非表示、team-grid を順位表として使用、見出しは「順位表」に切替

### 触ってはいけない箇所 / 注意
- `/predict` は Coming Soon、subpages は `notFound()` のまま
- PC view を変更する時は必ず @media (max-width: 720px) 内に閉じ込める。base CSS をいじると PC に漏れる
- `team-card` 内の Link は z-index 2 必須（モバイル overlay より前面）
- `.two-col` のモバイル化は line 2076 と 3477 の **両方**に @media 必要（cascade で後ろが勝つ）

### Codex 運用ルール
- Codex はこの repo では開発責任者として振る舞う。単なる実装者ではなく、仕様・データ信頼性・デザイン一貫性・検証まで見る。
- 作業前に、ユーザーが求めている「具体的な完了状態」を自分の言葉で確認する。特に「全部」「残り」「最高のUX」など粒度が広い依頼は、勝手に狭く解釈しない。
- 大きめの作業は、着手前にタスクリストと成功条件を提示する。ユーザーが「タスクリストだけ」と言った場合は実装を始めず、一覧提示で止める。
- ユーザー目線を外さない。内部都合のラベル、実装者にだけ分かる指標、シーズン文脈に合わない数字を出さない。迷ったら「その画面を見た人が次に知りたいこと」を優先する。
- 根拠のない仮定で進めない。データ・日付・試合状態・外部ソースは、曖昧なら確認してから反映する。確認できない値は表示しないか、未確定として扱う。
- 変更範囲は狭く保つ。依頼に関係ないリファクタや見た目変更を混ぜない。既存のよい質感やユーザーが気に入っている部分は壊さず活かす。
- 実装後は必ず `npm run lint` と `npm run build` を基本検証にする。検証できなかった場合は理由を明記する。
- 別スレッドでも継続できるように、まとまった作業の終わりにこの「現在の状態」を更新する。
- 更新する内容: 作業内容、触った主要ファイル、通した検証、未解決事項、次の一手、壊してはいけない注意点。
- 長期タスクや優先度の変更は `.claude/roadmap.md` に反映する。調査ログや根拠は必要に応じて `docs/` または `.claude/*` に残す。
- 会話だけに重要決定を残さない。次セッション開始時は `CLAUDE.md` と `.claude/roadmap.md` を読めば再開できる状態にする。

---

## ブランド前提（2026-04-29 確定）

- **正式名称**: TSUMORA / ツモーラ
- **URL**: tsumora.com（メイン）+ tsumora.mg / tsumora.jp（防衛）
- **意味**: ツモ + 裏（裏ドラ）+ 網羅（モーラ）+ 和了（ホーラ rhyme）
- **positioning**: 「裏ドラのように、表に出ない麻雀の深さを、毎日編む」
- **編集者**: 鷹見としや（JPML 39期 C2 / @tt_23_mm）
- **リポジトリパス**: `/Users/toshiya.takami/tsumora/`（2026-04-29 に旧 `hora/` からリネーム済み）

## プロジェクトの本質

**日本のプロ麻雀界を 1 サイトに集約する editorial portal**。
情報量より「読みやすさ・編集された見た目・コンテンツの質」を優先する。
SaaS テンプレ的な UI は避ける (`/.claude/rules/web/design-quality.md` の anti-template policy 準拠)。

## 言語・スタイル方針

- **日本語が一次言語**。UI 文言・コメント・コミットメッセージは原則日本語。英語は editorial accent (Instrument Serif italic) として副次的に。
- **ですます調は使わない**。簡潔・編集者調。
- **コード内コメントは最小**。WHY が非自明な箇所のみ短く。
- **ファイル末尾の余計な空行・コメントは消す**。

## ドメイン用語 (重要)

混同しがち。コード書く前に確認:

| 用語 | 内容 |
|---|---|
| **JPML** | 日本プロ麻雀連盟 (1981-) — 鳳凰位戦 / 十段位戦 / 王位戦 / 女流桜花 など |
| **NPM** | 日本プロ麻雀協会 (2001-) — 雀王戦 / 雀竜位戦 |
| **最高位戦** | 最高位戦日本プロ麻雀協会 (1976-) — 最高位戦 / Classic / 發王戦 |
| **RMU** | 麻雀競技連盟 (2007-) — 令昭位戦 / RMU クラウン / 闘魂杯 |
| **μ (ミュー)** | 麻将連合-μ- (1997-) — μリーグ / BIG1 カップ / 将妃戦 |
| **Mリーグ** | プロ団体ではない。10 チームのプロ団体横断トップリーグ (2018-) |
| **鳳凰位** | JPML 最高峰タイトル。"houou-isen" (slug) |
| **十段位** | JPML 第二タイトル。"judan-isen" |
| **雀王** | NPM 最高峰タイトル。"jakuou-isen" |
| **最高位** | 最高位戦最高峰タイトル。"saikouisen" |
| **令昭位** | RMU 最高峰タイトル。"reishouisen" |
| **連覇** | 同一タイトルを 2 期以上連続で防衛 (back-to-back) |
| **持越** | Mリーグ レギュラー終了pt の 1/2 が SF / Final に持ち込まれる |
| **半荘 (はんちゃん)** | 1 試合の単位。Mリーグは 1 夜 2 半荘 |

タイトル名の slug は `app/titles/data.ts` で管理。新しく書く時は必ず参照すること。

## データ構造の前提

### 階層
```
ALL_PLAYERS (40)        ← Featured Mリーガー (詳細プロフィール完備)
  ↑↓ id で結合
ROSTER_PLAYERS (~2,900) ← 5 団体ロスター (基本情報のみ、scraper 産)
```

### 主要データファイル

| ファイル | 内容 | 編集方針 |
|---|---|---|
| `app/players/data.ts` | Featured 40 Mリーガー | 手編集 (慎重に) |
| `app/players/roster/{org}.ts` | 団体ロスター | scraper で再生成、手編集しない |
| `app/teams/data.ts` | Mリーグ 10 チーム + 歴代シーズン結果 | 手編集 |
| `app/titles/data.ts` | 7 主要タイトル戦 | 手編集 |
| `app/mleague/sf-data.ts` | 2025-26 シーズン (レギュラー終了 + SF 進行中) | 公式更新追従で手編集 |
| `app/news/data.ts` | 編集部選注目記事 | 手編集、当面 6 件程度 |

### Player スキーマの罠
`title: string` (e.g. "鳳凰位×3") と `titles: { year, name }[]` は別物。前者はカード表示用ラベル、後者は履歴。両方更新すること。

### `mleagueTeam` フィールド
チーム名は `app/teams/data.ts` の `name` (ロング名) と一致しないといけない:
- "TEAM RAIDEN / 雷電" (フル形)
- "渋谷ABEMAS"
- "EARTH JETS"
など。`shortName` ではない。`teams.find((t) => t.name === player.mleagueTeam)` で検索される。

## デザインシステム

### CSS トークン (抜粋、`app/globals.css` 冒頭)
```css
--paper: oklch(... ≈ #ebe4d2)
--ink: #0b0b09
--ink-2: ... (本文 secondary)
--ink-3: ... (キャプション)
--ink-4: ... (罫線)
--vermilion: #c8282a   /* 朱 = 強調 / アクセント */
--gold: #a07e28        /* 金 = M リーグ系 */
--moss: #2f5c3f
```

### フォント階層
| 用途 | フォント | 例 |
|---|---|---|
| 日本語見出し・キャラクター | Shippori Mincho (900) | 「鳳凰位戦」「Mリーグ番付」 |
| 日本語本文 | Noto Sans JP (400-500) | リード文・記事本文 |
| 英文 mono / 番号 / ラベル | Geist Mono (700) | "01" "M.LEAGUE" "+436.3" |
| 英文 italic accent | Instrument Serif (italic) | "Career Title Counts" |

### Brutal offset shadow パターン
```css
border: var(--border);              /* 1.5px 黒線 */
box-shadow: 5px 5px 0 var(--ink);   /* 固定オフセット影 */
```
ホバー時に `7px 7px 0` + `transform: translate(-2px, -2px)` で立体感。サイト全体でこの構文を踏襲。

### モバイル breakpoint
- `1400px+` : 最大幅
- `980px-` : `.grid-2col` などが 2col → 1col
- `880px-` : `.home-hero` 縦積み, `.grid-2col` 1col
- `720px-` : `.wrap` padding 28→14, masthead 縦積み, nav 番号非表示
- `600px-` : `.hrl-row` 詰め, `.orgs-section h2` 縮小
- `480px-` : `.orgs-grid` 1col, `.home-hero-grid` 1col
- `380px-` : Masthead h1 44px, KV 1 個非表示

新しいセクション追加するときも上記 breakpoint に合わせる。

## よく使うコマンド

```bash
npm run dev                  # 開発サーバ http://localhost:3000
npm run build                # プロダクションビルド (型チェック含む)
npx tsc --noEmit             # 型チェックのみ

# データ取得 (注意: 公式サイト負荷)
node scripts/scrape-jpml.mjs
node scripts/scrape-npm.mjs
# ... 他団体も同様
```

`build` 通すまでが 1 タスク完了の最低基準。

## ハマりやすいポイント

1. **Next.js 15 async params**: `params: Promise<{ slug: string }>` が必須。`const { slug } = await params;`
2. **app/page.tsx は Server Component**: `useState` 等使えない。クライアント要素は `"use client"` 別ファイル化。
3. **データの責任分離**:
   - `lib/computed.ts` の `computeMleagueStandings()` はレギュラー終了の確定順位 (実データ)
   - `app/mleague/sf-data.ts` の `SEMIFINAL_2025_26.standings` は SF 進行中順位 (合計pt = 持越 + SFpt)
   - 旧版で `annualPoints` 合算近似してた頃の名残コードあり、混同注意
4. **Roster の player ID と Featured の player ID は重複しないか確認**: `roster.ts` 内で重複検出ロジックあり、`ALL_PLAYERS` に存在する id は除外する
5. **画像なし**: 選手アバターは「名前頭文字 + チーム色背景」のテキストアバターで統一。実写画像は使わない (権利と編集自由度のため)
6. **新規ページ追加時**:
   - `app/<route>/page.tsx`
   - `metadata` (title / description) を必ず export
   - 大量の動的 route は `generateStaticParams` で SSG 化
7. **`app/globals.css` が既に巨大** (~4,500 行): 新セクションは末尾追加 + コメント区切り。既存トークン (`--ink` `--paper` 等) を必ず使う
8. **CSS クラス名衝突**: 例えば `.hmb-*` が複数のブロックで使われていた事故あり。新規プレフィクスを付けるかリネームで分離する

## サブエージェント活用

- `planner`: 大きな機能追加 / リファクタ前
- `code-reviewer`: コード書いた直後 (auto)
- `typescript-reviewer`: 型に絡む変更時
- `e2e-runner`: ユーザーフロー検証 (Playwright)

`Agent` ツール経由で呼び出し。

## ロードマップ

`.claude/roadmap.md` を参照。重要トラック:
- **#G1-G5**: Supabase バックエンド (`/predict` 予想ゲーム + 将来的にニュース DB)
- **#G3**: 対局スケジュール実データ統合 (公式 API 不在のため scraper 必要)
- **#H シリーズ**: ホームページ動的化 (大半完了済み)

## 禁止事項

- **捏造データを書かない**。確認できないデータは「未整備」「データ準備中」と honest に表示。
- **デザインの "ぼんやりミニマル" 化禁止**。editorial で一貫させる (`design-quality.md` 参照)。
- **画面サイズの動作確認なしに UI レビュー完了とみなさない**。最低 375 / 768 / 1280 で見る。

## 関連ドキュメント

- `README.md` — プロジェクト概要 (人間向け)
- `.claude/roadmap.md` — タスク
- `.claude/league-research-progress.md` — 各団体リサーチログ
- `~/.claude/rules/web/*` — グローバル web 規約

## 作業ログ: 2026-05-01 スマホUI最終整備

### 対象
ホーム `/` と `/mleague` は直接対象外。到達可能な公開ページとして `/about`, `/players`, `/players/[id]`, `/organizations`, `/organizations/[slug]`, `/teams`, `/teams/[slug]`, `/titles`, `/titles/[slug]`, `/rankings`, `/schedule`, `/rules`, `/news`, `/news/[slug]`, `/predict` を確認対象にした。

`/predict/me`, `/predict/ranking`, `/predict/match/[id]`, `/predict/result/[id]` はコード上で `notFound()` のままなので通常到達対象外。ただし将来復活時に崩れにくいよう `app/predict/predict.css` にはモバイル補強を追加済み。

### 変更内容
- `app/globals.css`: `max-width: 720px` / `480px` の追加ルールで、共通hero、選手詳細、団体/チーム/タイトル詳細、ランキング、スケジュール、ニュース、about、表レイアウトをスマホ向けに調整。
- `app/predict/predict.css`: `/predict` と将来復活予定の予想系サブ画面向けに、カード、選手グリッド、フォーム、ランキング表、固定フッターのスマホ表示を整理。
- `app/rankings/page.tsx`: ランキング表に `rank-table-shell` を付け、スマホでは表の内側だけ横スクロールするよう変更。

### 検証
- `npm run lint`: 環境に `npm` がないため実行不可。
- `./node_modules/.bin/next build`: Codexランタイム Node で通過。
- `./node_modules/.bin/tsc --noEmit`: Codexランタイム Node で通過。
- dev server `http://localhost:3010` で `/about`, `/players`, `/players/setokuma`, `/organizations`, `/organizations/jpml`, `/teams`, `/teams/furinkazan`, `/titles`, `/titles/houou-isen`, `/rankings`, `/schedule`, `/rules`, `/news`, `/news/shiratori-42-houou-defense`, `/predict` のHTTP 200を確認。

### 残リスク
Playwright本体はあるがブラウザバイナリが未インストールだったため、スクリーンショットによる実描画検査は未実施。リリース前に実機またはブラウザの375px/390px幅で、特に `/players`, `/players/[id]`, `/organizations/[slug]`, `/titles/[slug]`, `/rankings`, `/schedule`, `/news/[slug]` を目視確認すると安心。

## 作業ログ: 2026-05-01 スマホUI再整備（指摘反映）

### 変更内容
- `app/news/page.tsx`: 一覧見出しを「ニュース」に変更。
- `app/globals.css`: グロナビは既存の横スクロール型に戻し、ページ内フィルタとスケジュール表示のスマホ補正だけ残す。
- `app/schedule/page.tsx` / `app/globals.css`: スマホ見出しを「対局」に短縮。週カレンダーは既存表示を維持し、対局行のみ時刻・状態・タイトルが読める2カラムカード寄りに調整。
- `app/titles/page.tsx` / `app/teams/page.tsx`: スマホ見出しをそれぞれ「タイトル戦」「Mチーム」に短縮。
- `app/players/page.tsx`: スマホのみ `Mリーガー` と `全選手一覧` の切替タブを追加。PCは従来どおり両方表示。
- `app/rules/page.tsx` / `app/globals.css`: ルールの団体フィルタとサブルール切替をスマホで横スクロールのタブ帯化。比較表は画面端まで使う形に補正。

### 検証
- `npm run lint`: 環境に `npm` がないため実行不可。
- `./node_modules/.bin/tsc --noEmit`: Codexランタイム Node で通過。
- `./node_modules/.bin/next build`: Codexランタイム Node で通過。

### 残リスク
今回もブラウザバイナリがない環境のためスクリーンショット検査は未実施。375px/390px幅の実機またはブラウザで、特に `/players`, `/schedule`, `/titles`, `/teams`, `/rules`, `/news` を最終目視する。
