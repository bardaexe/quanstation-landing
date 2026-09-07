import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, PrivacyContact, type LegalSection } from "../components/LegalPage";
import { legalIdentity } from "../lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookies, desktop local storage, Firebase app verification, and performance monitoring used with QuantStation, with information about your controls.",
};

const sections: LegalSection[] = [
  { id: "scope", title: "Cookies and similar technologies", content: <>
    <p>This policy explains device storage and related technologies used with services operated by {legalIdentity.company}, Israel. Read it with our <Link href="/privacy">Privacy Policy</Link>.</p>
    <p>Cookies are small values a website stores in your browser and may receive with later requests. Local storage and IndexedDB keep preferences or larger records on a device. Session storage generally lasts for a browsing or app session. The desktop app can use these browser technologies inside its embedded webview, as well as ordinary files, local databases, and operating-system credential storage.</p>
    <p>Some storage supports a feature you request, such as saving a workspace or verifying a session. Performance measurement has a different purpose. Device storage is not automatically advertising, and the fact that it stays on a device does not establish that a related feature never transmits data.</p>
  </> },
  { id: "website", title: "The public website", content: <>
    <p>The current QuantStation landing website does not set application cookies or use local storage or IndexedDB for visitor tracking. It does not include advertising pixels, behavioral analytics, session replay, or embedded social-media trackers. Its contact form submits your message to our server and uses a hidden field to help identify spam; that field does not set a tracking cookie.</p>
    <p>Your browser may cache images, fonts, styles, and scripts to load pages efficiently. Website hosts receive ordinary connection information and may apply infrastructure-level security technologies depending on the deployment. The desktop technologies below are not loaded simply because you visit this website.</p>
    <p>There is currently no optional website tracking to accept or reject, so this site does not present an “accept all” banner. If we introduce optional tracking, we will update this policy and provide any required choice before enabling it. Continuing to browse is not treated as consent to optional tracking.</p>
  </> },
  { id: "desktop", title: "Desktop storage inventory", content: <>
    <p>The following describes the desktop application. Storage marked persistent has no automatic browser-style expiry unless the feature removes or replaces it; it may survive restarting or signing out of the app.</p>
    <ul>
      <li><strong>Workspace preferences — QuantStation, local storage.</strong> Keys such as <code>quantstation:rail</code> remember navigation layout. Report and simulation preferences, demo-data choices, and marketplace preview state remember your selections. These persist until changed or cleared; the app does not impose a fixed expiry on these preferences.</li>
      <li><strong>Temporary navigation — QuantStation, session storage.</strong> Keys such as <code>quantstation:quant-ai-open</code>, <code>quantstation:guide-return</code>, and notebook or Blueprint navigation keys restore a panel or carry a navigation request. They are removed when consumed, updated, or when the webview session ends.</li>
      <li><strong>AI conversation history — QuantStation, local storage.</strong> Account-scoped keys beginning <code>quantstation:quant-ai-history</code> retain conversations for display and continuation. Pending-run records support recovery. They remain until replaced, removed, or app storage is cleared; history limits may also remove older entries.</li>
      <li><strong>AI attachments — QuantStation, IndexedDB.</strong> The <code>quantstation-ai-attachments</code> database holds files attached to conversations so they can be reused or retried. It is persistent storage, with no fixed time-based expiry. Sending a request transmits its attachments to the selected AI service.</li>
      <li><strong>Local automation preference — QuantStation, local storage.</strong> A saved preference remembers whether optional desktop automation is enabled. It remains until changed or cleared. External clients have their own storage and processing behavior.</li>
      <li><strong>Private files and credentials — QuantStation and your operating system.</strong> Research databases, reports, notes, recordings, backups, and credential-manager entries support the desktop functions you select. They have their own file or credential lifecycle and are not website cookies.</li>
    </ul>
  </> },
  { id: "firebase", title: "App verification and performance monitoring", content: <>
    <h3>Google Firebase App Check and reCAPTCHA</h3>
    <p>Configured desktop builds use Firebase App Check with reCAPTCHA v3 to help verify legitimate requests to protected AI services. Google may process device, browser, network, and interaction signals and store app-verification information. reCAPTCHA sets the <code>_GRECAPTCHA</code> cookie when it runs for risk analysis; other Google storage may depend on the domain and provider configuration. Cookie expiry is set by Google and can be inspected in the browser or webview’s storage details. Verification tokens expire and are refreshed by the SDK.</p>
    <p>Blocking verification storage or requests can prevent protected features from working. See Google’s <a href="https://developers.google.com/recaptcha/docs/faq">reCAPTCHA FAQ</a>, <a href="https://policies.google.com/privacy">Privacy Policy</a>, and <a href="https://policies.google.com/terms">Terms of Service</a>.</p>
    <h3>Google Firebase Performance Monitoring</h3>
    <p>The desktop application initializes Firebase Performance Monitoring to measure network requests and app performance. The SDK may use Firebase installation identifiers and browser storage and collect technical information such as timings, response codes, URLs, device or app details, and IP-related information. This is performance measurement; it is separate from saving your research files and from advertising.</p>
    <p>The current desktop application does not expose a dedicated performance-monitoring consent switch. This policy does not itself provide consent or imply that an opt-out control exists. If this affects your choice to use the desktop app, contact <PrivacyContact /> before using it. The public landing website does not initialize this SDK.</p>
    <p>Google describes retention of IP-associated performance events for 30 days and installation-associated or de-identified performance data for 60 days before its removal process starts. Those are provider-side retention periods, not expiry dates for local storage. See <a href="https://firebase.google.com/support/privacy">Firebase privacy and retention information</a>.</p>
  </> },
  { id: "external", title: "External checkout and connected services", content: <>
    <p>Opening a payment checkout, broker login, provider website, or external AI client may cause that service to use its own cookies, device storage, and security tools. These do not become QuantStation landing-site cookies merely because we link to the service. The provider’s own notice and settings explain its storage, duration, and choices.</p>
    <p>Hosted AI monitoring and server logs are described in the Privacy Policy. Clearing browser cookies does not delete prompts, uploaded files, billing records, or trading data already processed by a server or external provider.</p>
  </> },
  { id: "controls", title: "Managing storage and choices", content: <>
    <p>Use your browser’s privacy settings to inspect, block, or remove cookies and site data. Browser controls for the public website generally do not clear the installed desktop app’s separate webview, files, or credential manager. Use available desktop feature controls to change preferences, remove content, disconnect integrations, or disable local automation.</p>
    <p>Back up or export content before clearing desktop data: deleting local storage or IndexedDB can remove conversation history, attachments, and preferences. It does not cancel a subscription or close broker positions. Sign-out and uninstallation may leave files or credential entries on the device.</p>
    <p>Where applicable law requires consent for a technology, that consent must be obtained through an appropriate choice; reading this policy is not consent. We do not sell information or share it for cross-context behavioral advertising, so there is no such website activity for a Global Privacy Control signal to opt out of. Browser Do Not Track settings do not currently change the desktop processing described here.</p>
    <p>For help with storage, privacy rights, or this policy, contact <PrivacyContact /> or use our <Link href="/contact">contact form</Link>. Updates will carry a new revision date and any additional notice required by law.</p>
  </> },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" path="/cookies" introduction="What the website and desktop app store on your device, and how that differs from online processing." summary="The landing website has no application tracking cookies or advertising pixels. The desktop app uses persistent preferences and AI history, plus Firebase verification and performance technologies. Their purposes and available controls are explained separately below." sections={sections} />;
}
