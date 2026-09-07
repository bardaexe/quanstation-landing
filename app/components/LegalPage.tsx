import Link from "next/link";
import type { ReactNode } from "react";
import { legalIdentity, legalLinks } from "../lib/legal";
import styles from "./LegalPage.module.css";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  path: (typeof legalLinks)[number]["href"];
  introduction: string;
  summary: string;
  sections: readonly LegalSection[];
}

export function LegalPage({ title, path, introduction, summary, sections }: LegalPageProps) {
  return (
    <main id="main-content" className={`legal-document ${styles.page}`}>
      <header className={`container ${styles.hero}`}>
        <span className="eyebrow">Legal & privacy</span>
        <h1>{title}</h1>
        <p className={styles.introduction}>{introduction}</p>
        <div className={styles.meta}>
          <span>{legalIdentity.company} · {legalIdentity.country}</span>
          <span>Last updated <time dateTime={legalIdentity.updatedAt}>{legalIdentity.updatedLabel}</time></span>
        </div>
        <nav className={styles.policies} aria-label="Legal policies">
          {legalLinks.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
      </header>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>
          <nav aria-label="On this page">
            <h2>On this page</h2>
            <ol>{sections.map(({ id, title: sectionTitle }) => <li key={id}><a href={`#${id}`}>{sectionTitle}</a></li>)}</ol>
          </nav>
        </aside>
        <article className={styles.article} aria-label={title}>
          <div className={styles.summary}><strong>At a glance</strong><p>{summary}</p></div>
          {sections.map(({ id, title: sectionTitle, content }, index) => (
            <section key={id} id={id} aria-labelledby={`${id}-heading`}>
              <h2 id={`${id}-heading`}><span>{String(index + 1).padStart(2, "0")}</span>{sectionTitle}</h2>
              {content}
            </section>
          ))}
          <a className={styles.back} href="#main-content">Back to top ↑</a>
        </article>
      </div>
    </main>
  );
}

export function PrivacyContact() {
  return <a href={`mailto:${legalIdentity.privacyEmail}`}>{legalIdentity.privacyEmail}</a>;
}

export function SupportContact() {
  return <a href={`mailto:${legalIdentity.supportEmail}`}>{legalIdentity.supportEmail}</a>;
}
