// app/news/data.ts
// 注目記事データ。タイトル保持者・Mリーグ進行など実データに基づく短報のみ。

export type NewsCategory = "title" | "mleague" | "result" | "info";

export interface NewsSourceRef {
  label: string;
  url: string;
  checkedAt: string; // YYYY-MM-DD
}

export interface NewsArticle {
  slug: string;
  date: string; // YYYY-MM-DD or YYYY-MM
  publishedAt?: string; // ISO 8601
  category: NewsCategory;
  headline: string;
  lead: string;
  body: string[];
  seoTitle?: string;
  seoDescription?: string;
  sources?: NewsSourceRef[];
  related?: Array<
    | { type: "title"; id: string }
    | { type: "player"; id: string }
    | { type: "team"; id: string }
  >;
}

export const NEWS: NewsArticle[] = [
  {
    slug: "shiratori-42-houou-defense",
    date: "2026-04",
    category: "title",
    headline: "白鳥 翔、第42期鳳凰位戦で連覇に挑む",
    lead:
      "現鳳凰位の白鳥翔が第42期鳳凰位戦に出場。日本プロ麻雀連盟最高峰のタイトル戦が、現王者の連覇を懸けた構図で進行している。",
    body: [
      "日本プロ麻雀連盟 (JPML) の最上位タイトル戦である鳳凰位戦。前期第41期で戴冠した白鳥翔が、第42期でその防衛に挑む。",
      "鳳凰位戦は連盟所属プロがA1〜D2の各リーグを通じて頂点を目指すリーグ戦形式で、最終的にA1上位選手が決定戦に進出する。第42期も全リーグ並走で進行中。",
    ],
    related: [
      { type: "title", id: "houou-isen" },
      { type: "player", id: "shiratori" },
    ],
  },
  {
    slug: "nakabayashi-23-jakuou-back-to-back",
    date: "2025-11",
    category: "title",
    headline: "仲林 圭、第23期雀王戦で連覇達成",
    lead:
      "仲林圭が第23期雀王戦の決定戦を制し、雀王タイトルの連覇を達成。日本プロ麻雀協会 (NPM) の最頂点に2期連続で立った。",
    body: [
      "日本プロ麻雀協会 (NPM) の最頂点タイトルである雀王。仲林圭が第23期決定戦を制し、第22期に続く連覇を達成した。",
      "決定戦進出はAリーグ上位選手による争奪戦を経て決まり、複数日にわたる長丁場で雌雄を決する形式となっている。",
    ],
    related: [
      { type: "title", id: "jakuou-isen" },
      { type: "player", id: "nakabayashi" },
    ],
  },
  {
    slug: "kawano-16-reishoui",
    date: "2024-12",
    category: "title",
    headline: "河野 高志、第16期令昭位を戴冠",
    lead:
      "RMU所属の河野高志が第16期令昭位戦を制し、麻雀連合-μ-を母体とする団体内最高峰タイトルである令昭位を獲得した。",
    body: [
      "RMU (麻雀競技連盟) の最高峰タイトルである令昭位戦。第16期決定戦は河野高志が制し、団体最高峰の座に就いた。",
      "RMUは独自の競技ルール体系を採るプロ団体で、令昭位はその頂点を象徴するタイトルとして位置づけられている。",
    ],
    related: [
      { type: "title", id: "reishouisen" },
      { type: "player", id: "kawano" },
    ],
  },
  {
    slug: "ishii-49-saikoui",
    date: "2025-12",
    category: "title",
    headline: "石井 一馬、第49期最高位を獲得",
    lead:
      "石井一馬が第49期最高位戦決定戦を制し、初の最高位獲得。タイトル戦の常連が遂に頂点に立った。",
    body: [
      "最高位戦日本プロ麻雀協会の最高位タイトル。第49期は石井一馬が決定戦を制し、自身初の最高位獲得を果たした。",
      "石井は最高位戦Classicの決勝進出経験もあるタイトル戦の常連で、長年の研鑽が頂点で結実した形となった。",
    ],
    related: [
      { type: "title", id: "saikouisen" },
      { type: "player", id: "ishii" },
    ],
  },
  {
    slug: "miura-41-judan-back-to-back",
    date: "2024-12",
    category: "title",
    headline: "三浦 智博、第41期十段位を連覇",
    lead:
      "日本プロ麻雀連盟 (JPML) 所属の三浦智博が第41期十段位戦で連覇達成。連盟二大タイトルの一角を2期連続で守った。",
    body: [
      "日本プロ麻雀連盟 (JPML) の二大タイトルのひとつである十段位戦。三浦智博が第41期決定戦を制し、第40期に続く連覇を達成した。",
      "十段位戦は連盟所属プロが頂点を目指すノックアウト方式のタイトル戦で、三浦は2期続けてその頂点に立っている。",
    ],
    related: [
      { type: "title", id: "judan-isen" },
      { type: "player", id: "miura" },
    ],
  },
  {
    slug: "mleague-2025-26-progress",
    date: "2026-04-30",
    publishedAt: "2026-04-30T23:30:00+09:00",
    category: "mleague",
    headline: "Mリーグ 2025-26、ファイナル進出4チームが決定",
    lead:
      "Mリーグ 2025-26セミファイナルが終了。EX風林火山、BEAST X、KONAMI麻雀格闘倶楽部、TEAM RAIDEN/雷電がファイナルへ進出した。",
    body: [
      "Mリーグ 2025-26 シーズンのセミファイナルは全30試合を終了。EX風林火山、BEAST X、KONAMI麻雀格闘倶楽部、TEAM RAIDEN/雷電の4チームがファイナル進出を決めた。",
      "ファイナルは5月4日開幕予定。セミファイナルを首位通過したEX風林火山を、BEAST X・KONAMI・雷電が追う構図で最終決戦に入る。",
    ],
    seoTitle: "Mリーグ2025-26 ファイナル進出4チーム決定",
    seoDescription:
      "Mリーグ2025-26のファイナル進出チーム、開幕日、開始時ポイントの文脈を確認できるTSUMORA短報。",
    sources: [
      {
        label: "M.LEAGUE公式：セミファイナルシリーズ結果について",
        url: "https://m-league.jp/news202605011200/",
        checkedAt: "2026-05-03",
      },
      {
        label: "M.LEAGUE公式：試合日程（ファイナル日程）",
        url: "https://m-league.jp/games/",
        checkedAt: "2026-05-03",
      },
      {
        label: "M.LEAGUE公式：ファイナル最終決戦 PV/表彰式（5/15 17:00開始）",
        url: "https://m-league.jp/news202604131200/",
        checkedAt: "2026-05-03",
      },
    ],
    related: [
      { type: "team", id: "furinkazan" },
      { type: "team", id: "beast-x" },
      { type: "team", id: "konami" },
      { type: "team", id: "raiden" },
    ],
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}

export function getCategoryLabel(c: NewsCategory): string {
  switch (c) {
    case "title":
      return "タイトル";
    case "mleague":
      return "Mリーグ";
    case "result":
      return "結果";
    case "info":
      return "お知らせ";
  }
}
