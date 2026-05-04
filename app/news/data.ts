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

// HOMEの大きいニュース1件・小さいニュース2件はここで手動選択する。
export const HOME_NEWS_SELECTION = {
  primary: "mleague-2025-26-final-opening",
  secondary: [
    "watanabe-futoshi-34th-mahjong-masters",
    "mleague-2025-26-progress",
  ],
} as const;

export const NEWS: NewsArticle[] = [
  {
    slug: "watanabe-futoshi-34th-mahjong-masters",
    date: "2026-05-03",
    publishedAt: "2026-05-04T12:00:00+09:00",
    category: "title",
    headline: "渡辺 太、9時間の激闘を制し第34期麻雀マスターズ戴冠",
    lead:
      "第34期麻雀マスターズ決勝戦は渡辺太が優勝。白鳥翔、白石宏司、浅見真紀との決勝卓を制し、連盟主催のビッグタイトルに名を刻んだ。",
    body: [
      "日本プロ麻雀連盟主催の第34期麻雀マスターズ決勝戦が5月3日に行われ、最高位戦日本プロ麻雀協会所属の渡辺太が優勝した。決勝卓は渡辺太、白鳥翔、白石宏司、浅見真紀の4名。半荘5回戦、長時間の勝負を最後まで走り切った渡辺が頂点に立った。",
      "渡辺はMリーグでは赤坂ドリブンズの一員として知られ、ネット麻雀由来の精密な押し引きと、局面を細かく分解する思考で評価を高めてきた。今回の戴冠は、Mリーグの外側にある主要タイトル戦でもその地力を示した結果といえる。",
      "麻雀マスターズはプロ・アマが交わるオープンタイトルとして、短期決戦の強さと対応力が問われる舞台。決勝メンバーの顔ぶれも重く、渡辺にとってはキャリア上の大きなタイトル追加となった。",
    ],
    seoTitle: "渡辺太が第34期麻雀マスターズ優勝",
    seoDescription:
      "渡辺太が第34期麻雀マスターズ決勝戦を制して優勝。決勝卓、位置づけ、TSUMORA視点での意味を短報で整理。",
    sources: [
      {
        label: "雀サクッ：第34期麻雀マスターズ 優勝は渡辺太プロ",
        url: "https://jan39.com/news/57623",
        checkedAt: "2026-05-04",
      },
    ],
    related: [
      { type: "player", id: "watanabe" },
    ],
  },
  {
    slug: "mleague-2025-26-final-opening",
    date: "2026-05-04",
    publishedAt: "2026-05-04T12:10:00+09:00",
    category: "mleague",
    headline: "Mリーグ 2025-26、いよいよファイナル開幕",
    lead:
      "EX風林火山、BEAST X、KONAMI麻雀格闘倶楽部、TEAM RAIDEN/雷電の4チームが、全16試合の最終決戦へ入る。",
    body: [
      "ZOZOTOWN Mリーグ2025-26は、5月4日からファイナルシリーズへ入る。セミファイナルを勝ち抜いたのはEX風林火山、BEAST X、KONAMI麻雀格闘倶楽部、TEAM RAIDEN/雷電の4チーム。ここから全16試合でシーズンの最終順位が決まる。",
      "開始時点ではセミファイナルまでの持ち越しポイントがあるため、単純な横一線ではない。とはいえ、ファイナルは1日ごとの振れ幅が大きく、トップラスひとつで景色が変わる短期決戦でもある。リードを守るチーム、追うチーム、それぞれの打ち方が早い段階から問われる。",
      "最終日は5月15日、17:00開始予定。通常日とは開始時刻が異なり、表彰式とパブリックビューイングも併催される。TSUMORAでは期間中、日々の結果確認と順位データ更新を継続していく。",
    ],
    seoTitle: "Mリーグ2025-26 ファイナル開幕",
    seoDescription:
      "Mリーグ2025-26ファイナルシリーズが5月4日に開幕。出場4チーム、全16試合、最終日17:00開始の要点を整理。",
    sources: [
      {
        label: "M.LEAGUE公式：セミファイナルシリーズ結果について",
        url: "https://m-league.jp/news202605011200/",
        checkedAt: "2026-05-04",
      },
      {
        label: "PR TIMES：BEAST X ファイナルシリーズ進出発表",
        url: "https://prtimes.jp/main/html/rd/p/000001192.000008010.html",
        checkedAt: "2026-05-04",
      },
      {
        label: "M.LEAGUE公式：ファイナル最終決戦 PV/表彰式",
        url: "https://m-league.jp/news202604131200/",
        checkedAt: "2026-05-04",
      },
    ],
    related: [
      { type: "team", id: "furinkazan" },
      { type: "team", id: "beast-x" },
      { type: "team", id: "konami" },
      { type: "team", id: "raiden" },
    ],
  },
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

export function getSortedNews(): NewsArticle[] {
  return [...NEWS].sort((a, b) => {
    const aTime = a.publishedAt ?? a.date;
    const bTime = b.publishedAt ?? b.date;
    return aTime < bTime ? 1 : aTime > bTime ? -1 : 0;
  });
}

export function getHomeNewsSelection(): {
  topStory: NewsArticle;
  otherNews: NewsArticle[];
} {
  const sortedNews = getSortedNews();
  const selectedTop =
    getNewsBySlug(HOME_NEWS_SELECTION.primary) ?? sortedNews[0];
  if (!selectedTop) {
    throw new Error("NEWS must contain at least one article.");
  }
  const selectedTopSlug = selectedTop.slug;
  const selectedOthers = HOME_NEWS_SELECTION.secondary
    .map((slug) => getNewsBySlug(slug))
    .filter(
      (article): article is NewsArticle =>
        article !== undefined && article.slug !== selectedTopSlug,
    )
    .slice(0, 2);

  if (selectedOthers.length >= 2) {
    return { topStory: selectedTop, otherNews: selectedOthers };
  }

  const fallbackOthers = sortedNews.filter(
    (article) =>
      article.slug !== selectedTopSlug &&
      !selectedOthers.some((selected) => selected.slug === article.slug),
  );

  return {
    topStory: selectedTop,
    otherNews: [...selectedOthers, ...fallbackOthers].slice(0, 2),
  };
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
