import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionSystem } from "../app/components/MotionSystem";
import { mockReducedMotion } from "./test-utils";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

describe("MotionSystem", () => {
  it("initializes motion metadata, reveals scenes, and renders reduced-motion counters", () => {
    mockReducedMotion(true);
    document.body.innerHTML = `
      <main>
        <section class="hero"><h1>Hero</h1></section>
        <section class="feature-story"><h2>Research</h2><span data-count-prefix="+$" data-count-up="42840">0</span></section>
      </main>
    `;

    const { container } = render(<MotionSystem />);
    const sections = [...document.querySelectorAll("main > section")];
    const progress = container.querySelector(".scroll-progress")!;

    expect(document.documentElement).toHaveClass("motion-enhanced");
    expect(progress).toHaveAttribute("data-total", "02");
    expect(progress).toHaveAttribute("data-section", "01");
    expect(sections[0]).toHaveClass("motion-scene", "motion-section", "is-visible", "motion-settled");
    expect(sections[0]).toHaveAttribute("data-motion-variant", "hero");
    expect(sections[1]).toHaveClass("motion-scene", "motion-section", "is-visible", "motion-settled");
    expect(sections[1]).toHaveAttribute("data-motion-variant", "right");
    expect(sections[1].querySelector("[data-count-up]")).toHaveTextContent("+$42,840");
  });
});
