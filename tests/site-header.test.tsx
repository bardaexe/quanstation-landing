import type { AnchorHTMLAttributes, ReactNode } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from "next/navigation";
import { SiteHeader } from "../app/components/SiteHeader";

const pathnameMock = vi.mocked(usePathname);

describe("SiteHeader", () => {
  beforeEach(() => {
    pathnameMock.mockReturnValue("/");
  });

  it("opens desktop dropdowns and keeps them mutually exclusive", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const platformTrigger = screen.getByRole("button", { name: /Platform/ });
    const resourcesTrigger = screen.getByRole("button", { name: /Resources/ });

    await user.click(platformTrigger);
    expect(platformTrigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Research/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Guides/ })).not.toBeInTheDocument();

    await user.click(resourcesTrigger);
    expect(platformTrigger).toHaveAttribute("aria-expanded", "false");
    expect(resourcesTrigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByRole("link", { name: /Research/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Guides/ })).toBeInTheDocument();

    await user.click(resourcesTrigger);
    expect(resourcesTrigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: /Guides/ })).not.toBeInTheDocument();
  });

  it("closes a desktop dropdown on Escape, returns focus, and closes on outside pointer input", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const platformTrigger = screen.getByRole("button", { name: /Platform/ });
    await user.click(platformTrigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("link", { name: /Research/ })).not.toBeInTheDocument();
    await waitFor(() => expect(platformTrigger).toHaveFocus());

    await user.click(platformTrigger);
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("link", { name: /Research/ })).not.toBeInTheDocument();
    expect(platformTrigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes a dropdown after selecting a submenu link", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /Platform/ }));
    await user.click(screen.getByRole("link", { name: /Backtesting/ }));

    expect(screen.queryByRole("link", { name: /Backtesting/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Platform/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps header navigation links pointed at the intended routes", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "QuantStation home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: "Security" })).toHaveAttribute("href", "/security");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Request access" })).toHaveAttribute("href", "/contact?intent=access");

    await user.click(screen.getByRole("button", { name: /Platform/ }));
    expect(screen.getByRole("link", { name: /Research/ })).toHaveAttribute("href", "/platform#research");
    expect(screen.getByRole("link", { name: /Backtesting/ })).toHaveAttribute("href", "/platform#backtesting");
    expect(screen.getByRole("link", { name: /Execution/ })).toHaveAttribute("href", "/platform#execution");
    expect(screen.getByRole("link", { name: /Reports/ })).toHaveAttribute("href", "/platform#reports");

    await user.click(screen.getByRole("button", { name: /Resources/ }));
    expect(screen.getByRole("link", { name: /Guides/ })).toHaveAttribute("href", "/resources#guides");
    expect(screen.getByRole("link", { name: /Integrations/ })).toHaveAttribute("href", "/resources#integrations");
    expect(screen.getByRole("link", { name: /FAQ/ })).toHaveAttribute("href", "/resources#faq");
    expect(within(document.getElementById("resources-menu")!).getByRole("link", { name: /^Contact/ })).toHaveAttribute("href", "/contact");

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const mobileNav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(within(mobileNav).getByRole("link", { name: /Platform/ })).toHaveAttribute("href", "/platform");
    expect(within(mobileNav).getByRole("link", { name: /Pricing/ })).toHaveAttribute("href", "/pricing");
    expect(within(mobileNav).getByRole("link", { name: /Security/ })).toHaveAttribute("href", "/security");
    expect(within(mobileNav).getByRole("link", { name: /Resources/ })).toHaveAttribute("href", "/resources");
    expect(within(mobileNav).getByRole("link", { name: /^Contact/ })).toHaveAttribute("href", "/contact");
    expect(within(mobileNav).getByRole("link", { name: /Request access/ })).toHaveAttribute("href", "/contact?intent=access");
  });

  it("toggles the mobile menu and closes it after mobile navigation", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menuToggle = screen.getByRole("button", { name: "Open navigation" });
    await user.click(menuToggle);

    const mobileNav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    expect(menuToggle).toHaveAccessibleName("Close navigation");

    await user.click(within(mobileNav).getByRole("link", { name: /Platform/ }));
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");
    expect(menuToggle).toHaveAccessibleName("Open navigation");
  });

  it("closes desktop menus when opening the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /Resources/ }));
    await user.click(screen.getByRole("button", { name: "Open navigation" }));

    expect(screen.queryByRole("link", { name: /Guides/ })).not.toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
  });

  it("marks the current primary route active", () => {
    pathnameMock.mockReturnValue("/pricing");
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveClass("active");
    expect(screen.getByRole("button", { name: /Platform/ })).not.toHaveClass("active");
  });

  it("marks the current dropdown route active", () => {
    pathnameMock.mockReturnValue("/platform");
    render(<SiteHeader />);

    expect(screen.getByRole("button", { name: /Platform/ })).toHaveClass("active");
    expect(screen.getByRole("link", { name: "Pricing" })).not.toHaveClass("active");
  });
});
