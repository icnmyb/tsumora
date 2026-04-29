import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — TSUMORA",
  description:
    "TSUMORA は日本のプロ麻雀界を横断する編集ポータル。JPML 39期・鷹見としや が運営。",
  openGraph: {
    title: "About — TSUMORA",
    description:
      "JPML 39期・鷹見としや が運営する、プロ麻雀の編集ポータル。",
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
