import Link from "next/link";
import Image from "next/image";
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
    <div className="wrap about-page">
      <section className="about-hero">
        <div className="about-kicker">
          <span>●</span> ABOUT
        </div>
        <h1 className="about-title">
          TSUMORA<span className="comma">、</span>
          <span className="em">という編集メディア。</span>
        </h1>
        <p className="about-en">
          The Pro Mahjong Review — Edited by a JPML pro.
        </p>
      </section>

      <section className="about-mission">
        <h2 className="about-h2">ミッション</h2>
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
      </section>

      <section className="about-editor">
        <div className="about-editor-photo">
          <Image
            src="/about/takami.jpg"
            alt="編集・運営：鷹見としや（JPML 39期 C2）"
            width={400}
            height={500}
            priority
          />
        </div>
        <div className="about-editor-text">
          <div className="about-editor-kicker">EDITOR</div>
          <h2 className="about-editor-name">
            鷹見としや
            <span className="en">TAKAMI Toshiya</span>
          </h2>
          <p className="about-editor-meta">
            日本プロ麻雀連盟（JPML）<br />
            <strong>第39期 · C2リーグ</strong>所属プロ
          </p>
          <p className="about-editor-bio">
            「プロが書く / プロが選ぶ / プロが構成する」── そのことが情報源としての価値だと考えている。
          </p>
          <p className="about-editor-x">
            X →{" "}
            <a
              href="https://x.com/tt_23_mm"
              target="_blank"
              rel="noopener noreferrer"
            >
              @tt_23_mm
            </a>
          </p>
        </div>
      </section>

      <section className="about-name">
        <h2 className="about-h2">名前について</h2>
        <p className="about-name-lead">TSUMORA / ツモーラ ──</p>
        <ul className="about-name-list">
          <li>
            <span className="kw">ツモ</span>
            自分で引きに行く
          </li>
          <li>
            <span className="kw">ツモ裏</span>
            リーチ自摸の瞬間に、裏ドラが乗る
          </li>
          <li>
            <span className="kw">網羅（モーラ）</span>
            5団体を、すべて
          </li>
          <li>
            <span className="kw">和了（ホーラ）</span>
            情報が、ここで揃う
          </li>
        </ul>
      </section>

      <section className="about-policy">
        <h2 className="about-h2">編集方針</h2>
        <ol className="about-policy-list">
          <li>
            <h3>確認できないデータは載せない。</h3>
            <p>情報源不明のまま「歴代記録」を埋めない。空欄は空欄として示す。</p>
          </li>
          <li>
            <h3>写真ではなくタイポグラフィで構成する。</h3>
            <p>選手アバターは名前頭文字 + チーム色背景。権利と編集自由度のため、選手の実写写真は使わない（編集者本人を除く）。</p>
          </li>
          <li>
            <h3>5団体を横並びで扱う。</h3>
            <p>どこかの団体に偏った情報密度を作らない。</p>
          </li>
          <li>
            <h3>ニュースは編集部選。</h3>
            <p>自動収集ではなく、選んだものを置く。</p>
          </li>
        </ol>
      </section>

      <section className="about-roadmap">
        <h2 className="about-h2">今後の予定</h2>
        <ul className="about-roadmap-list">
          <li>Mリーグ予想ゲーム ── 2026-27 シーズン開幕（2026年9月）に合わせて公開</li>
          <li>自然言語検索 ──「30代女流Mリーガー」のような検索</li>
          <li>ニュース体制の強化</li>
        </ul>
      </section>

      <section className="about-contact">
        <h2 className="about-h2">お問い合わせ</h2>
        <p>
          スポンサー、データ修正、取材依頼などすべて X DM にて。
        </p>
        <p className="about-contact-handle">
          →{" "}
          <a
            href="https://x.com/tt_23_mm"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tt_23_mm
          </a>
        </p>
      </section>

      <p className="about-back">
        → <Link href="/">トップページへ戻る</Link>
      </p>
    </div>
  );
}
