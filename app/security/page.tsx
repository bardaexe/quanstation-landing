import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Security", description: "Understand QuantStation's local-first data model, isolated strategy runtime, and trusted execution boundaries." };

const layers = [
  { number: "01", title: "React interface", text: "Renders the workstation and user intent. It does not own broker credentials or trusted execution state." },
  { number: "02", title: "Rust host", text: "Owns validation, local persistence, jobs, authenticated I/O, secure sessions, and high-impact broker actions." },
  { number: "03", title: "Isolated strategy workers", text: "User Python runs in child processes behind bounded messages without Firebase tokens or broker credentials." },
  { number: "04", title: "Trusted services", text: "Entitlements, provider secrets, remote assets, and AI credentials remain behind authenticated server contracts." },
];

export default function SecurityPage() {
  return (
    <main id="main-content">
      <section className="page-hero security-hero container">
        <span className="eyebrow">Security architecture</span><h1>A trading workstation with clear trust boundaries.</h1><p>QuantStation separates presentation, trusted execution, and user strategy code so sensitive state stays within the layer designed to handle it.</p>
        <div className="page-hero-meta" aria-label="Security model"><span><i /> Local by default</span><span>Isolated workers</span><span>Explicit execution</span></div>
      </section>
      <section className="security-diagram container">
        <div className="diagram-core"><span>Trusted boundary</span><strong>QuantStation</strong><i /></div>
        <div className="diagram-layers">{layers.map((layer) => <article key={layer.number}><span>{layer.number}</span><div><strong>{layer.title}</strong><p>{layer.text}</p></div></article>)}</div>
      </section>
      <section className="security-principles container">
        <div className="principles-heading"><span className="section-index">Principles</span><h2>Security is a system design choice.</h2></div>
        <div className="principles-grid">
          <Principle title="Credentials stay out of the interface" text="React never needs broker credentials or provider tokens. Secure handling belongs to trusted runtime layers." />
          <Principle title="Execution requires intent" text="Live commands are validated, confirmed, and completed only from authoritative order and fill events." />
          <Principle title="Private work starts local" text="Journals, notebooks, playbooks, voice notes, attachments, and AI history begin in a private local store." />
          <Principle title="Remote assets are verified" text="Authenticated versions are owner-scoped and checksum-verified before becoming local research inputs." />
          <Principle title="AI secrets remain server-side" text="Model selection and provider credentials never become desktop configuration or strategy context." />
          <Principle title="Recovery respects ownership" text="Backup and restore validate schema and owner identity before private records or attachments are accepted." />
        </div>
      </section>
      <section className="boundary-callout container"><span className="eyebrow">No vague promises</span><h2>Specific controls over security theater.</h2><p>QuantStation documents what is local, what is remote, and which layer owns every sensitive action. We do not describe any system as invulnerable.</p><Link className="button button-light" href="/contact?intent=security">Ask a security question</Link></section>
    </main>
  );
}

function Principle({ title, text }: { title: string; text: string }) { return <article><i /><strong>{title}</strong><p>{text}</p></article>; }
