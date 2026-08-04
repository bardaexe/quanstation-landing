import type { Metadata } from "next";
import Link from "next/link";
import { BacktestVisual, ReportsVisual, ResearchVisual, TradingVisual } from "../components/ProductVisuals";

export const metadata: Metadata = {
  title: "Platform",
  description: "Explore QuantStation Research, Backtesting, Trading, Report Lab, and private performance workflows.",
};

const capabilities = [
  { id: "research", number: "01", eyebrow: "Research", title: "Turn strategy logic into repeatable research.", text: "Create versioned Python and native Rust projects with typed properties, local datasets, and isolated validation. The Quant MCP authoring companion helps with SDK reference, scaffolding, and platform-porting guidance.", bullets: ["Python and native Rust", "Typed property schemas", "Local Bars, L1, L2, and L3 datasets", "Isolated validation"], visual: <ResearchVisual /> },
  { id: "backtesting", number: "02", eyebrow: "Backtest and optimize", title: "Find evidence that survives the next question.", text: "Run regular backtests, out-of-sample walk-forward optimization, and multi-objective optimization with bounded parallel workers. Compare every result through the same reporting model.", bullets: ["Regular backtests", "Walk-forward optimization", "Multi-objective Pareto research", "CPU and supported GPU acceleration"], visual: <BacktestVisual /> },
  { id: "execution", number: "03", eyebrow: "Trading", title: "Read the market. Control the action.", text: "Connect supported accounts, stream market context, and work across single, split, or four-chart layouts. Inspect orders, fills, positions, and effective risk rules without leaving the workstation.", bullets: ["Historical and live charts", "Persistent studies and drawings", "Smart orders, alerts, and hotkeys", "Confirmed flatten and cancel controls"], visual: <TradingVisual /> },
  { id: "reports", number: "04", eyebrow: "Report Lab", title: "Find the runs worth trusting.", text: "Load reports recursively, compare statistics, settings, trades, and equity curves, and inspect quality, drawdown, recovery, and concentration before the next decision.", bullets: ["Portfolio and concentration analysis", "Trade and period inspection", "Monte Carlo stress testing", "Journal, notebook, and playbooks"], visual: <ReportsVisual /> },
];

export default function PlatformPage() {
  return (
    <main id="main-content">
      <section className="page-hero container">
        <span className="eyebrow">QuantStation platform</span>
        <h1>Everything you need to trade systematic ideas with context.</h1>
        <p>Charting, strategy research, execution, performance analysis, and deliberate review—connected inside one native workstation.</p>
        <div className="page-hero-meta" aria-label="Platform highlights">
          <span><i /> Native desktop</span>
          <span>Local-first research</span>
          <span>Python + Rust</span>
        </div>
        <div className="anchor-links">{capabilities.map((item) => <a href={`#${item.id}`} key={item.id}><span>{item.number}</span>{item.eyebrow}</a>)}</div>
      </section>
      {capabilities.map((item, index) => (
        <section className={index % 2 === 1 ? "platform-chapter platform-chapter-reverse container" : "platform-chapter container"} id={item.id} key={item.id}>
          <div className="chapter-copy">
            <span className="section-index">{item.number} / {item.eyebrow}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <ul>{item.bullets.map((bullet) => <li key={bullet}><i />{bullet}</li>)}</ul>
          </div>
          <div className="chapter-visual">{item.visual}</div>
        </section>
      ))}
      <section className="inline-cta container"><div><span className="eyebrow">Ready to go deeper?</span><h2>See which plan fits your workflow.</h2></div><Link className="button button-light" href="/pricing">View plans</Link></section>
    </main>
  );
}
