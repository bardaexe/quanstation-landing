"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "./Brand";
import { platformLinks, primaryNav, resourceLinks } from "../lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <details className="nav-dropdown">
            <summary className={pathname === "/platform" ? "active" : undefined}>Platform <span>⌄</span></summary>
            <div className="nav-popover">
              {platformLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                </Link>
              ))}
            </div>
          </details>
          <Link className={pathname === "/pricing" ? "active" : undefined} href="/pricing">Pricing</Link>
          <Link className={pathname === "/security" ? "active" : undefined} href="/security">Security</Link>
          <details className="nav-dropdown">
            <summary className={pathname === "/resources" ? "active" : undefined}>Resources <span>⌄</span></summary>
            <div className="nav-popover">
              {resourceLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <Link className="button button-compact button-ghost header-contact" href="/contact">Contact</Link>
          <Link className="button button-compact button-light" href="/contact?intent=access">Request access</Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {primaryNav.map((link) => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<span>↗</span></Link>)}
          <Link href="/contact" onClick={() => setOpen(false)}>Contact<span>↗</span></Link>
        </nav>
      )}
    </header>
  );
}
