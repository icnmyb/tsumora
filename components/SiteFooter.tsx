import Link from "next/link";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";

const LAUNCH_DATE = new Date("2025-09-01T00:00:00+09:00");

function getVolNumber(now: Date): number {
  const diffDays = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor(diffDays / 7) + 1);
}

function getJSTYmd(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function SiteFooter() {
  const now = new Date();
  const vol = getVolNumber(now);
  const issueDate = getJSTYmd(now);
  const year = issueDate.slice(0, 4);
  return (
    <footer className="main">
      <div className="wrap">
        <div>
          <div className="big-mark">
            TSUMORA<span className="dot">.com</span>
          </div>
          <div
            style={{
              fontFamily: "'Instrument Serif'",
              fontStyle: "italic",
              fontSize: 18,
              color: "rgba(235,228,210,.6)",
            }}
          >
            The Pro Mahjong Review
          </div>
          <div className="desc">
            5つのプロ団体とMリーグの対局・成績・選手情報を横断する総合データベース。対局スケジュールから歴代タイトルまで、プロ麻雀のすべてを一つの画面で。
          </div>
        </div>
        <div>
          <h4>
            プロ団体<span className="en">Organizations</span>
          </h4>
          <ul>
            <li><Link href="/organizations/jpml">日本プロ麻雀連盟</Link></li>
            <li><Link href="/organizations/npm">日本プロ麻雀協会</Link></li>
            <li><Link href="/organizations/saikouisen">最高位戦日本プロ麻雀協会</Link></li>
            <li><Link href="/organizations/rmu">RMU</Link></li>
            <li><Link href="/organizations/mu">麻将連合-μ-</Link></li>
          </ul>
        </div>
        <div>
          <h4>
            コンテンツ<span className="en">Contents</span>
          </h4>
          <ul>
            <li><Link href="/schedule">対局スケジュール</Link></li>
            <li><Link href="/titles">タイトル戦図鑑</Link></li>
            <li><Link href="/players">プロ選手データベース</Link></li>
            <li><Link href="/rankings">ランキング</Link></li>
            <li><Link href="/rules">競技ルール</Link></li>
            <li><Link href="/mleague">Mリーグ</Link></li>
          </ul>
        </div>
        <div>
          <h4>
            サイト情報<span className="en">About</span>
          </h4>
          <ul>
            <li><Link href="/about">このサイトについて</Link></li>
            <li>
              <TrackedExternalLink
                href="https://x.com/tt_23_mm"
                eventName="External Link Click"
                eventProps={{ area: "footer_contact", destination: "X", url: "https://x.com/tt_23_mm" }}
              >
                お問い合わせ（X DM）
              </TrackedExternalLink>
            </li>
            <li>
              <TrackedExternalLink
                href="https://x.com/tt_23_mm"
                eventName="External Link Click"
                eventProps={{ area: "footer_sponsor", destination: "X", url: "https://x.com/tt_23_mm" }}
              >
                Founding Sponsor
              </TrackedExternalLink>
            </li>
          </ul>
        </div>
        <div className="cr">
          <span>© {year} TSUMORA · データは各公式サイトより集約 · 1日1回更新</span>
          <span>VOL.{vol} · ISSUE {issueDate}</span>
        </div>
      </div>
    </footer>
  );
}
