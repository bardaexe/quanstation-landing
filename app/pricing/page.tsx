import type { Metadata } from "next";
import Link from "next/link";
import { comparisonRows, tiers } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare Free, Starter, Pro, Premium, Elite, and Privateer QuantStation plans.",
};

export default function PricingPage() {
  const groups = ["Start", "Build & trade", "Scale"] as const;
  return (
    <main id="main-content">
      <section className="page-hero pricing-hero container">
        <span className="eyebrow">Plans for every stage</span>
        <h1>Start local.<br />Scale with your process.</h1>
        <p>Choose the capacity and workflow that fit how you research, review, and trade. Final paid pricing will be published before checkout.</p>
      </section>

      <section className="pricing-groups container" aria-label="QuantStation plans">
        {groups.map((group, groupIndex) => (
          <div className="pricing-group" key={group}>
            <div className="pricing-group-label"><span>{String(groupIndex + 1).padStart(2, "0")}</span>{group}</div>
            <div className="pricing-pair">
              {tiers.filter((tier) => tier.group === group).map((tier) => (
                <article className={tier.featured ? "pricing-card featured" : "pricing-card"} key={tier.name}>
                  <div className="plan-title"><strong>{tier.name}</strong>{tier.featured && <span>Recommended</span>}</div>
                  <div className={tier.price.length > 8 ? "plan-price plan-price-text" : "plan-price"}>{tier.price}<small>{tier.cadence}</small></div>
                  <p>{tier.description}</p><div className="plan-divider" />
                  <span className="mini-label">PLAN HIGHLIGHTS</span>
                  <ul>{tier.features.map((feature) => <li key={feature}><i />{feature}</li>)}</ul>
                  <Link className={tier.featured ? "button button-teal" : "button button-ghost"} href={`/contact?intent=${tier.name.toLowerCase()}`}>{tier.cta}</Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="comparison-section container">
        <div className="comparison-heading"><span className="section-index">Detailed comparison</span><h2>Know exactly what grows with you.</h2><p>Current encoded product limits are shown below. Public pricing, taxes, billing cadence, and purchase terms will be confirmed before launch.</p></div>
        <div className="comparison-scroll" role="region" aria-label="Plan comparison" tabIndex={0}>
          <table>
            <thead><tr><th>Capability</th>{tiers.map((tier) => <th key={tier.name}>{tier.name}</th>)}</tr></thead>
            <tbody>{comparisonRows.map((row, index) => <tr key={row.feature}><th><span>{index === 0 || comparisonRows[index - 1].category !== row.category ? row.category : ""}</span>{row.feature}</th>{row.values.map((value, valueIndex) => <td key={`${row.feature}-${tiers[valueIndex].name}`}>{value}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="pricing-note container"><span>Need help choosing?</span><h2>Tell us how you research and trade.</h2><p>We’ll map the workflow you need to the smallest plan that supports it.</p><Link className="button button-light" href="/contact?intent=plans">Talk through the plans</Link></section>
    </main>
  );
}

