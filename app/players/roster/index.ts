// app/players/roster/index.ts
// 各団体の RosterPlayer 配列を結合してエクスポート。
// 個別ファイル (jpml.ts / saikouisen.ts / npm.ts / rmu.ts / mu.ts) はスクレイパーが自動生成する。

import type { RosterPlayer } from "../data";
import { JPML_ROSTER } from "./jpml";
import { SAIKOUISEN_ROSTER } from "./saikouisen";
import { NPM_ROSTER } from "./npm";
import { RMU_ROSTER } from "./rmu";
import { MU_ROSTER } from "./mu";

export const ROSTER_PLAYERS: RosterPlayer[] = [
  ...JPML_ROSTER,
  ...SAIKOUISEN_ROSTER,
  ...NPM_ROSTER,
  ...RMU_ROSTER,
  ...MU_ROSTER,
];
