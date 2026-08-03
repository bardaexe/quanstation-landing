import Link from "next/link";
import { Brand } from "./Brand";

const footerGroups = [
  { title: "Platform", links: [["Research", "/platform#research"], ["Backtesting", "/platform#backtesting"], ["Execution", "/platform#execution"], ["Reports", "/platform#reports"]] },
  { title: "Explore", links: [["Pricing", "/pricing"], ["Security", "/security"], ["Resources", "/resources"], ["Contact", "/contact"]] },
  { title: "Product", links: [["Python & Rust", "/resources#integrations"], ["Integrations", "/resources#integrations"], ["FAQ", "/resources#faq"], ["Request access", "/contact?intent=access"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>Build, validate, and operate systematic trading workflows from one local-first workstation.</p>
          <div className="status-line"><i /> Product preview</div>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 QuantStation</span>
        <span>Trading involves risk. Simulated and backtested results do not guarantee future performance.</span>
      </div>
    </footer>
  );
}

