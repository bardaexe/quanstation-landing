# Legal policy implementation notes

Reviewed September 8, 2026. This is an internal source and launch-review record,
not a fourth public policy and not a legal opinion.

## Owner decisions

- Operator: **Barda Developments (dba, QuantStation)**, based in **Israel**.
- The owner requested that no street address appear in the policies.
- The owner authorized selecting `@quantstation.net` contact addresses and a
  refund policy. Selected `privacy@quantstation.net` and
  `support@quantstation.net`; neither mailbox was confirmed operational.
- Voluntary full refund within 14 calendar days of each initial subscription
  charge or renewal, including annual plans and used subscriptions. No
  cancellation fee. Ordinary cancellation stops renewal and preserves the paid
  period unless refunded, an earlier end is requested, or law requires otherwise.
- Initiate eligible refunds within 14 calendar days of receipt, or sooner where
  required. Mandatory consumer remedies override narrower voluntary provisions.
- Israeli governing law with mandatory local consumer protections preserved;
  no mandatory arbitration or exclusive consumer forum.

## Repository evidence

All six top-level workspace folders were considered. Review concentrated on
source, schemas, service documentation, and integrations; dependency trees,
compiled outputs, secret files, and raw market-data archive contents were not
treated as product requirements.

| Area | Sources inspected | Policy consequence |
| --- | --- | --- |
| Landing website | `app/layout.tsx`, `app/components/ContactForm.tsx`, `app/api/contact/route.ts`, `db/schema.ts`, `worker/index.ts`, package and hosting files, README | Name/email/company/topic/message and submission metadata; D1 or configured support delivery; no application tracking scripts or browser storage in website source. Hosting-layer behavior still needs deployed verification. |
| Desktop | `../quantstation-app/README.md`, `AGENTS.md`, docs, services, types, settings and storage call sites | Local files and research, trading, optional recordings/transcription, MCP, and external tools. Describe configured features without promising that every preview is available. |
| Desktop auth and cloud | `src/services/auth.ts`, `src/types/auth.ts`, `src/lib/firebase.ts`, `firestore.rules`, `storage.rules`, `functions/src/index.ts` | Firebase identities/profiles/entitlements; trusted cloud access; account deletion by request rather than a nonexistent self-service control. |
| Desktop browser storage | `src/layouts/AppLayout.tsx`, `src/lib/quant-ai-history.ts`, `quant-ai-runtime.ts`, `quant-ai-attachments.ts`, `src/contexts/DemoDataContext.tsx`, `src/pages/ReportsPage.tsx`, `SettingsPage.tsx`, `src/services/marketplace.ts` | Persistent preferences and history, session navigation, IndexedDB attachments. Avoid claiming sign-out deletes all local content or listing server TTLs as deletion guarantees. |
| Monitoring | `src/lib/firebase.ts`, `docs/firebase-ai-logic.md` | Desktop initializes Firebase Performance Monitoring; configured App Check uses reCAPTCHA v3. AI monitoring can retain prompts/responses/summaries. No blanket no-telemetry or local-only-AI promise. |
| AI and billing | `functions/src/quant-ai.ts`, `quant-ai-lemon.ts`, `quant-ai-budget.ts`, `docs/firebase-ai-logic.md`, `docs/AI_MODEL_USAGE.md` | Google hosted AI; own-key OpenRouter forwarded through QuantStation; server checkpoints, metering and billing verification through Lemon Squeezy. Do not hardcode internal prices or model names into legal pages. |
| Backend | `../quantstation-backend/AGENTS.md`, README, `docs/trusted-quant-community-services.md`, migration inventory, broker/user schemas, service inventory | Broker tokens in AWS Secrets Manager; accounts/orders/risk/audits; PostgreSQL, Redis and S3; optional community and trading-derived aggregates. |
| Alternate desktop checkout | `../quantstation-app-remote-storage-delete/AGENTS.md`, README, remote-storage delete implementation in `functions/src/index.ts` | Separate checkout, not a separate legal service. Remote deletion does not establish account-wide erasure or removal of independent local copies. Current app source takes precedence for active features. |
| Other folders | `../Assets` and `../5 year lvl 2 data` file inventory | Brand images and historical NQ market-data archives. Address intellectual-property/data-license obligations; do not assume redistribution rights from possession of data files. |

## Before publication / paid launch

1. Activate and monitor both email addresses. Verify actual receipt of website
   contact submissions in the chosen deployment. A mailto link does not provision
   a mailbox; the existing contact form still needs a working D1 binding or
   configured delivery webhook.
2. Have Israeli counsel confirm legal-entity identification and disclosure
   obligations, including any address or registration details required elsewhere
   in a distance-sale disclosure or invoice. Omitting a street address here is
   the owner's request, not a conclusion that no address disclosure is required.
3. Implement the refund commitment operationally in Lemon Squeezy / support,
   including renewals, request receipt timestamps, tax handling, and refunds to
   the original method. Align checkout disclosures, billing portal, receipts,
   and cancellation methods with Israeli law and other target markets. These
   pages do not change the billing backend or execute refunds.
4. Present and record acceptance of the Terms at account creation / purchase
   where appropriate. Footer links and the contact-form privacy notice do not
   implement contract acceptance, marketing consent, or monitoring consent.
5. Resolve desktop performance-monitoring consent or another valid exception
   before distribution into markets that require consent for its device access.
   The app currently initializes `getPerformance(firebaseApp)` with no dedicated
   user control. The Cookie Policy discloses the current implementation; adding
   a policy is not a substitute for a required technical consent mechanism.
6. Verify deployed hosting cookies, SDK storage identifiers and expiry, and
   outbound requests in a fresh session, including App Check / reCAPTCHA and
   external checkout. The website statement is based on repository source, not
   a live scan of a production domain. Reconcile the cookie inventory if the
   host adds technologies or optional analytics are introduced.
7. Confirm AI monitoring access, content capture, retention, and provider
   data-use terms. Source documentation records enabled telemetry. Do not tell
   users prompts are never logged or that every external model has the same
   training or retention policy.
8. Establish category-specific hosted retention schedules, deletion handling,
   backup expiry, transfer safeguards and provider agreements; confirm actual
   deployment regions and the configured inquiry-delivery recipient. Current
   policies use purpose-based retention criteria instead of invented deletion
   deadlines or claims about unverified agreements and certifications.

## Implementation validation

The existing rendered-route suite includes all three policies. Vinext combines
route styles into a single stylesheet, so the aggregate CSS budget is increased
from 15 KiB to 16 KiB Brotli to accommodate the shared legal layout, mobile
navigation, and print rules. The JavaScript and motion-runtime limits are
unchanged. Native Next.js also prerenders the three pages. Browser checks cover
desktop policy navigation, the refund-section anchor, and the 390-pixel cookie
page layout.

## Primary references consulted

- [Israeli Privacy Protection Authority — Amendment 13 questions and answers](https://www.gov.il/he/pages/tikun13_qa)
- [Israeli government — distance-selling cancellation guide](https://www.gov.il/BlobFolder/generalpage/general_tuota/he/EN_Brushur_SITE.PDF)
- [Israeli Consumer Protection and Fair Trade Authority — complaints](https://www.gov.il/en/service/filing_a_complaint_to_fair_trade_authority)
- [EDPB — respect individuals' rights](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en)
- [ICO — cookies and privacy notices](https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/cookies-and-privacy-notices-in-detail/)
- [ICO — storage and access technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-storage-and-access-technologies/)
- [Firebase — privacy and retention](https://firebase.google.com/support/privacy)
- [Firebase — AI monitoring and captured content](https://firebase.google.com/docs/ai-logic/monitoring)
- [Google — reCAPTCHA FAQ](https://developers.google.com/recaptcha/docs/faq)

The voluntary refund policy is a business choice authorized by the owner. It is
not a claim that every software purchase has an identical statutory cancellation
right. The policies preserve applicable law and expressly state the service's
voluntary commitments.
