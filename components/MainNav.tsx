"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { idx: "01", label: "ホーム", href: "/", match: (p: string) => p === "/" },
  { idx: "02", label: "ニュース", href: "/news", match: (p: string) => p.startsWith("/news") },
  { idx: "03", label: "対局", href: "/schedule", match: (p: string) => p.startsWith("/schedule") },
  { idx: "04", label: "Mリーグ", href: "/mleague", match: (p: string) => p.startsWith("/mleague") },
  { idx: "05", label: "Mチーム", href: "/teams", match: (p: string) => p.startsWith("/teams") },
  { idx: "06", label: "選手", href: "/players", match: (p: string) => p.startsWith("/players") },
  { idx: "07", label: "タイトル戦", href: "/titles", match: (p: string) => p.startsWith("/titles") },
  { idx: "08", label: "ランキング", href: "/rankings", match: (p: string) => p.startsWith("/rankings") },
  { idx: "09", label: "団体", href: "/organizations", match: (p: string) => p.startsWith("/organizations") },
  { idx: "10", label: "ルール", href: "/rules", match: (p: string) => p.startsWith("/rules") },
  { idx: "11", label: "予想", href: "/predict", match: (p: string) => p.startsWith("/predict") },
];

export function MainNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav className="main">
      <div className="wrap" style={{ display: "flex", alignItems: "stretch", padding: 0 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.match(pathname);
          return (
            <Link key={item.idx} href={item.href} className={isActive ? "active" : undefined}>
              <span className="idx">{item.idx}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
