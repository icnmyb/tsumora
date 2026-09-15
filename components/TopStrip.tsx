import { getPlayer } from "@/app/players/data";
import { REGULAR_2026_27 } from "@/app/mleague/season-data";
import { getTeamBySlug } from "@/app/teams/data";

export function TopStrip() {
  const leader = REGULAR_2026_27.standings[0];
  const leaderName = getTeamBySlug(leader.teamSlug)?.shortName;
  const openingWinners = REGULAR_2026_27.openingResults
    .map((result) => {
      const player = getPlayer(result.winnerId);
      return player ? `${player.name} +${result.points.toFixed(1)}pt` : undefined;
    })
    .filter((item): item is string => Boolean(item))
    .join(" / ");
  const renderInfoItems = () => (
    <>
      <span className="live-tag">INFO</span>
      <span className="item">
        <b>Mリーグ</b> {REGULAR_2026_27.season} レギュラーシーズン · 9.14開幕
      </span>
      <span className="sep">／</span>
      <span className="item">
        <b>暫定首位</b> {leaderName} +{leader.points.toFixed(1)}pt
      </span>
      <span className="sep">／</span>
      <span className="item">
        <b>開幕日トップ</b> {openingWinners}
      </span>
      <span className="sep">／</span>
      <span className="item">
        <b>TSUMORA</b> データは確認済み情報から順次更新
      </span>
    </>
  );

  return (
    <div className="strip">
      <div className="wrap row">
        <div className="strip-marquee">
          <div className="strip-marquee-group">{renderInfoItems()}</div>
          <div className="strip-marquee-group" aria-hidden="true">{renderInfoItems()}</div>
        </div>
      </div>
    </div>
  );
}
