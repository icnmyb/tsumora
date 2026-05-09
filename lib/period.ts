// lib/period.ts
// 各団体の入会期 → 入会年 マッピング。
//
// 出典・前提:
// - 最高位戦: 1976年に第1期発足、原則1期/年（前期/後期に分かれる年は前期=年初を採用）。
//   出典: https://saikouisen.com/title-match/saikoui/
// - JPML / NPM / RMU / μ: 入会期と年が1:1対応しないケースがあるため、
//   既知のデータ点から実年を確定する方式を採る。
//
// 計算原則:
//   periodToYear(org, period) は「期」から「入会年」を返す。
//   未マッピング時は undefined。
//   joinYear が直接ある場合は joinYear を優先。

// players 側 (OrgCode: 日本語表記) と titles 側 (OrgCode: 英語) の両方を受け付ける
export type SupportedOrg = "JPML" | "NPM" | "SAIKOUISEN" | "RMU" | "MU" | "最高位戦" | "μ";

function normalizeOrg(org: SupportedOrg): "JPML" | "NPM" | "SAIKOUISEN" | "RMU" | "MU" {
  if (org === "最高位戦") return "SAIKOUISEN";
  if (org === "μ") return "MU";
  return org;
}

const SAIKOUISEN_FIRST_PERIOD_YEAR = 1976; // 第1期 = 1976年

/** "第14期" / "第14期生" / "第47期前期" 等から数値だけ抽出 */
export function parsePeriodNumber(period: string | undefined | null): number | undefined {
  if (!period) return undefined;
  const m = period.match(/(\d+)\s*期/);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * 期 → 入会年 のマッピング。
 * 1期/年で素直に対応する団体は計算式で、ずれがある団体は明示マップで返す。
 */
export function periodToYear(org: SupportedOrg, period: string | undefined): number | undefined {
  const n = parsePeriodNumber(period);
  if (n === undefined) return undefined;

  const normalized = normalizeOrg(org);
  switch (normalized) {
    case "SAIKOUISEN":
      return SAIKOUISEN_FIRST_PERIOD_YEAR + (n - 1);
    case "JPML":
    case "NPM":
    case "RMU":
    case "MU":
      // 1:1 対応していない（または未確定）。
      // 既知データから明示マップを作るまでは undefined を返し、
      // 呼び出し側で joinYear のフォールバックを使う。
      return undefined;
  }
}

/**
 * 入会期 or 入会年 から「現在までの在籍年数」を計算。
 * - period が解析でき、org のマッピングが効くなら period を優先。
 * - 効かない場合は joinYear を使う。
 * - どちらも無い場合は null。
 */
export function calcYearsSinceJoin(
  org: SupportedOrg | undefined,
  period: string | undefined,
  joinYear: number | undefined,
  asOfYear: number = new Date().getFullYear(),
): number | null {
  if (org) {
    const yearFromPeriod = periodToYear(org, period);
    if (yearFromPeriod !== undefined) {
      return Math.max(0, asOfYear - yearFromPeriod);
    }
  }
  if (joinYear) {
    return Math.max(0, asOfYear - joinYear);
  }
  return null;
}
