import type { Metadata } from "next";
import Link from "next/link";
import { HeroSignalExperience } from "./components/HeroSignalExperience";
import { BacktestVisual, ReportsVisual, ResearchVisual, TradingVisual } from "./components/ProductVisuals";
import { integrations } from "./lib/site-data";

export const metadata: Metadata = {
  title: "Systematic trading, one workstation",
  description: "Build and validate Python or Rust strategies, operate live trading workflows, and turn every run into evidence with QuantStation.",
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero container">
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">A native quant trading workstation</span>
            <h1>From strategy idea to <span>trading decision.</span></h1>
            <p className="hero-lede">Build, validate, and execute systematic strategies without breaking the chain of evidence.</p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact?intent=access">Request access</Link>
              <Link className="button button-ghost" href="/platform">Explore platform</Link>
            </div>
            <div className="hero-assurance" aria-label="QuantStation system summary">
              <span><i aria-hidden="true" /> Local engine online</span>
              <span>Python · Rust · Native execution</span>
            </div>
          </div>
          <HeroSignalExperience />
        </div>
        <div className="integration-strip" aria-label="QuantStation technologies">
          {integrations.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="section section-intro container">
        <span className="section-index">01 / Platform</span>
        <h2>One connected process.<br /><span>Research. Execute. Review. Repeat.</span></h2>
        <p>QuantStation keeps the strategy, the market, and the evidence in the same workflow—so every decision begins with context and ends with something you can learn from.</p>
      </section>

      <FeatureStory id="research" index="01" label="Quant Lab" title="Build strategies in the languages quants actually use." copy="Create versioned Python and native Rust projects with typed properties, local datasets, and isolated validation in one focused workspace." features={["Python and native Rust", "Typed properties", "Local market datasets", "Isolated validation"]} visual={<ResearchVisual />} />
      <FeatureStory id="backtesting" index="02" label="Backtest & optimize" title="Test every assumption before capital is at risk." copy="Run regular backtests, walk-forward optimization, and multi-objective research with bounded parallel workers—then send every result into the same Report Lab." features={["Regular backtests", "Walk-forward optimization", "Multi-objective optimization", "Monte Carlo and prop simulation"]} visual={<BacktestVisual />} reverse />
      <FeatureStory id="execution" index="03" label="Trading workspace" title="Move from research to execution without losing control." copy="Read historical and live context, work across persistent chart layouts, inspect orders and fills, and keep high-impact actions explicit." features={["Native multi-chart workspace", "Studies and drawings", "Smart orders and alerts", "Confirmed risk controls"]} visual={<TradingVisual />} />
      <FeatureStory id="reports" index="04" label="Report Lab" title="Turn every run and every trade into evidence." copy="Compare statistics, settings, trades, equity, drawdown, and concentration. Review what worked, what failed, and what deserves another test." features={["Native report analysis", "Portfolio concentration", "Trade-level review", "Journal and notebook context"]} visual={<ReportsVisual />} reverse />

      <section className="workflow-section container">
        <div className="workflow-heading"><span className="section-index">02 / Workflow</span><h2>From signal to evidence.<br />No broken handoffs.</h2></div>
        <div className="workflow-rail">
          {[["01", "Idea"], ["02", "Code"], ["03", "Validate"], ["04", "Backtest"], ["05", "Optimize"], ["06", "Paper"], ["07", "Live"], ["08", "Review"]].map(([index, label]) => <div key={label}><span>{index}</span><strong>{label}</strong></div>)}
        </div>
      </section>

      <section className="trust-section container">
        <div className="trust-copy">
          <span className="section-index">03 / Trust boundary</span>
          <h2>A clear boundary between interface and execution.</h2>
          <p>React renders the workspace. Rust owns validation, secure sessions, authenticated I/O, and broker actions. User Python runs in isolated child processes without broker credentials.</p>
          <Link className="text-link" href="/security">Explore security <span>↗</span></Link>
        </div>
        <div className="trust-grid">
          <TrustCell number="01" title="Local by default" text="Research, journals, notes, and private files begin on your workstation." />
          <TrustCell number="02" title="Isolated strategies" text="User strategy code runs behind a bounded message contract." />
          <TrustCell number="03" title="Explicit execution" text="Live actions are validated, confirmed, and reconciled from authoritative events." />
          <TrustCell number="04" title="Server-side secrets" text="Broker and AI credentials never become client-side configuration." />
        </div>
      </section>

      <section className="pricing-preview container">
        <div className="pricing-preview-heading"><span className="section-index">04 / Plans</span><h2>Start local.<br />Expand when the workflow demands it.</h2><p>Six tiers cover the path from a first local dataset to high-capacity research, AI assistance, and advanced recording.</p></div>
        <div className="plan-paths">
          <div><span>Start</span><strong>Free + Starter</strong><p>Learn the workflow, then add portfolio tools and private sync.</p></div>
          <div className="active"><span>Build & trade</span><strong>Pro + Premium</strong><p>Open the live workstation, remote assets, and Quant AI.</p></div>
          <div><span>Scale</span><strong>Elite + Privateer</strong><p>Raise capacity and capture richer workstation sessions.</p></div>
        </div>
        <Link className="button button-light" href="/pricing">Compare all plans</Link>
      </section>

      <section className="final-cta container">
        <div className="final-glow" /><span className="eyebrow">Build around evidence</span><h2>Your trading process.<br />One serious workstation.</h2><p>Bring research, execution, performance, and deliberate review into one native platform.</p>
        <div><Link className="button button-light" href="/contact?intent=access">Request access</Link><Link className="button button-ghost" href="/contact">Talk to us</Link></div>
      </section>
    </main>
  );
}

function FeatureStory({ id, index, label, title, copy, features, visual, reverse = false }: { id: string; index: string; label: string; title: string; copy: string; features: string[]; visual: React.ReactNode; reverse?: boolean }) {
  return (
    <section className={reverse ? "feature-story feature-story-reverse container" : "feature-story container"} id={id}>
      <div className="story-heading"><span className="section-index">{index} / {label}</span><h2>{title}</h2></div>
      <div className="story-grid"><div className="story-visual">{visual}</div><div className="story-aside"><p>{copy}</p><span className="mini-label">CAPABILITIES</span>{features.map((feature) => <Link href={`/platform#${id}`} key={feature}>{feature}<span>↗</span></Link>)}</div></div>
    </section>
  );
}

function TrustCell({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="trust-cell"><span>{number}</span><strong>{title}</strong><p>{text}</p></div>;
}
