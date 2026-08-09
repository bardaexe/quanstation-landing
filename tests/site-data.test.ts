import { describe, expect, it } from "vitest";
import { comparisonRows, integrations, platformLinks, primaryNav, resourceLinks, tiers } from "../app/lib/site-data";

describe("site data contracts", () => {
  it("keeps primary navigation and dropdown destinations unique and intentional", () => {
    expect(primaryNav.map(({ href }) => href)).toEqual(["/platform", "/pricing", "/security", "/resources"]);
    expect(new Set(primaryNav.map(({ href }) => href)).size).toBe(primaryNav.length);
    expect(platformLinks).toHaveLength(4);
    expect(platformLinks.every(({ href }) => href.startsWith("/platform#"))).toBe(true);
    expect(resourceLinks).toHaveLength(4);
    expect(resourceLinks.at(-1)).toMatchObject({ href: "/contact", label: "Contact" });
  });

  it("keeps pricing tiers and comparison rows aligned", () => {
    expect(tiers).toHaveLength(6);
    expect(tiers.filter((tier) => tier.featured).map(({ name }) => name)).toEqual(["Premium"]);
    expect(new Set(tiers.map(({ name }) => name)).size).toBe(tiers.length);
    tiers.forEach((tier) => {
      expect(tier.name).toBeTruthy();
      expect(tier.group).toBeTruthy();
      expect(tier.description).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
    });
    comparisonRows.forEach((row) => expect(row.values).toHaveLength(tiers.length));
  });

  it("advertises the supported integration set", () => {
    expect(integrations).toEqual(["Python", "Rust", "NautilusTrader", "ProjectX", "CUDA", "ROCm"]);
  });
});
