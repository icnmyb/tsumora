import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — TSUMORA",
  description:
    "TSUMORA は日本のプロ麻雀界を横断する編集ポータル。JPML 39期・鷹見としや が運営する編集メディアです。",
  openGraph: {
    title: "About — TSUMORA",
    description:
      "JPML 39期・鷹見としや が編集する、プロ麻雀の編集ポータル。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <section className="news-index-hd">
        <div className="news-index-kicker">
          <span>●</span> ABOUT
        </div>
        <h1 className="news-index-title">
          TSUMORA<span className="comma">、</span>
          <span className="em">という編集メディア。</span>
        </h1>
        <p className="news-index-en">
          The Pro Mahjong Review — Edited by a JPML pro.
        </p>
      </section>

      <article
        style={{
          maxWidth: "720px",
          margin: "var(--space-section, 6rem) auto",
          lineHeight: 1.9,
          color: "var(--ink)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>ミッション</h2>
        <p>
          TSUMORA は、日本のプロ麻雀界を横断する編集ポータル。
          JPML、最高位戦、NPM、RMU、μ ── 5つのプロ団体と Mリーグを、1つのサイトで扱う。
        </p>
        <p>
          各団体公式や Mリーグ公式は、それぞれ独立した情報源。
          横断して比較し、編集された視点で読める場所が、これまでなかった。
        </p>
        <p>
          選手の経歴を辿る。タイトル戦の歴代を見る。リーグの順位を比べる。
          TSUMORA は、そのための「編集された資料室」。
        </p>
        <p>
          そして、表のニュースには出ない、麻雀界の深いところを毎日編む。
          裏ドラのように、見えなかった魅力が、ここで乗る。
        </p>

        <h2>名前について</h2>
        <p>TSUMORA / ツモーラ ──</p>
        <ul>
          <li>「ツモ」── 自分で引きに行く</li>
          <li>「ツモ裏」── リーチ自摸の瞬間に、裏ドラが乗る</li>
          <li>「網羅（モーラ）」── 5団体を、すべて</li>
          <li>「和了（ホーラ）」── 情報が、ここで揃う</li>
        </ul>
        <p>ツモり、網羅し、表に出ない深さに辿り着く。それがこの名前。</p>

        <h2>編集者</h2>
        <p>
          鷹見としや（
          <a
            href="https://x.com/tt_23_mm"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tt_23_mm
          </a>
          ）
          <br />
          日本プロ麻雀連盟（JPML）39期、C2リーグ所属プロ。
        </p>
        <p>
          「プロが書く / プロが選ぶ / プロが構成する」── そのことが情報源としての価値だと考えている。
        </p>

        <h2>編集方針</h2>
        <ol>
          <li>
            <strong>確認できないデータは載せない。</strong>
            <br />
            情報源不明のまま「歴代記録」を埋めない。空欄は空欄として示す。
          </li>
          <li>
            <strong>写真ではなくタイポグラフィで構成する。</strong>
            <br />
            選手アバターは名前頭文字 + チーム色背景。権利と編集自由度のため、実写写真は使わない。
          </li>
          <li>
            <strong>5団体を横並びで扱う。</strong>
            <br />
            どこかの団体に偏った情報密度を作らない。
          </li>
          <li>
            <strong>ニュースは編集部選。</strong>
            <br />
            自動収集ではなく、選んだものを置く。
          </li>
        </ol>

        <h2>ロードマップ</h2>
        <ul>
          <li>Mリーグ予想ゲーム ── 2026-27 シーズン開幕（2026年9月）に合わせて公開</li>
          <li>自然言語検索 ──「30代女流Mリーガー」のような検索</li>
          <li>ニュース体制の強化</li>
        </ul>
        <p>機能追加は、編集調を崩さない範囲で。</p>

        <h2>お問い合わせ</h2>
        <p>
          スポンサー、データ修正、取材依頼などすべて X DM にて。
          <br />→{" "}
          <a
            href="https://x.com/tt_23_mm"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tt_23_mm
          </a>
        </p>

        <p style={{ marginTop: "3em" }}>
          → <Link href="/">トップページへ戻る</Link>
        </p>
      </article>
    </div>
  );
}
