"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { platformLinks, primaryNav, resourceLinks } from "../lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"platform" | "resources" | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open && openMenu === null) return;

    const closeAll = () => {
      setOpen(false);
      setOpenMenu(null);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeAll();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const menuToFocus = openMenu;
      closeAll();
      if (menuToFocus) {
        window.requestAnimationFrame(() => {
          headerRef.current
            ?.querySelector<HTMLButtonElement>(`[data-nav-trigger="${menuToFocus}"]`)
            ?.focus();
        });
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, openMenu]);

  const toggleMenu = (menu: "platform" | "resources") => {
    setOpen(false);
    setOpenMenu((current) => current === menu ? null : menu);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-menu">
            <button
              aria-controls="platform-menu"
              aria-expanded={openMenu === "platform"}
              className={pathname === "/platform" ? "nav-trigger active" : "nav-trigger"}
              data-nav-trigger="platform"
              id="platform-menu-trigger"
              onClick={() => toggleMenu("platform")}
              type="button"
            >
              Platform <span aria-hidden="true">⌄</span>
            </button>
            {openMenu === "platform" && (
              <div aria-labelledby="platform-menu-trigger" className="qs-nav-content" id="platform-menu">
                <div className="nav-popover">
                  <span className="sr-only">Platform navigation</span>
                  {platformLinks.map((link) => (
                    <Link href={link.href} key={link.href} onClick={() => setOpenMenu(null)}>
                      <strong>{link.label}</strong>
                      <span>{link.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link className={pathname === "/pricing" ? "active" : undefined} href="/pricing">Pricing</Link>
          <Link className={pathname === "/security" ? "active" : undefined} href="/security">Security</Link>
          <div className="nav-menu">
            <button
              aria-controls="resources-menu"
              aria-expanded={openMenu === "resources"}
              className={pathname === "/resources" ? "nav-trigger active" : "nav-trigger"}
              data-nav-trigger="resources"
              id="resources-menu-trigger"
              onClick={() => toggleMenu("resources")}
              type="button"
            >
              Resources <span aria-hidden="true">⌄</span>
            </button>
            {openMenu === "resources" && (
              <div aria-labelledby="resources-menu-trigger" className="qs-nav-content" id="resources-menu">
                <div className="nav-popover">
                  <span className="sr-only">Resources navigation</span>
                  {resourceLinks.map((link) => (
                    <Link href={link.href} key={link.href} onClick={() => setOpenMenu(null)}>
                      <strong>{link.label}</strong>
                      <span>{link.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <Link className="button button-compact button-ghost header-contact" href="/contact">Contact</Link>
          <Link className="button button-compact button-light" href="/contact?intent=access">Request access</Link>
          <button
            className={open ? "menu-toggle open" : "menu-toggle"}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => {
              setOpenMenu(null);
              setOpen((value) => !value);
            }}
          >
            <span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {primaryNav.map((link) => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<span>↗</span></Link>)}
          <Link href="/contact" onClick={() => setOpen(false)}>Contact<span>↗</span></Link>
          <Link className="mobile-nav-cta" href="/contact?intent=access" onClick={() => setOpen(false)}>Request access<span>↗</span></Link>
        </nav>
      )}
    </header>
  );
}
