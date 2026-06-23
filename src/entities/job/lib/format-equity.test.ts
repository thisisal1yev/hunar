import { describe, it, expect } from "vitest";
import { stageLabel } from "./labels";
import { formatEquity } from "./format-salary";
import type { Job } from "../model/types";

const base: Job = {
  id: "t",
  slug: "t",
  title: "Engineer",
  company: { name: "Acme", verified: true },
  grade: "middle",
  workFormat: "remote",
  city: "Toshkent",
  skills: [],
  salary: { min: 12_000_000, max: 20_000_000, currency: "UZS" },
  postedDaysAgo: 1,
};

describe("stage + equity", () => {
  it("labels seed stage", () => {
    expect(stageLabel["seed"]).toBe("Seed");
  });

  it("formats an equity range", () => {
    expect(formatEquity({ ...base, equity: { min: 0.5, max: 2 } })).toBe("0.5-2%");
  });

  it("returns undefined when no equity", () => {
    expect(formatEquity(base)).toBeUndefined();
  });
});
