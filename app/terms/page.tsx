import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, SupportContact, type LegalSection } from "../components/LegalPage";
import { legalIdentity } from "../lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using QuantStation, including trading risks, software licensing, AI, subscriptions, cancellation, and the 14-day refund policy.",
};

const sections: LegalSection[] = [
  { id: "agreement", title: "Your agreement with QuantStation", content: <>
    <p>These Terms govern the QuantStation website, desktop software, and related services supplied by {legalIdentity.company}, based in Israel (“QuantStation”, “we”, or “us”). By accepting these Terms when registering, purchasing, installing, or using a service that presents them for acceptance, you agree to them. If you do not agree, do not proceed with that service.</p>
    <p>You must be at least 18, have capacity to enter an agreement, and be permitted to use the services and your connected providers in your location. If acting for an organization, you confirm authority to bind it. Our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookie Policy</Link> explain information handling; accepting these Terms does not replace any separate consent required by law.</p>
  </> },
  { id: "service", title: "What the service provides", content: <>
    <p>QuantStation provides software for developing strategies and indicators, importing market data, backtesting, optimization, simulation, reporting, journaling, AI-assisted research, and connecting supported trading accounts. Certain versions or plans also provide remote asset storage, community features, or connections to external AI clients.</p>
    <p>Features depend on your version, plan, hardware, permissions, supported integrations, and third-party availability. Preview screens, sample strategies, roadmap items, simulated results, and marketplace demonstrations do not guarantee a released feature, completed purchase, or future delivery. An access request is not a paid subscription.</p>
  </> },
  { id: "trading-risk", title: "Trading risk and your decisions", content: <>
    <p><strong>Trading can result in substantial loss, including more than your initial deposit when leverage or a product’s terms allow it. No strategy, simulation, AI answer, risk control, or past performance guarantees a profit or prevents loss.</strong></p>
    <p>QuantStation supplies technology, not personalized investment, financial, legal, or tax advice. We do not act as your broker, investment adviser, portfolio manager, exchange, or custodian through these services. Brokerage accounts and trading funds remain with your chosen providers. You are responsible for deciding whether a trade, instrument, strategy, or provider is appropriate for you.</p>
    <p>Backtests, optimization results, Monte Carlo analysis, paper trading, and other hypothetical results have limitations. They may reflect overfitting, incomplete data, look-ahead or selection bias, assumptions about fills, and costs or market conditions that differ from live trading. Rankings, examples, and reported performance are not endorsements or predictions.</p>
  </> },
  { id: "execution", title: "Accounts, connections, and live execution", content: <>
    <p>Provide accurate account information, protect your credentials and device, and use only accounts and data you are authorized to access. Notify us promptly at <SupportContact /> about unauthorized use. You are responsible for people and external tools to whom you grant access.</p>
    <p>Connecting a broker authorizes the services to access that connection as needed to provide the features you request. Orders, group or batch actions, smart orders, and automated strategies can affect real positions. Check account selection, live versus simulated mode, order size, timing, permissions, and risk settings before enabling them.</p>
    <p>Network failures, delayed data, rejected orders, partial fills, slippage, platform errors, or provider outages can prevent intended actions. Stop-losses and risk controls may not execute as expected. Closing the desktop app, disconnecting a session, canceling your subscription, or deleting an account does not necessarily cancel broker orders, close positions, or stop instructions already running elsewhere. Confirm order and position state directly with your broker and maintain an independent way to manage them.</p>
    <p>Comply with exchange, broker, proprietary-trading-firm, market-data, and jurisdictional rules, including account authorization and any restrictions on automated or copied trading.</p>
  </> },
  { id: "license", title: "Software license and acceptable use", content: <>
    <p>Subject to these Terms and your plan, we grant you a limited, non-exclusive, non-transferable license to use QuantStation for your own authorized purposes. We and our licensors retain rights in the platform, branding, and supplied materials. Open-source components remain subject to their own licenses.</p>
    <p>You must not misuse the services, bypass authentication, subscription or usage limits, access another user’s information, interfere with service security, introduce malicious code, infringe others’ rights, manipulate markets, or use the platform for fraud or unlawful activity. You must not resell access or redistribute our proprietary software without permission. Restrictions do not prevent rights to interoperability, security research, or other uses that applicable law makes non-excludable.</p>
    <p>You are responsible for inspecting scripts, Python and Rust code, plugins, external executables, and downloaded strategies before running them. Process isolation and validation reduce some risks but do not establish that untrusted code is safe.</p>
  </> },
  { id: "your-content", title: "Your content and shared material", content: <>
    <p>You retain your rights in the strategies, code, datasets, notes, recordings, and other content you provide. You grant us a limited permission to host, transmit, reproduce, process, and display that content only as needed to provide requested features, maintain and secure the service, and comply with law. Sharing or AI requests require corresponding transmission to the recipients described in the Privacy Policy.</p>
    <p>You must have permission to upload, process, record, and share the material, including market-data licenses and any required consent from people recorded. Do not share confidential information or licensed data outside the permissions you hold. Uploading content does not transfer ownership to us or grant other users a general resale license.</p>
    <p>Public and community contributions must be lawful, accurately presented, and respectful of others’ rights. We may restrict or remove content or access for abuse, infringement, or security reasons. You may contact support to contest a restriction. Other users may retain copies of material you previously shared.</p>
  </> },
  { id: "ai", title: "AI and external tools", content: <>
    <p>AI responses can be incorrect, incomplete, non-unique, or unsuitable for your intended market or execution environment. Review generated code, strategy assumptions, order behavior, and reports independently, and test before live use. AI review or successful compilation does not establish financial suitability, legal compliance, safety, or profitability.</p>
    <p>Hosted AI is subject to plan access and daily or monthly allowances. Multiple stages, reviews, retries, reasoning, and interrupted requests may consume or reserve allowance. Allowances are service limits, not cash balances or funds redeemable for money. Model availability and supported inputs can change.</p>
    <p>When you select a provider using your own API key, its charges and terms apply separately. An external MCP or AI client may read permitted workspace context and perform supported actions within the access you enable. Review those permissions and the provider’s privacy terms. We do not guarantee exclusive ownership or freedom from third-party rights in AI output.</p>
  </> },
  { id: "billing", title: "Plans, prices, and recurring billing", content: <>
    <p>The checkout or written order specifies the price, currency, billing period, taxes, included features, limits, and any trial or renewal terms before you purchase. You authorize only the charges and recurring arrangement you accept there. A trial will convert to a paid plan only where that conversion and its price were disclosed and agreed.</p>
    <p>For auto-renewing subscriptions, billing repeats at the interval shown at checkout until canceled. Lemon Squeezy may process the purchase; the checkout and receipt identify the seller or merchant of record and applicable payment terms. Broker commissions, exchange fees, data subscriptions, external AI charges, and other third-party costs are separate unless explicitly included.</p>
    <p>We will give advance notice of a price increase before it applies to a later billing period, with an opportunity to cancel. We will obtain additional agreement where required. Nonpayment, refund, or expiry may reduce paid entitlements. We will not apply a new price retroactively to an already paid period.</p>
  </> },
  { id: "cancellation-refunds", title: "Cancellation and 14-day refunds", content: <>
    <p><strong>You may request a full refund of a QuantStation subscription charge within 14 calendar days of your initial purchase or any renewal, without giving a reason.</strong> This voluntary policy applies to monthly and annual subscriptions purchased from us or through our designated checkout, even if you have used the subscription. We do not deduct a cancellation fee under this policy.</p>
    <p>To cancel or request a refund, email <SupportContact /> or send a <Link href="/contact">contact request</Link> stating your account email and, if available, the order or invoice reference. Do not send payment-card details. You may also use the cancellation control in your payment provider’s customer portal when available. Requests are effective when received, rather than when support replies.</p>
    <p>Canceling stops future renewals. Unless you request an earlier end, receive a refund, or applicable law requires otherwise, access continues through the paid period. A full refund ends the paid entitlement for the refunded period. We will arrange eligible refunds to the original payment method within 14 calendar days of receiving the request, or sooner if required by law; your payment provider may take additional time to display the credit.</p>
    <p>Outside the 14-day window, ordinary cancellation does not create a prorated refund under this voluntary policy. You may still be entitled to a refund, proportional reimbursement, cancellation, or other remedy under applicable law, including for defective or unavailable services. Contact us to resolve billing errors or service problems.</p>
    <p>This policy does not reimburse trading losses, broker or exchange fees, market-data purchases, or charges billed independently by external AI or other providers. A separately negotiated business order may specify different voluntary refund terms only if explicitly agreed before purchase. Nothing here limits mandatory consumer rights, including any longer cancellation period, earlier termination right, or additional cancellation method available under Israeli law or the law that applies to you.</p>
  </> },
  { id: "third-parties", title: "Third-party services and availability", content: <>
    <p>Brokers, market-data vendors, payment processors, hosting providers, AI providers, and external tools operate under their own agreements. Their availability, fees, permissions, and data accuracy are outside our direct control. Mentioning an integration does not imply sponsorship or a guarantee of continued compatibility.</p>
    <p>We may update the software, change integrations, or perform maintenance. We will provide notice of material reductions to paid services where reasonably practicable and any remedy required by law. Preview or beta features may change or be withdrawn; do not rely on them for uninterrupted operation.</p>
  </> },
  { id: "termination", title: "Suspension, termination, and your files", content: <>
    <p>You may stop using the software and request account closure through support. Cancel recurring billing separately or ask us to do so with your closure request. Before closing an account, manage open orders directly with your broker and export files you need.</p>
    <p>We may suspend or terminate access for material breach, nonpayment, fraud, security threats, or legal requirements. Where appropriate, we will explain the reason and provide a reasonable opportunity to resolve it; urgent security or legal situations may require immediate action. If we discontinue a paid service without a breach by you, we will refund the unused prepaid period.</p>
    <p>Cloud storage and account closure do not erase local copies, external backups, or records retained lawfully by us or third parties. The Privacy Policy explains deletion requests. Terms that by their nature need to continue, including ownership, payment obligations already incurred, and dispute provisions, survive termination.</p>
  </> },
  { id: "liability", title: "Warranties and responsibility for loss", content: <>
    <p>To the extent permitted by applicable law, the services are provided on an “as is” and “as available” basis. We do not promise uninterrupted or error-free operation, accurate market data, successful execution, or profitable strategies. You are responsible for reasonable precautions, backups, testing, and supervision of your trading activity.</p>
    <p>To the extent legally permitted, we are not responsible for indirect or consequential loss, lost profits or opportunities, or losses caused by your trading decisions, unauthorized modifications, or independent third-party failures. This does not exclude responsibility that applicable law places on us for our own acts or omissions.</p>
    <p>Nothing in these Terms excludes or limits liability for fraud, willful misconduct, gross negligence where it cannot lawfully be excluded, death or personal injury caused by negligence where applicable, or any statutory consumer guarantee or other liability that cannot be excluded or limited. Mandatory remedies remain available.</p>
  </> },
  { id: "law", title: "Governing law and disputes", content: <>
    <p>These Terms are governed by the laws of Israel, subject to mandatory protections that apply to you in your country of residence. Courts in Israel have jurisdiction where permitted by law; this does not prevent a consumer from using a court or dispute-resolution route available under mandatory local law.</p>
    <p>Please contact <SupportContact /> with a description of a dispute so we can try to resolve it. Doing so is not a condition for exercising statutory rights and does not shorten legal time limits. These Terms do not impose mandatory arbitration or a waiver of non-waivable collective remedies.</p>
  </> },
  { id: "changes-contact", title: "Changes and contact", content: <>
    <p>We may revise these Terms and will update the date above. Material changes will be communicated in advance where required; changes will not retrospectively alter an existing dispute or remove accrued rights. Where law requires acceptance of a change, we will request it. If you do not accept a prospective change, you may stop using the affected service and cancel renewal.</p>
    <p>If a provision cannot be enforced, the remaining provisions continue to the extent permitted by law. A failure to enforce a provision immediately is not a waiver. A separately signed order controls only where it expressly varies these Terms and may not remove mandatory protections.</p>
    <p>For service, billing, cancellation, or legal inquiries, contact {legalIdentity.company}, Israel, at <SupportContact /> or through our <Link href="/contact">contact form</Link>.</p>
  </> },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" path="/terms" introduction="The terms for using QuantStation’s software, research tools, and connected services." summary="You control your strategies and trading decisions. Subscriptions follow the checkout terms, renewals can be canceled, and subscription purchases and renewals include a 14-day full-refund window. Mandatory consumer rights always remain available." sections={sections} />;
}
