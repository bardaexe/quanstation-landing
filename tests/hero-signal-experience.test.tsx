import type { AnchorHTMLAttributes, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HeroSignalExperience } from "../app/components/HeroSignalExperience";
import { mockMatchMedia, mockReducedMotion } from "./test-utils";

vi.mock("next/link", () => ({
  default: ({ children, href, onClick, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { children?: ReactNode; href: string }) => (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

describe("HeroSignalExperience", () => {
  beforeEach(() => {
    mockReducedMotion(true);
  });

  it("exposes all signal destinations and activates a signal on focus", () => {
    const { container } = render(<HeroSignalExperience />);
    const heroObject = container.querySelector<HTMLElement>(".hero-object")!;
    const buildLink = screen.getByRole("link", { name: /Build strategies/ });
    const validateLink = screen.getByRole("link", { name: /Validate evidence/ });
    const executeLink = screen.getByRole("link", { name: /Execute with control/ });

    expect(buildLink).toHaveAttribute("href", "/platform#research");
    expect(validateLink).toHaveAttribute("href", "/platform#backtesting");
    expect(executeLink).toHaveAttribute("href", "/platform#execution");

    fireEvent.focus(buildLink);
    expect(heroObject).toHaveAttribute("data-signal", "build");
    expect(heroObject).toHaveAttribute("data-mode", "manual");
    expect(buildLink).toHaveClass("is-active");
    expect(screen.getByText("Build acquired")).toBeInTheDocument();

    fireEvent.blur(buildLink);
    expect(heroObject).toHaveAttribute("data-signal", "idle");
    expect(heroObject).toHaveAttribute("data-mode", "idle");
  });

  it("activates and releases a signal through pointer interaction", () => {
    const { container } = render(<HeroSignalExperience />);
    const heroObject = container.querySelector<HTMLElement>(".hero-object")!;
    const validateLink = screen.getByRole("link", { name: /Validate evidence/ });

    fireEvent.pointerEnter(validateLink);
    expect(heroObject).toHaveAttribute("data-signal", "validate");
    expect(validateLink).toHaveClass("is-active");

    fireEvent.pointerLeave(validateLink);
    expect(heroObject).toHaveAttribute("data-signal", "idle");
    expect(validateLink).not.toHaveClass("is-active");
  });

  it("does not start the timed intro when reduced motion is requested", () => {
    vi.useFakeTimers();
    render(<HeroSignalExperience />);

    vi.advanceTimersByTime(4_000);
    expect(document.querySelector(".hero-object")).toHaveAttribute("data-signal", "idle");
    vi.useRealTimers();
  });

  it("allows the timed intro to be cancelled by manual focus", () => {
    vi.useFakeTimers();
    mockMatchMedia(() => false);
    render(<HeroSignalExperience />);
    const heroObject = document.querySelector<HTMLElement>(".hero-object")!;
    const executeLink = screen.getByRole("link", { name: /Execute with control/ });

    fireEvent.focus(executeLink);
    vi.advanceTimersByTime(4_000);

    expect(heroObject).toHaveAttribute("data-signal", "execute");
    expect(heroObject).toHaveAttribute("data-mode", "manual");
    vi.useRealTimers();
  });
});
