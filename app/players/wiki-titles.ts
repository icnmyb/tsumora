// app/players/wiki-titles.ts
// Wikipedia の雀士 infobox「タイトル」欄から生成。
// 対象: Mリーガー + 各団体A/Bリーガーのうち、Wikipedia記事にタイトル欄がある選手。

import type { TitleEntry } from "./data";

export interface WikiTitleOverride {
  title: string;
  titles: TitleEntry[];
  source: string;
  sourceTitle: string;
}

export const WIKI_TITLE_OVERRIDES = {
  "hiro-shibata": {
    "title": "鳳凰位",
    "titles": [
      {
        "year": "2023",
        "name": "第39期鳳凰位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/HIRO%E6%9F%B4%E7%94%B0",
    "sourceTitle": "HIRO柴田"
  },
  "dump_ohashi": {
    "title": "麻雀グランプリMAX",
    "titles": [
      {
        "year": "2019",
        "name": "第9期麻雀グランプリMAX"
      },
      {
        "year": "2009",
        "name": "第34期王位戦"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%B3%E3%83%97%E5%A4%A7%E6%A9%8B",
    "sourceTitle": "ダンプ大橋"
  },
  "tomotakemasaharu": {
    "title": "鳳凰位",
    "titles": [
      {
        "year": "2007",
        "name": "第24期鳳凰位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E3%81%A8%E3%82%82%E3%81%9F%E3%81%91%E9%9B%85%E6%99%B4",
    "sourceTitle": "ともたけ雅晴"
  },
  "rinno_nao": {
    "title": "プロクイーン×3",
    "titles": [
      {
        "year": "2025",
        "name": "Princessoftheyear2025"
      },
      {
        "year": "2024",
        "name": "第22期プロクイーン"
      },
      {
        "year": "2024",
        "name": "第22期プロクイーン決定戦"
      },
      {
        "year": "2022",
        "name": "第20期プロクイーン"
      },
      {
        "year": "2022",
        "name": "第20期プロクイーン決定戦"
      },
      {
        "year": "2020",
        "name": "第18期プロクイーン"
      },
      {
        "year": "2020",
        "name": "第18期プロクイーン決定戦"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E3%82%8A%E3%82%93%E3%81%AE%E3%81%AA%E3%81%8A",
    "sourceTitle": "りんのなお"
  },
  "aikawa": {
    "title": "四神降臨女流王座",
    "titles": [
      {
        "year": "2019",
        "name": "四神降臨女流王座2019"
      },
      {
        "year": "2006",
        "name": "第5回チャンピオンロード雀王シリーズ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%80%A2%E5%B7%9D%E6%81%B5%E5%A4%A2",
    "sourceTitle": "逢川恵夢"
  },
  "ando_hiroki": {
    "title": "雀竜位×2",
    "titles": [
      {
        "year": "2024",
        "name": "第23期雀竜位"
      },
      {
        "year": "2022",
        "name": "第21期雀竜位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%AE%89%E8%97%A4%E5%BC%98%E6%A8%B9",
    "sourceTitle": "安藤弘樹"
  },
  "date": {
    "title": "Mリーグ2023-24シーズン4着回避率トップ",
    "titles": [
      {
        "year": "2023",
        "name": "Mリーグ2023-24シーズン4着回避率トップ"
      },
      {
        "year": "2022",
        "name": "Mリーグ2022-23シーズンMVP"
      },
      {
        "year": "2021",
        "name": "Mリーグ2021-22シーズン間最高スコア賞"
      },
      {
        "year": "2021",
        "name": "第1期桜蕾"
      },
      {
        "year": "2021",
        "name": "第1期桜蕾戦"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BC%8A%E9%81%94%E6%9C%B1%E9%87%8C%E7%B4%97",
    "sourceTitle": "伊達朱里紗"
  },
  "itouyuukou": {
    "title": "發王位×2",
    "titles": [
      {
        "year": "2019",
        "name": "第36期十段位"
      },
      {
        "year": "1999",
        "name": "第7期發王位"
      },
      {
        "year": "1998",
        "name": "第6期發王位"
      },
      {
        "year": "1992",
        "name": "第3期最強位"
      },
      {
        "year": "1992",
        "name": "第9期鳳凰位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BC%8A%E8%97%A4%E5%84%AA%E5%AD%9D",
    "sourceTitle": "伊藤優孝"
  },
  "sonoda": {
    "title": "TheAllStarLeague2017・2018優勝×2",
    "titles": [
      {
        "year": "2018",
        "name": "Mリーグ2018優勝"
      },
      {
        "year": "2018",
        "name": "TheAllStarLeague2017・2018優勝"
      },
      {
        "year": "2018",
        "name": "麻雀駅伝2018優勝"
      },
      {
        "year": "2017",
        "name": "TheAllStarLeague2017・2018優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%9C%92%E7%94%B0%E8%B3%A2",
    "sourceTitle": "園田賢"
  },
  "shimoishi": {
    "title": "Mリーグ2025-26シーズンMVP",
    "titles": [
      {
        "year": "2025",
        "name": "Mリーグ2025-26シーズンMVP"
      },
      {
        "year": "2023",
        "name": "第15期RMUクラウン"
      },
      {
        "year": "2011",
        "name": "2011ウェスタンチャンピオンシップ優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%B8%8B%E7%9F%B3%E6%88%9F",
    "sourceTitle": "下石戟"
  },
  "kayamori": {
    "title": "女流最高位",
    "titles": [
      {
        "year": "2011",
        "name": "第11期女流最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E8%8C%85%E6%A3%AE%E6%97%A9%E9%A6%99",
    "sourceTitle": "茅森早香"
  },
  "iwasaki_keigo": {
    "title": "日本オープン",
    "titles": [
      {
        "year": "2023",
        "name": "第21回日本オープン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%B2%A9%E5%B4%8E%E5%95%93%E6%82%9F",
    "sourceTitle": "岩崎啓悟"
  },
  "yoshida_tomohiro": {
    "title": "2002世界麻雀選手権団体優勝",
    "titles": [
      {
        "year": "2002",
        "name": "2002世界麻雀選手権団体優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%90%89%E7%94%B0%E7%9F%A5%E5%BC%98",
    "sourceTitle": "吉田知弘"
  },
  "tachibana_tetsuya": {
    "title": "2016RMUオープンリーグ",
    "titles": [
      {
        "year": "2016",
        "name": "2016RMUオープンリーグ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%A9%98%E5%93%B2%E4%B9%9F",
    "sourceTitle": "橘哲也"
  },
  "kyakunonaoki": {
    "title": "チャンピオンズリーグ",
    "titles": [
      {
        "year": "2024",
        "name": "第27期チャンピオンズリーグ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%AE%A2%E9%87%8E%E7%9B%B4",
    "sourceTitle": "客野直"
  },
  "kimu_tehyon": {
    "title": "雀王×2",
    "titles": [
      {
        "year": "2018",
        "name": "第17期雀王"
      },
      {
        "year": "2017",
        "name": "最強位2017"
      },
      {
        "year": "2017",
        "name": "第16期雀王"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%87%91%E5%A4%AA%E8%B3%A2",
    "sourceTitle": "金太賢"
  },
  "koji_furukawa": {
    "title": "鳳凰位3×3",
    "titles": [
      {
        "year": "2001",
        "name": "第18期鳳凰位3"
      },
      {
        "year": "2000",
        "name": "第17期鳳凰位3"
      },
      {
        "year": "1999",
        "name": "第16期鳳凰位3"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%8F%A4%E5%B7%9D%E5%AD%9D%E6%AC%A1",
    "sourceTitle": "古川孝次"
  },
  "igarashi_takeshi": {
    "title": "最高位",
    "titles": [
      {
        "year": "1997",
        "name": "第21期最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BA%94%E5%8D%81%E5%B5%90%E6%AF%85",
    "sourceTitle": "五十嵐毅"
  },
  "misaki_chiyu": {
    "title": "女流麻雀日本シリーズ",
    "titles": [
      {
        "year": "2026",
        "name": "女流麻雀日本シリーズ2026"
      },
      {
        "year": "2025",
        "name": "第23期プロクイーン"
      },
      {
        "year": "2003",
        "name": "第2期関西雀王"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%BE%A1%E5%B4%8E%E5%8D%83%E7%B5%90",
    "sourceTitle": "御崎千結"
  },
  "takamiya": {
    "title": "女流プロ麻雀日本シリーズ×2",
    "titles": [
      {
        "year": "2025",
        "name": "女流プロ麻雀日本シリーズ2025"
      },
      {
        "year": "2016",
        "name": "女流プロ麻雀日本シリーズ2016"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%AB%98%E5%AE%AE%E3%81%BE%E3%82%8A",
    "sourceTitle": "高宮まり"
  },
  "kurosawa": {
    "title": "プロクイーン×2",
    "titles": [
      {
        "year": "2009",
        "name": "第7期プロクイーン"
      },
      {
        "year": "2008",
        "name": "第6期プロクイーン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%BB%92%E6%B2%A2%E5%92%B2",
    "sourceTitle": "黒沢咲"
  },
  "shintaro_konno": {
    "title": "麻雀グランプリMAX",
    "titles": [
      {
        "year": "2025",
        "name": "第16期麻雀グランプリMAX"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%B4%BA%E9%87%8E%E7%9C%9F%E5%A4%AA%E9%83%8E",
    "sourceTitle": "紺野真太郎"
  },
  "sasaki": {
    "title": "鳳凰位×3",
    "titles": [
      {
        "year": "2025",
        "name": "麻雀オールスターBS10チャンピオンシップ2025"
      },
      {
        "year": "2024",
        "name": "第40期鳳凰位"
      },
      {
        "year": "2022",
        "name": "第38期鳳凰位"
      },
      {
        "year": "2021",
        "name": "第37期鳳凰位"
      },
      {
        "year": "2020",
        "name": "麻雀日本シリーズ2020"
      },
      {
        "year": "2018",
        "name": "麻雀日本シリーズ2018"
      },
      {
        "year": "2017",
        "name": "第7期麻雀グランプリMAX"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BD%90%E3%80%85%E6%9C%A8%E5%AF%BF%E4%BA%BA",
    "sourceTitle": "佐々木寿人"
  },
  "satsuki_mariko": {
    "title": "女流雀王×2",
    "titles": [
      {
        "year": "2020",
        "name": "第19期女流雀王"
      },
      {
        "year": "2018",
        "name": "NPM選抜総選挙2018優勝"
      },
      {
        "year": "2018",
        "name": "第26期麻雀マスターズ"
      },
      {
        "year": "2015",
        "name": "第14期女流雀王"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BD%90%E6%9C%88%E9%BA%BB%E7%90%86%E5%AD%90",
    "sourceTitle": "佐月麻理子"
  },
  "sakamoto_masashi": {
    "title": "四神降臨2020王座",
    "titles": [
      {
        "year": "2020",
        "name": "四神降臨2020王座"
      },
      {
        "year": "2020",
        "name": "四神降臨2020王座決定戦優勝"
      },
      {
        "year": "2020",
        "name": "第44期最高位"
      },
      {
        "year": "2018",
        "name": "麻雀駅伝2018優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%9D%82%E6%9C%AC%E5%A4%A7%E5%BF%97",
    "sourceTitle": "坂本大志"
  },
  "miura": {
    "title": "十段位×2",
    "titles": [
      {
        "year": "2025",
        "name": "麻雀日本シリーズ2025"
      },
      {
        "year": "2024",
        "name": "第41期十段位"
      },
      {
        "year": "2023",
        "name": "第40期十段位"
      },
      {
        "year": "2023",
        "name": "第48期王位"
      },
      {
        "year": "2020",
        "name": "麻雀最強戦2020次世代プロ集結麻雀代理戦争優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%B8%89%E6%B5%A6%E6%99%BA%E5%8D%9A",
    "sourceTitle": "三浦智博"
  },
  "yoshikazu_shibata": {
    "title": "十段位×2",
    "titles": [
      {
        "year": "2020",
        "name": "第37期十段位"
      },
      {
        "year": "2015",
        "name": "第32期十段位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%9F%B4%E7%94%B0%E5%90%89%E5%92%8C",
    "sourceTitle": "柴田吉和"
  },
  "shibukawa": {
    "title": "fuzzカップ",
    "titles": [
      {
        "year": "2024",
        "name": "第4回fuzzカップ2024"
      },
      {
        "year": "2023",
        "name": "Mトーナメント2023優勝"
      },
      {
        "year": "2021",
        "name": "第20期雀王"
      },
      {
        "year": "2017",
        "name": "第15回日本オープン2017"
      },
      {
        "year": "2012",
        "name": "第11期雀竜位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B8%8B%E5%B7%9D%E9%9B%A3%E6%B3%A2",
    "sourceTitle": "渋川難波"
  },
  "hatsunemai": {
    "title": "*麻雀BATTLEROYAL2006",
    "titles": [
      {
        "year": "2006",
        "name": "*麻雀BATTLEROYAL20062006"
      },
      {
        "year": "2002",
        "name": "*2002世界麻雀選手権大会個人部門2002"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%88%9D%E9%9F%B3%E8%88%9E",
    "sourceTitle": "初音舞"
  },
  "matsumoto": {
    "title": "PachumoCUP2025優勝",
    "titles": [
      {
        "year": "2025",
        "name": "PachumoCUP2025優勝"
      },
      {
        "year": "2025",
        "name": "麻雀最強戦2025美女と野獣優勝"
      },
      {
        "year": "2024",
        "name": "麻雀最強戦2024ザ・リベンジ優勝"
      },
      {
        "year": "2023",
        "name": "神域リーグ2023にて・チームヘラクレス(因幡はねる・空星きらめ・緑仙)として優勝"
      },
      {
        "year": "2022",
        "name": "Mリーグ2022-23優勝"
      },
      {
        "year": "2022",
        "name": "雀魂インビテーショナル2022優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%9D%BE%E6%9C%AC%E5%90%89%E5%BC%98",
    "sourceTitle": "松本吉弘"
  },
  "sanada_enju": {
    "title": "雀竜位",
    "titles": [
      {
        "year": "2023",
        "name": "第22期雀竜位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%9C%9F%E7%94%B0%E6%A7%90",
    "sourceTitle": "真田槐"
  },
  "mizumaki_wataru": {
    "title": "インターネット麻雀日本選手権2015優勝",
    "titles": [
      {
        "year": "2015",
        "name": "インターネット麻雀日本選手権2015優勝"
      },
      {
        "year": "2002",
        "name": "第10期麻雀マスターズ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B0%B4%E5%B7%BB%E6%B8%89",
    "sourceTitle": "水巻渉"
  },
  "mizusaki_tomomi": {
    "title": "女流雀王",
    "titles": [
      {
        "year": "2022",
        "name": "第21期女流雀王"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B0%B4%E5%B4%8E%E3%81%A8%E3%82%82%E3%81%BF",
    "sourceTitle": "水崎ともみ"
  },
  "mizuhara": {
    "title": "女流最高位",
    "titles": [
      {
        "year": "2024",
        "name": "第24期女流最高位"
      },
      {
        "year": "2021",
        "name": "Mリーグ2021-22MVP"
      },
      {
        "year": "2019",
        "name": "プリンセスリーグ2019優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%91%9E%E5%8E%9F%E6%98%8E%E5%A5%88",
    "sourceTitle": "瑞原明奈"
  },
  "setokuma": {
    "title": "十段位×3",
    "titles": [
      {
        "year": "2022",
        "name": "第16回モンド名人"
      },
      {
        "year": "2022",
        "name": "第33期最強位"
      },
      {
        "year": "2021",
        "name": "第32期最強位"
      },
      {
        "year": "2013",
        "name": "第30期十段位"
      },
      {
        "year": "2012",
        "name": "第29期十段位"
      },
      {
        "year": "2012",
        "name": "第29期鳳凰位"
      },
      {
        "year": "2011",
        "name": "第28期十段位"
      },
      {
        "year": "2010",
        "name": "第27期鳳凰位"
      },
      {
        "year": "2009",
        "name": "第26期鳳凰位"
      },
      {
        "year": "2006",
        "name": "第14期發王位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%80%AC%E6%88%B8%E7%86%8A%E7%9B%B4%E6%A8%B9",
    "sourceTitle": "瀬戸熊直樹"
  },
  "nishijima_chiharu": {
    "title": "女流最高位×4",
    "titles": [
      {
        "year": "2022",
        "name": "第22期女流最高位"
      },
      {
        "year": "2019",
        "name": "第19期女流最高位"
      },
      {
        "year": "2018",
        "name": "第18期女流最高位"
      },
      {
        "year": "2017",
        "name": "第17期女流最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E8%A5%BF%E5%B6%8B%E5%8D%83%E6%98%A5",
    "sourceTitle": "西嶋千春"
  },
  "ishii": {
    "title": "最高位",
    "titles": [
      {
        "year": "2025",
        "name": "第49期最高位"
      },
      {
        "year": "2016",
        "name": "第41期王位"
      },
      {
        "year": "2016",
        "name": "第41期王位戦"
      },
      {
        "year": "2013",
        "name": "第21期麻雀マスターズ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%9F%B3%E4%BA%95%E4%B8%80%E9%A6%AC",
    "sourceTitle": "石井一馬"
  },
  "asai": {
    "title": "雀王",
    "titles": [
      {
        "year": "2022",
        "name": "第21期雀王2022"
      },
      {
        "year": "2021",
        "name": "初代皓王位2021"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B5%85%E4%BA%95%E5%A0%82%E5%B2%90",
    "sourceTitle": "浅井堂岐"
  },
  "asami": {
    "title": "女流最高位",
    "titles": [
      {
        "year": "2025",
        "name": "第25期女流最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B5%85%E8%A6%8B%E7%9C%9F%E7%B4%80",
    "sourceTitle": "浅見真紀"
  },
  "naoya_maeda": {
    "title": "最強位",
    "titles": [
      {
        "year": "2015",
        "name": "最強位2015"
      },
      {
        "year": "2014",
        "name": "第31期鳳凰位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%89%8D%E7%94%B0%E7%9B%B4%E5%93%89",
    "sourceTitle": "前田直哉"
  },
  "aikawa_marie": {
    "title": "女流最高位",
    "titles": [
      {
        "year": "2023",
        "name": "第23期女流最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%9B%B8%E5%B7%9D%E3%81%BE%E3%82%8A%E3%81%88",
    "sourceTitle": "相川まりえ"
  },
  "taii": {
    "title": "令昭位×5",
    "titles": [
      {
        "year": "2022",
        "name": "Mリーグ2022-23シーズン渋谷ABEMAS優勝"
      },
      {
        "year": "2022",
        "name": "Mリーグ2022チーム優勝"
      },
      {
        "year": "2022",
        "name": "第3期飛翔位戦Presentedby2022"
      },
      {
        "year": "2021",
        "name": "Mリーグ20214着回避率1位"
      },
      {
        "year": "2021",
        "name": "麻雀日本シリーズ2015・2016・2021"
      },
      {
        "year": "2020",
        "name": "最強位2020"
      },
      {
        "year": "2020",
        "name": "第11期令昭位"
      },
      {
        "year": "2018",
        "name": "Mリーグ2018-19シーズンMVP"
      },
      {
        "year": "2018",
        "name": "Mリーグ2018個人スコア1位"
      },
      {
        "year": "2017",
        "name": "RMUアワード2017最優秀選手賞"
      },
      {
        "year": "2017",
        "name": "第8期令昭位"
      },
      {
        "year": "2016",
        "name": "2016度RMUスプリントカップアースカップ優勝"
      },
      {
        "year": "2016",
        "name": "RMUアワード2016最優秀選手賞"
      },
      {
        "year": "2016",
        "name": "RTDリーグ2016優勝"
      },
      {
        "year": "2016",
        "name": "麻雀日本シリーズ2015・2016・2021"
      },
      {
        "year": "2015",
        "name": "RMUアワード2015最優秀選手賞"
      },
      {
        "year": "2015",
        "name": "第6期令昭位"
      },
      {
        "year": "2015",
        "name": "麻雀日本シリーズ2015・2016・2021"
      },
      {
        "year": "2014",
        "name": "RMUアワード2014最優秀選手賞"
      },
      {
        "year": "2013",
        "name": "2013オープンリーグ優勝"
      },
      {
        "year": "2013",
        "name": "RMUアワード2013最優秀選手賞"
      },
      {
        "year": "2013",
        "name": "第5期RMUクラウン"
      },
      {
        "year": "2012",
        "name": "RMUアワード2012最優秀選手賞"
      },
      {
        "year": "2012",
        "name": "第3期令昭位"
      },
      {
        "year": "2011",
        "name": "2011オープンリーグ優勝"
      },
      {
        "year": "2011",
        "name": "RMUアワード2011最優秀選手賞"
      },
      {
        "year": "2011",
        "name": "第9回日本オープン"
      },
      {
        "year": "2010",
        "name": "RMUアワード2010最優秀選手賞"
      },
      {
        "year": "2010",
        "name": "第1期令昭位"
      },
      {
        "year": "2009",
        "name": "RMUアワード2009最優秀選手賞"
      },
      {
        "year": "2007",
        "name": "RMUアワード2007最優秀選手賞"
      },
      {
        "year": "2006",
        "name": "第31期王位"
      },
      {
        "year": "2003",
        "name": "第1回日本オープン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%A4%9A%E4%BA%95%E9%9A%86%E6%99%B4",
    "sourceTitle": "多井隆晴"
  },
  "ohira_aki": {
    "title": "四神降臨2015女流王座決定戦",
    "titles": [
      {
        "year": "2015",
        "name": "四神降臨2015女流王座決定戦"
      },
      {
        "year": "2014",
        "name": "第14期女流最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%A4%A7%E5%B9%B3%E4%BA%9C%E5%AD%A3",
    "sourceTitle": "大平亜季"
  },
  "daigo": {
    "title": "2025Mリーグ2024-25個人MVP×2",
    "titles": [
      {
        "year": "2025",
        "name": "2025Mリーグ2024-25個人MVP"
      },
      {
        "year": "2024",
        "name": "2025Mリーグ2024-25個人MVP"
      },
      {
        "year": "2021",
        "name": "第45期最高位"
      },
      {
        "year": "2020",
        "name": "2020第23回BIG1カップ優勝"
      },
      {
        "year": "2020",
        "name": "2020第45期最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%86%8D%E9%86%90%E5%A4%A7",
    "sourceTitle": "醍醐大"
  },
  "takizawa": {
    "title": "王位×2",
    "titles": [
      {
        "year": "2008",
        "name": "第33期王位"
      },
      {
        "year": "2007",
        "name": "第32期王位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%BB%9D%E6%B2%A2%E5%92%8C%E5%85%B8",
    "sourceTitle": "滝沢和典"
  },
  "makoto_sawazaki": {
    "title": "麻雀マスターズ×2",
    "titles": [
      {
        "year": "2019",
        "name": "第27期麻雀マスターズ"
      },
      {
        "year": "2019",
        "name": "麻雀日本シリーズ2019"
      },
      {
        "year": "2017",
        "name": "麻雀日本シリーズ2017"
      },
      {
        "year": "2013",
        "name": "最強位2013"
      },
      {
        "year": "2008",
        "name": "第16期麻雀マスターズ"
      },
      {
        "year": "2007",
        "name": "グランプリ2007"
      },
      {
        "year": "1996",
        "name": "第13期十段位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B2%A2%E5%B4%8E%E8%AA%A0",
    "sourceTitle": "沢崎誠"
  },
  "kajita_ryoichi": {
    "title": "雀竜位×2",
    "titles": [
      {
        "year": "2012",
        "name": "2002年世界麻雀選手権団体2012"
      },
      {
        "year": "2006",
        "name": "第5期雀王"
      },
      {
        "year": "2003",
        "name": "第2期雀竜位"
      },
      {
        "year": "2002",
        "name": "第1期雀竜位"
      },
      {
        "year": "1979",
        "name": "第4期雀王位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%8D%9B%E5%86%B6%E7%94%B0%E8%89%AF%E4%B8%80",
    "sourceTitle": "鍛冶田良一"
  },
  "takeuchi": {
    "title": "最高位×2",
    "titles": [
      {
        "year": "2024",
        "name": "第48期最高位"
      },
      {
        "year": "2023",
        "name": "第47期最高位"
      },
      {
        "year": "2022",
        "name": "2022第24回BIG1カップ優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%AB%B9%E5%86%85%E5%85%83%E5%A4%AA",
    "sourceTitle": "竹内元太"
  },
  "shingo_nakamura": {
    "title": "チャンピオンズリーグ",
    "titles": [
      {
        "year": "2020",
        "name": "第23期チャンピオンズリーグ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%B8%AD%E6%9D%91%E6%85%8E%E5%90%BE",
    "sourceTitle": "中村慎吾"
  },
  "nakagawashiu": {
    "title": "2022後期クライマックスリーグ",
    "titles": [
      {
        "year": "2022",
        "name": "2022後期クライマックスリーグ"
      },
      {
        "year": "2015",
        "name": "2015スプリントファイナル"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BB%B2%E5%B7%9D%E7%BF%94",
    "sourceTitle": "仲川翔"
  },
  "kana_nakata": {
    "title": "女流プロ麻雀日本シリーズ×2",
    "titles": [
      {
        "year": "2023",
        "name": "女流プロ麻雀日本シリーズ2023"
      },
      {
        "year": "2020",
        "name": "女流プロ麻雀日本シリーズ2020"
      },
      {
        "year": "2020",
        "name": "麻雀BATTLEROYALチーム・チャンピオンシップ2020チーム優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BB%B2%E7%94%B0%E5%8A%A0%E5%8D%97",
    "sourceTitle": "仲田加南"
  },
  "nakabayashi": {
    "title": "雀王×2",
    "titles": [
      {
        "year": "2024",
        "name": "第23期雀王"
      },
      {
        "year": "2024",
        "name": "第23期雀王戦"
      },
      {
        "year": "2023",
        "name": "第22期雀王"
      },
      {
        "year": "2023",
        "name": "第22期雀王戦"
      },
      {
        "year": "2022",
        "name": "第30期發王位"
      },
      {
        "year": "2021",
        "name": "第29期發王位"
      },
      {
        "year": "2011",
        "name": "第10期雀竜位"
      },
      {
        "year": "2011",
        "name": "第10期雀竜位戦"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BB%B2%E6%9E%97%E5%9C%AD",
    "sourceTitle": "仲林圭"
  },
  "watanabefumiya": {
    "title": "王位",
    "titles": [
      {
        "year": "2021",
        "name": "第46期王位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B8%A1%E8%BE%BA%E5%8F%B2%E5%93%89",
    "sourceTitle": "渡辺史哉"
  },
  "koshiro_watanabe": {
    "title": "2024開幕式特別記念大会優勝",
    "titles": [
      {
        "year": "2024",
        "name": "2024開幕式特別記念大会優勝"
      },
      {
        "year": "2020",
        "name": "TheLegendofDragonYouth2020優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B8%A1%E9%82%89%E6%B5%A9%E5%8F%B2%E9%83%8E",
    "sourceTitle": "渡邉浩史郎"
  },
  "satoshi_fujisaki": {
    "title": "十段位×3",
    "titles": [
      {
        "year": "2019",
        "name": "第36期鳳凰位"
      },
      {
        "year": "2017",
        "name": "第34期十段位"
      },
      {
        "year": "2016",
        "name": "第33期十段位"
      },
      {
        "year": "2013",
        "name": "第30期鳳凰位"
      },
      {
        "year": "2008",
        "name": "第6回日本オープン"
      },
      {
        "year": "2007",
        "name": "第5回日本オープン"
      },
      {
        "year": "2005",
        "name": "グランプリ2005"
      },
      {
        "year": "2005",
        "name": "第3回日本オープン"
      },
      {
        "year": "1999",
        "name": "第16期十段位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E8%97%A4%E5%B4%8E%E6%99%BA",
    "sourceTitle": "藤崎智"
  },
  "narakeijun": {
    "title": "麻雀マスターズ×2",
    "titles": [
      {
        "year": "2022",
        "name": "第30期麻雀マスターズ"
      },
      {
        "year": "2012",
        "name": "第20期麻雀マスターズ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%A5%88%E8%89%AF%E5%9C%AD%E7%B4%94",
    "sourceTitle": "奈良圭純"
  },
  "uchikawa": {
    "title": "十段位",
    "titles": [
      {
        "year": "2018",
        "name": "第35期十段位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%86%85%E5%B7%9D%E5%B9%B8%E5%A4%AA%E9%83%8E",
    "sourceTitle": "内川幸太郎"
  },
  "naraharakazuto": {
    "title": "四神降臨2023王座決定戦",
    "titles": [
      {
        "year": "2023",
        "name": "四神降臨2023王座決定戦"
      },
      {
        "year": "2023",
        "name": "第14期令昭位"
      },
      {
        "year": "1986",
        "name": "第10期アマ最高位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%A5%A2%E5%8E%9F%E5%92%8C%E4%BA%BA",
    "sourceTitle": "楢原和人"
  },
  "nikaido-a": {
    "title": "プロクイーン",
    "titles": [
      {
        "year": "2005",
        "name": "第3期プロクイーン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E4%BA%8C%E9%9A%8E%E5%A0%82%E4%BA%9C%E6%A8%B9",
    "sourceTitle": "二階堂亜樹"
  },
  "hinata": {
    "title": "プロクイーン×2",
    "titles": [
      {
        "year": "2019",
        "name": "第17期プロクイーン"
      },
      {
        "year": "2018",
        "name": "第16期プロクイーン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%97%A5%E5%90%91%E8%97%8D%E5%AD%90",
    "sourceTitle": "日向藍子"
  },
  "shiratori": {
    "title": "鳳凰位×2",
    "titles": [
      {
        "year": "2025",
        "name": "第42期鳳凰位"
      },
      {
        "year": "2024",
        "name": "第41期鳳凰位"
      },
      {
        "year": "2022",
        "name": "Mリーグ2022-23優勝"
      },
      {
        "year": "2020",
        "name": "第28期發王位"
      },
      {
        "year": "2017",
        "name": "第25期麻雀マスターズ"
      },
      {
        "year": "2016",
        "name": "第24期麻雀マスターズ"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%99%BD%E9%B3%A5%E7%BF%94",
    "sourceTitle": "白鳥翔"
  },
  "shirotamio": {
    "title": "2019ティアラクライマックスリーグ優勝",
    "titles": [
      {
        "year": "2019",
        "name": "2019ティアラクライマックスリーグ優勝"
      },
      {
        "year": "2015",
        "name": "2015ティアラクライマックスリーグ優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%99%BD%E7%94%B0%E3%81%BF%E3%81%8A",
    "sourceTitle": "白田みお"
  },
  "iida_masaki": {
    "title": "日本オープン×2",
    "titles": [
      {
        "year": "2022",
        "name": "第20回日本オープン"
      },
      {
        "year": "2021",
        "name": "第19回日本オープン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%A3%AF%E7%94%B0%E9%9B%85%E8%B2%B4",
    "sourceTitle": "飯田雅貴"
  },
  "hamanotaiyou": {
    "title": "十段位",
    "titles": [
      {
        "year": "2025",
        "name": "第42期十段位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%B5%9C%E9%87%8E%E5%A4%AA%E9%99%BD",
    "sourceTitle": "浜野太陽"
  },
  "yuichi_fukushima": {
    "title": "王位",
    "titles": [
      {
        "year": "2024",
        "name": "第49期王位"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B3%B6%E4%BD%91%E4%B8%80",
    "sourceTitle": "福島佑一"
  },
  "hiraga_toshihiko": {
    "title": "RTDリーグ2017優勝",
    "titles": [
      {
        "year": "2017",
        "name": "RTDリーグ2017優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%B9%B3%E8%B3%80%E8%81%A1%E5%BD%A6",
    "sourceTitle": "平賀聡彦"
  },
  "makino_nobuhiko": {
    "title": "最高位",
    "titles": [
      {
        "year": "2026",
        "name": "第50期最高位"
      },
      {
        "year": "2017",
        "name": "関西チャンピオンロード2017女流スプリントシリーズ優勝"
      },
      {
        "year": "2017",
        "name": "関西チャンピオンロード2017新人王シリーズ優勝"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%89%A7%E9%87%8E%E4%BC%B8%E5%BD%A6",
    "sourceTitle": "牧野伸彦"
  },
  "hori": {
    "title": "Mトーナメント2025優勝",
    "titles": [
      {
        "year": "2025",
        "name": "Mトーナメント2025優勝"
      },
      {
        "year": "2024",
        "name": "[https://www.youtube.com/watch?v=pmX3Wkfbb50麻雀遊戯王CUP2024]優勝"
      },
      {
        "year": "2021",
        "name": "Mリーグ2021-22シーズンKADOKAWAサクラナイツ優勝"
      },
      {
        "year": "2019",
        "name": "第18期雀王"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E5%A0%80%E6%85%8E%E5%90%BE",
    "sourceTitle": "堀慎吾"
  },
  "honda": {
    "title": "第10,11期麻雀グランプリMAX×2",
    "titles": [
      {
        "year": "2024",
        "name": "第32期麻雀マスターズ2024"
      },
      {
        "year": "2020",
        "name": "第10,11期麻雀グランプリMAX2020"
      },
      {
        "year": "2020",
        "name": "第11期麻雀グランプリMAX"
      },
      {
        "year": "2019",
        "name": "第10,11期麻雀グランプリMAX2019"
      },
      {
        "year": "2019",
        "name": "第10期麻雀グランプリMAX"
      },
      {
        "year": "2019",
        "name": "第20期北陸プロアマリーグ2019"
      },
      {
        "year": "2019",
        "name": "第3期北陸プロリーグ2019"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%9C%AC%E7%94%B0%E6%9C%8B%E5%BA%83",
    "sourceTitle": "本田朋広"
  },
  "kihara_koichi": {
    "title": "四神降臨2016王座決定戦",
    "titles": [
      {
        "year": "2016",
        "name": "四神降臨2016王座決定戦"
      },
      {
        "year": "2015",
        "name": "第14期雀王"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E6%9C%A8%E5%8E%9F%E6%B5%A9%E4%B8%80",
    "sourceTitle": "木原浩一"
  },
  "yajimatoru": {
    "title": "雀王",
    "titles": [
      {
        "year": "2020",
        "name": "第19期雀王"
      },
      {
        "year": "2018",
        "name": "第17期雀竜位"
      },
      {
        "year": "2015",
        "name": "第13回日本オープン"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E7%9F%A2%E5%B3%B6%E4%BA%A8",
    "sourceTitle": "矢島亨"
  },
  "suzuki-t": {
    "title": "雀王戦×4",
    "titles": [
      {
        "year": "2014",
        "name": "第13期雀王戦"
      },
      {
        "year": "2013",
        "name": "第12期雀王戦"
      },
      {
        "year": "2012",
        "name": "第11期雀王戦"
      },
      {
        "year": "2010",
        "name": "第9期雀王戦"
      }
    ],
    "source": "https://ja.wikipedia.org/wiki/%E9%88%B4%E6%9C%A8%E3%81%9F%E3%82%8D%E3%81%86",
    "sourceTitle": "鈴木たろう"
  }
} as const satisfies Record<string, WikiTitleOverride>;
