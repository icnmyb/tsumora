import { FINAL_2025_26 } from "@/app/mleague/sf-data";
import { getTeamBySlug } from "@/app/teams/data";

export function TopStrip() {
  const nextFinal = FINAL_2025_26.upcoming[0];
  const finalTeams = nextFinal?.teamSlugs
    .map((slug) => getTeamBySlug(slug)?.shortName)
    .filter((name): name is string => Boolean(name))
    .join(" / ");

  return (
    <div className="strip">
      <div className="wrap row">
        <span className="live-tag">INFO</span>
        <span className="item">
          <b>Mリーグ</b> 2025-26 ファイナル · {FINAL_2025_26.startDate.replaceAll("-", ".")} 開幕
        </span>
        <span className="sep">／</span>
        <span className="item">
          <b>出場</b> {finalTeams}
        </span>
        <span className="sep">／</span>
        <span className="item">
          全<b>{FINAL_2025_26.totalGames}</b>試合 · 最終日 {FINAL_2025_26.endDate.replaceAll("-", ".")}
        </span>
        <span className="sep">／</span>
        <span className="item">
          <b>TSUMORA</b> データは確認済み情報から順次更新
        </span>
      </div>
    </div>
  );
}
