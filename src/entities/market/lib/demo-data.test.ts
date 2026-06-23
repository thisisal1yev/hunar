import { describe, it, expect } from "vitest";
import { MARKET_DEMO, USD_RATE } from "./demo-data";

describe("market demo data invariants", () => {
  const mid = (lo: number, hi: number) => (lo + hi) / 2;

  it("cash midpoint rises with stage", () => {
    const mids = MARKET_DEMO.byStage.map((s) => mid(s.cashMinUZS, s.cashMaxUZS));
    mids.forEach((m, i) => {
      if (i > 0) expect(m).toBeGreaterThan(mids[i - 1]!);
    });
  });

  it("equity max shrinks with stage", () => {
    const eq = MARKET_DEMO.byStage.map((s) => s.equityMax);
    eq.forEach((e, i) => {
      if (i > 0) expect(e).toBeLessThan(eq[i - 1]!);
    });
  });

  it("USD is derived from USD_RATE", () => {
    for (const s of MARKET_DEMO.byStage) {
      expect(s.cashMinUSD).toBe(Math.round(s.cashMinUZS / USD_RATE));
      expect(s.cashMaxUSD).toBe(Math.round(s.cashMaxUZS / USD_RATE));
    }
  });

  it("sector shares sum to ~1", () => {
    const sum = MARKET_DEMO.sectors.reduce((a, s) => a + s.share, 0);
    expect(Math.abs(sum - 1)).toBeLessThan(0.001);
  });
});
