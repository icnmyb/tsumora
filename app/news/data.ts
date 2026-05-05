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
  primary: "mleague-2025-26-final-day2",
  secondary: [
    "mleague-2025-26-final-day1",
    "mleague-2025-26-final-opening",
  ],
} as const;

export const NEWS: NewsArticle[] = [
  {
    slug: "mleague-2025-26-final-day2",
    date: "2026-05-05",
    publishedAt: "2026-05-05T23:45:00+09:00",
    category: "mleague",
    headline: "ファイナル2日目、KONAMIが首位へ浮上",
    lead:
      "Mリーグ2025-26ファイナル2日目は黒沢咲と伊達朱里紗がトップを獲得。KONAMI麻雀格闘倶楽部が288.3ptで首位に立ち、EX風林火山は182.3ptで2位へ後退した。",
    body: [
      "ファイナルシリーズ2日目の第1試合はTEAM RAIDEN/雷電の黒沢咲が54.3ptでトップ。BEAST Xの中田花奈が10.4ptで2着、KONAMI麻雀格闘倶楽部の高宮まりが-18.4pt、EX風林火山の永井孝典が-46.3ptとなった。",
      "第2試合はKONAMI麻雀格闘倶楽部の伊達朱里紗が78.4ptの大きなトップを獲得。BEAST Xの東城りおが11.0ptで2着、雷電の本田朋広が-10.2pt、風林火山の内川幸太郎が-79.2ptで4着となり、ポイントが大きく動いた。",
      "4試合終了時点のチーム順位はKONAMIが288.3ptで首位、風林火山が182.3ptで2位、雷電が74.7ptで3位、BEAST Xが63.0ptで4位。個人成績では滝沢和典(87.9pt)に続き、伊達朱里紗(78.4pt)、二階堂亜樹(61.1pt)、黒沢咲(54.3pt)が上位につけている。",
    ],
    seoTitle: "Mリーグ2025-26ファイナル2日目結果（KONAMI首位）",
    seoDescription:
      "Mリーグ2025-26ファイナル2日目、黒沢咲と伊達朱里紗がトップ。4試合終了時点のチーム順位と個人成績上位を短報で整理。",
    sources: [
      {
        label: "M.LEAGUE公式：試合日程（2025-26）",
        url: "https://m-league.jp/games/",
        checkedAt: "2026-05-05",
      },
      {
        label: "M.LEAGUE公式：ファイナル順位（進行中）",
        url: "https://m-league.jp/",
        checkedAt: "2026-05-05",
      },
    ],
    related: [
      { type: "team", id: "konami" },
      { type: "team", id: "furinkazan" },
      { type: "team", id: "raiden" },
      { type: "team", id: "beast-x" },
    ],
  },
  {
    slug: "mleague-2025-26-final-day1",
    date: "2026-05-04",
    publishedAt: "2026-05-04T23:45:00+09:00",
    category: "mleague",
    headline: "Mリーグファイナル初日、風林火山が首位を固める",
    lead:
      "Mリーグ2025-26ファイナルが開幕。第1試合は二階堂亜樹、第2試合は滝沢和典がトップを獲得し、EX風林火山が307.8ptで首位を守った。",
    body: [
      "ZOZOTOWN Mリーグ2025-26ファイナルシリーズは5月4日に開幕し、初日は2試合が行われた。第1試合はEX風林火山の二階堂亜樹が61.1ptでトップ。KONAMI麻雀格闘倶楽部の佐々木寿人が20.0ptで2着に入り、TEAM RAIDEN/雷電の瀬戸熊直樹、BEAST Xの鈴木大介が続いた。",
      "第2試合はKONAMI麻雀格闘倶楽部の滝沢和典が87.9ptでトップを獲得。EX風林火山の内川幸太郎が23.4ptで2着に入り、雷電の萩原聖人、BEAST Xの下石戟が苦しいスタートとなった。",
      "2試合終了時点のチーム順位はEX風林火山が307.8ptで首位。KONAMI麻雀格闘倶楽部が228.3ptで2位に浮上し、BEAST Xは41.6pt、TEAM RAIDEN/雷電は30.6ptで追う形になった。ファイナルは全16試合。初日は風林火山が持ち越しリードを広げつつ、KONAMIも滝沢の大トップで一気に射程へ入った。",
    ],
    seoTitle: "Mリーグ2025-26ファイナル初日結果",
    seoDescription:
      "Mリーグ2025-26ファイナル初日、二階堂亜樹と滝沢和典がトップ。2試合終了時点のチーム順位と個人成績を短報で整理。",
    sources: [
      {
        label: "キンマweb：Mリーグ2025-26 試合結果 / ファイナル（5月4日更新）",
        url: "https://kinmaweb.jp/archives/275197",
        checkedAt: "2026-05-05",
      },
      {
        label: "キンマweb：Mリーグ2025-26 チーム・個人成績 / ファイナル（5月4日更新）",
        url: "https://kinmaweb.jp/archives/275195",
        checkedAt: "2026-05-05",
      },
    ],
    related: [
      { type: "team", id: "furinkazan" },
      { type: "team", id: "konami" },
      { type: "team", id: "beast-x" },
      { type: "team", id: "raiden" },
    ],
  },
  {
    slug: "m-tournament-2026-announced",
    date: "2026-05-01",
    publishedAt: "2026-05-01T15:00:00+09:00",
    category: "mleague",
    headline: "Mトーナメント2026、6月1日開幕へ",
    lead:
      "Mリーグのオフシーズン企画『Mトーナメント2026』が6月1日15時からABEMAで独占生放送。現Mリーガー40名と団体推薦32名、総勢72名が個人戦でぶつかる。",
    body: [
      "Mリーグ機構は5月1日、ABEMAオリジナル対局企画『Mトーナメント2026』を6月1日15時から放送すると発表した。Mリーグの冠を掲げるオフシーズン企画で、放送はABEMA麻雀チャンネル。初回以降は毎週月曜が無料、金曜はABEMAプレミアムおよび広告つきABEMAプレミアム限定の生中継となる。",
      "出場者は現Mリーガー40名に、鳳凰位・最高位・雀王など各団体の推薦者32名を加えた総勢72名。ルールはMリーグルールで、2半荘・2位勝ち抜けの個人トーナメントとして行われる。予選1stステージでは1位通過者が3rdステージへ、2位通過者が2ndステージへ進む形式だ。",
      "賞金総額は3,000万円。2026年5月15日に最終決戦を迎えるMリーグ2025-26の優勝チーム4名と個人賞獲得者4名は、予選3rdステージからのシードで参戦する。2023年の渋川難波、2024年の小林剛、2025年の堀慎吾に続く優勝者が誰になるか、オフシーズンの大きな軸になりそうだ。",
    ],
    seoTitle: "Mトーナメント2026が6月1日開幕",
    seoDescription:
      "Mトーナメント2026の放送開始日、出場者規模、トーナメント形式、賞金総額、シード条件をTSUMORA視点で整理。",
    sources: [
      {
        label: "M.LEAGUE公式：Mトーナメント2026 独占生放送決定",
        url: "https://m-league.jp/news202605011500/",
        checkedAt: "2026-05-04",
      },
      {
        label: "Mトーナメント公式サイト",
        url: "https://m-tournament.m-league.jp/",
        checkedAt: "2026-05-04",
      },
    ],
  },
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
