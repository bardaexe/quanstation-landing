import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Talk with the QuantStation team about product fit, plans, security, or partnerships." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent } = await searchParams;
  const normalized = intent ? intent.charAt(0).toUpperCase() + intent.slice(1) : "General";
  const options = new Set(["General", "Access", "Plans", "Security", "Starter", "Pro", "Premium", "Elite", "Privateer", "Partnership"]);
  const interest = options.has(normalized) ? normalized : "General";
  return (
    <main id="main-content">
      <section className="contact-page container">
        <div className="contact-copy">
          <span className="eyebrow">Contact QuantStation</span><h1>Tell us what you’re building toward.</h1><p>Questions about plans, security, product fit, or your systematic trading workflow? Send the context and we’ll route it to the right place.</p>
          <div className="contact-facts">
            <div><span>01</span><strong>Product & plans</strong><p>Map your workflow to the right capability level.</p></div>
            <div><span>02</span><strong>Security</strong><p>Discuss local data, execution boundaries, and trusted services.</p></div>
            <div><span>03</span><strong>Partnerships</strong><p>Explore broker, data, education, or research integrations.</p></div>
          </div>
        </div>
        <div className="contact-panel"><span className="mini-label">REQUEST DETAILS</span><ContactForm defaultInterest={interest} /></div>
      </section>
    </main>
  );
}
