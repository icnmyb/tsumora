import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";

export const metadata: Metadata = {
  title: "About — TSUMORA",
  description:
    "TSUMORA は日本のプロ麻雀界を横断する編集ポータル。",
  openGraph: {
    title: "About — TSUMORA",
    description:
      "TSUMORA — プロ麻雀の編集ポータル。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="wrap about-page">
      <section className="about-hero">
        <h1 className="about-title">About</h1>
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
            <TrackedExternalLink
              href="https://x.com/tt_23_mm"
              eventName="External Link Click"
              eventProps={{ area: "about_editor_x", destination: "X", url: "https://x.com/tt_23_mm" }}
            >
              @tt_23_mm
            </TrackedExternalLink>
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
          <TrackedExternalLink
            href="https://x.com/tt_23_mm"
            eventName="External Link Click"
            eventProps={{ area: "about_contact_x", destination: "X", url: "https://x.com/tt_23_mm" }}
          >
            @tt_23_mm
          </TrackedExternalLink>
        </p>
      </section>

      <p className="about-back">
        → <Link href="/">トップページへ戻る</Link>
      </p>
    </div>
  );
}
