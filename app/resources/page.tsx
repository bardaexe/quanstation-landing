import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "../components/FaqAccordion";

export const metadata: Metadata = { title: "Resources", description: "Guides, architecture notes, integrations, and answers for QuantStation users." };

const guides = [
  ["01", "Getting started", "Set up the desktop, sign in, connect a supported account, and open your first workspace.", "8 min"],
  ["02", "Quant Lab guide", "Create a strategy project, validate typed properties, and queue a first regular backtest.", "12 min"],
  ["03", "Report Lab guide", "Import compatible reports, compare runs, and interpret drawdown and concentration.", "10 min"],
  ["04", "Security architecture", "Understand local storage, isolated workers, trusted services, and live execution intent.", "7 min"],
  ["05", "Quant MCP", "Use SDK references, scaffolding, and platform-porting guidance from an AI coding client.", "9 min"],
  ["06", "Research model", "Separate exploration, out-of-sample evidence, stress testing, and the final trading decision.", "11 min"],
] as const;

const faqs = [
  ["What is QuantStation?", "A native desktop workstation for systematic trading research, execution context, performance analysis, and deliberate review."],
  ["Can I build in Python and Rust?", "Yes. Research projects can contain Python and native Rust implementations. Persistent paper and broker-live strategy sessions are currently Python-only."],
  ["Where does my private work live?", "Journals, notes, playbooks, attachments, and AI history begin in a private local store. Eligible plans can add owner-scoped remote sync."],
  ["Does a backtest predict future returns?", "No. Backtests, optimization, Monte Carlo, and simulations are research evidence—not guarantees of future performance."],
  ["Which plan do I need for live trading?", "The current product gate opens the Trading workspace at Pro and above. Contact us before launch for final plan and purchase details."],
  ["Does QuantStation hold broker credentials?", "The React interface does not. Credential handling, authenticated I/O, and broker actions are owned by trusted Rust and server-side layers."],
] as const;

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <section className="page-hero resources-hero container"><span className="eyebrow">Resources</span><h1>Clarity before complexity.</h1><p>Learn the workflows, architecture, and research model behind QuantStation—without trading mythology or hidden assumptions.</p><div className="page-hero-meta" aria-label="Resource areas"><span><i /> Workflow guides</span><span>Architecture notes</span><span>Direct answers</span></div></section>
      <section className="resource-guides container" id="guides">
        <div className="resource-heading"><span className="section-index">Guides</span><h2>Start with the workflow.</h2></div>
        <div className="guide-grid">{guides.map(([number, title, text, time]) => <article key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p><small>{time} read</small></div><i>↗</i></article>)}</div>
      </section>
      <section className="integrations-section container" id="integrations">
        <div><span className="section-index">Integrations</span><h2>Built on serious tools.</h2><p>QuantStation connects a React workspace to a trusted Rust host, isolated Python research workers, and the NautilusTrader runtime.</p></div>
        <div className="integration-matrix"><span>React</span><span>Rust</span><span>Python</span><span>NautilusTrader</span><span>ProjectX</span><span>Firebase</span><span>PostgreSQL</span><span>Redis</span></div>
      </section>
      <section className="faq-section container" id="faq">
        <div className="faq-heading"><span className="section-index">FAQ</span><h2>Direct answers.</h2></div>
        <FaqAccordion items={faqs} />
      </section>
      <section className="inline-cta container"><div><span className="eyebrow">Still deciding?</span><h2>Bring us the real workflow.</h2></div><Link className="button button-light" href="/contact">Contact the team</Link></section>
    </main>
  );
}
