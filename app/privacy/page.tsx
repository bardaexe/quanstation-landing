import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, PrivacyContact, type LegalSection } from "../components/LegalPage";
import { legalIdentity } from "../lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Barda Developments (dba, QuantStation) handles account, trading, research, AI, billing, and website information, and how to exercise your privacy rights.",
};

const sections: LegalSection[] = [
  { id: "scope", title: "Who we are and what this covers", content: <>
    <p>{legalIdentity.company}, based in Israel, operates the QuantStation website, desktop workstation, and related hosted services. We are responsible for the personal information we collect and use to operate these services. Contact <PrivacyContact /> or use our <Link href="/contact">contact form</Link> for privacy matters.</p>
    <p>This policy covers visitors, people contacting us, account holders, and users of enabled platform features. Available features depend on your version, subscription, and configuration. Brokers, payment providers, model providers, and external tools also handle information under their own policies.</p>
    <p>Providing information is voluntary unless we explain a specific legal requirement when collecting it. Without required account details we cannot create or secure your account; without connection credentials we cannot connect your broker; without contact details we cannot reply. Optional uploads, recordings, AI requests, and sharing are your choice.</p>
  </> },
  { id: "information", title: "Information we handle", content: <>
    <ul>
      <li><strong>Website inquiries:</strong> your name, email address, optional company or team, selected topic, message, submission identifier, and time. Hosting services also process request information such as IP address, browser details, requested URL, and security or error events.</li>
      <li><strong>Accounts and subscriptions:</strong> email address, display name, account identifiers, authentication and verification information, profile settings, subscription tier and status, service entitlements, and active-session records. Firebase Authentication processes sign-in credentials.</li>
      <li><strong>Connected trading services:</strong> broker username, connection credentials or tokens, provider and account identifiers, account names, balances, equity, positions, orders, fills, transaction history, risk settings, and connection status. This includes information received from a provider you connect and trading records you import.</li>
      <li><strong>Research and workspace content:</strong> strategy and indicator source code, Blueprints, datasets, notebooks, journals, playbooks, reports, charts, attachments, preferences, and backup files. These may contain financial or other personal information you include.</li>
      <li><strong>Audio and video:</strong> voice notes, transcripts, and chart recordings, including microphone or camera content when you enable those inputs. Local transcription uses the executable and model you select.</li>
      <li><strong>AI interactions:</strong> prompts, conversation context, selected files and attachments, strategy or Blueprint context, generated answers and code, run checkpoints, model selection, token and cost usage, and request diagnostics.</li>
      <li><strong>Community activity:</strong> profile information, posts, comments, group or mentorship activity, sharing choices, submitted reports, moderation records, and performance aggregates for features you join or use.</li>
      <li><strong>Billing and operations:</strong> purchase and subscription identifiers, invoice dates, payment and refund status, amounts, usage allowances, device or installation identifiers, app version, network performance, errors, and security audit events.</li>
    </ul>
    <p>We receive information from you, your use of the services, connected brokers and providers, payment confirmations, and other users who interact with you or report content. Do not include passwords, unnecessary identity documents, or another person’s private information in support messages or AI prompts.</p>
  </> },
  { id: "local-cloud", title: "What stays local and what goes online", content: <>
    <p>QuantStation is a local-first workstation. Research files, private journals and notes, report libraries, recordings, and desktop preferences can be stored on your computer. Local storage may include files, databases, browser-style storage inside the desktop app, and the operating system’s credential manager. Account sign-in, broker connectivity, hosted AI, and remote storage still require online processing.</p>
    <p>Choosing remote storage or an upload transfers the selected content and associated metadata, such as ownership, filenames, versions, size, and checksums, to hosted services. Connecting a broker lets the relevant services exchange account and order information. Sharing content makes it available to its selected audience.</p>
    <p>Local voice transcription and chart recording do not themselves require sending the recording to our AI services. Attaching that recording, transcript, or other local content to an AI request or upload does send the selected content off-device. Local history does not mean that a request was processed only on your computer.</p>
    <p>Optional MCP connections let an external AI client use exposed research and desktop tools, including reading permitted report or workspace context. Your chosen client may send that information to its own service providers. Review its permissions and privacy settings before connecting it.</p>
  </> },
  { id: "purposes", title: "Why we use information", content: <>
    <p>We use information to provide accounts and requested features; authenticate users; connect brokers and transmit authorized instructions; store and retrieve selected assets; generate AI responses; administer subscriptions and usage limits; answer inquiries; support community features; investigate errors and abuse; improve reliability; and meet legal, accounting, and dispute-resolution obligations.</p>
    <p>Where a legal basis is required, account administration and requested services rely on performing our agreement with you or taking steps you request before entering it. Security, troubleshooting, service administration, and handling ordinary inquiries may rely on legitimate interests, balanced against your rights. Legal recordkeeping relies on applicable obligations. Where consent is required, including for certain device access or optional communications, we rely on that consent and you may withdraw it.</p>
    <p>Sending a contact request does not subscribe you to marketing. We do not use the landing website to serve targeted advertising. We do not sell personal information or share it for cross-context behavioral advertising.</p>
  </> },
  { id: "ai", title: "AI processing and monitoring", content: <>
    <p>Hosted Quant AI uses Google’s Firebase and Gemini services. Requests can include your prompt, relevant conversation history, attachments, source code, and workspace context supplied to the feature. Planning, generation, review, and retries can involve multiple model calls. We keep usage and cost records to enforce allowances and may store server checkpoints to support an active or recoverable run.</p>
    <p>AI monitoring can capture prompts, generated responses, and provider-generated summaries in Google Cloud observability systems, alongside timing, model, and usage information. These records can contain personal or confidential information present in the request. Treat submitted context as information processed by our hosted services, even when your chat history is also saved locally. Google describes this behavior in its <a href="https://firebase.google.com/docs/ai-logic/monitoring">AI monitoring documentation</a>.</p>
    <p>If you choose OpenRouter, your request goes through QuantStation to OpenRouter and the selected downstream model provider. Your own key is stored through the desktop credential manager and transmitted to our service for forwarding to OpenRouter. Provider retention, model-training, and processing terms depend on the route and provider; using your own key does not make processing local. Consult <a href="https://openrouter.ai/privacy">OpenRouter’s privacy policy</a> and the selected provider’s terms.</p>
    <p>We do not use your private workspace content to train a general-purpose AI model ourselves. This statement does not override the terms or configuration of an external provider you use. Avoid sending material you are not authorized to disclose.</p>
  </> },
  { id: "recipients", title: "Who receives information", content: <>
    <ul>
      <li><strong>Google / Firebase:</strong> authentication, account and entitlement records, hosted files, cloud functions, AI processing, performance monitoring, and app verification through App Check / reCAPTCHA.</li>
      <li><strong>Amazon Web Services:</strong> backend infrastructure, selected remote assets, and managed broker secrets where those backend services are used.</li>
      <li><strong>Website hosting and inquiry delivery providers:</strong> hosting, request security, and contact processing. The website supports Google/Firebase hosting and Cloudflare hosting with D1 storage; some deployments deliver inquiries to our configured support service.</li>
      <li><strong>Lemon Squeezy:</strong> payment and subscription processing where offered. We receive subscription, invoice, amount, and refund information to verify access. Payment details entered into its checkout are handled by that provider; our contact form does not request payment-card details.</li>
      <li><strong>Your connected providers:</strong> brokers and trading platforms such as ProjectX, DXtrade, or Rithmic, market-data services, OpenRouter and its model providers, and external AI clients, according to the integrations you use.</li>
      <li><strong>Other users:</strong> recipients of content you publish or share, and participants in enabled group, community, mentorship, or leaderboard features. Public recipients may copy shared information.</li>
      <li><strong>Operational and legal recipients:</strong> authorized personnel, professional advisers, and authorities where disclosure is required or legally justified to protect rights, investigate abuse, or respond to valid legal process. A business reorganization may require transferring relevant records, subject to applicable privacy protections and notice requirements.</li>
    </ul>
    <p>Providers receive information relevant to their role. Some act on our instructions; others, including brokers and payment providers, have their own legal responsibilities and policies. See <a href="https://firebase.google.com/support/privacy">Firebase privacy information</a>, <a href="https://aws.amazon.com/privacy/">AWS privacy information</a>, <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare’s privacy policy</a>, and <a href="https://www.lemonsqueezy.com/privacy">Lemon Squeezy’s privacy policy</a>.</p>
  </> },
  { id: "sharing", title: "Sharing and automated features", content: <>
    <p>Keep private strategies, datasets, trading information, and recordings private unless you intend to share them. Community and performance features can disclose profile or trading-derived information to other participants. Deleting your copy cannot recall exports, screenshots, or copies independently retained by recipients.</p>
    <p>Software can apply risk rules, route orders, calculate performance, enforce account or usage limits, and generate AI suggestions automatically. Trading actions depend on the account permissions and instructions you configure. AI output is not a decision about your creditworthiness or suitability to invest. Contact us if you believe an automated access restriction or personal-data assessment is incorrect, including to request human review where applicable law provides that right.</p>
  </> },
  { id: "retention", title: "Retention and deletion", content: <>
    <p>We retain hosted information according to its purpose: account records while providing and administering your account; uploaded assets while you retain them in the service; support inquiries while handling the request and relevant follow-up; and financial, usage, security, and audit records for the periods needed for accounting, reconciliation, fraud prevention, legal obligations, and disputes. The applicable period depends on the record, contractual requirements, and law.</p>
    <p>Local files and desktop storage remain under your control until removed, overwritten, or cleared. Signing out, uninstalling, canceling a plan, deleting a cloud asset, and deleting a broker connection are different actions and may leave other copies intact. Export material you need before deleting app data. Ask us to close your account or delete hosted information at <PrivacyContact />; account-wide deletion is handled by request.</p>
    <p>Deletion may be subject to identity verification and lawful retention exceptions. Backups, audit records, and provider logs may persist until their applicable retention periods expire. Expiration of a session token, signed download link, or recovery checkpoint is not a promise that all related records are deleted at that moment. Brokers and payment providers retain their own records independently.</p>
  </> },
  { id: "security-transfers", title: "Security and international processing", content: <>
    <p>We use access controls, authenticated service boundaries, protected credential storage, and restricted upload and download mechanisms to protect information. No system is immune to compromise. Protect your device, account, backups, and API keys; contact us promptly about suspected unauthorized access.</p>
    <p>We operate from Israel. Our providers may process information in Israel, the United States, and other countries where they operate. Protections and government-access rules can differ between countries. Where a transfer requires a legal safeguard, we use an applicable permitted mechanism, such as an adequacy decision or contractual protections, and additional measures where required. Contact <PrivacyContact /> for information about the safeguards applicable to your information. We do not promise storage exclusively in Israel or any other single country.</p>
  </> },
  { id: "rights", title: "Your rights and choices", content: <>
    <p>Under applicable Israeli law, you may request access to personal information held about you and correction of information that is incorrect, incomplete, unclear, or out of date, including deletion where the law provides it. If EEA, UK, or other privacy laws apply, you may also have rights to erasure, restriction, portability, objection to certain processing, withdrawal of consent, and review of certain automated decisions. These rights depend on the law and circumstances.</p>
    <p>Email <PrivacyContact /> or use our <Link href="/contact">contact form</Link>, identifying the account and request. We may ask for proportionate verification and will respond within the period required by applicable law. Do not send passwords or broker keys. You can also update available account settings, disconnect integrations, remove local content, and choose what to upload or share.</p>
    <p>You may complain to the <a href="https://www.gov.il/en/departments/the_privacy_protection_authority/govil-landing-page">Israeli Privacy Protection Authority</a> or the relevant authority where you live or work. You do not have to contact us before exercising that right. We will not deny rights you have under law because you make a privacy request.</p>
  </> },
  { id: "children-changes", title: "Age limits and policy updates", content: <>
    <p>QuantStation is intended for adults aged 18 or older who can lawfully use the services. We do not knowingly collect children’s personal information. Contact us if you believe a child has provided it.</p>
    <p>We may update this policy as services or requirements change. The date above identifies the latest revision. For material changes, we will provide additional notice as required and obtain consent when required. The <Link href="/cookies">Cookie Policy</Link> describes device storage and monitoring, and the <Link href="/terms">Terms of Service</Link> cover use of the platform.</p>
  </> },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy" introduction="How information moves through QuantStation, why we use it, and the choices available to you." summary="Your workstation stores substantial content locally. Account services, broker connections, uploads, AI requests, and sharing involve online processing. You choose which optional features and content to use." sections={sections} />;
}
