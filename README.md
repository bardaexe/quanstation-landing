# QuantStation website

Public marketing website for the QuantStation systematic trading workstation.

## Stack

- React 19 and the Next App Router API through vinext
- TypeScript and Tailwind CSS 4
- Cloudflare Worker runtime
- Cloudflare D1 and Drizzle for contact requests

The public website is deliberately isolated from the QuantStation desktop and backend repositories.

## Routes

- `/` — landing page
- `/platform` — Research, Backtesting, Trading, and Report Lab
- `/pricing` — six-tier overview and comparison
- `/security` — local-first and trusted execution architecture
- `/resources` — guides, integrations, and FAQ
- `/contact` — persisted product, plan, security, and partnership inquiries

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
npm test
```

Generate a migration after changing `db/schema.ts`:

```bash
npm run db:generate
```

The D1 binding is declared as `DB` in `.openai/hosting.json`. The contact route validates input, ignores honeypot submissions, and stores legitimate requests in `contact_requests`.

## Content guardrails

- Paid plan prices are intentionally marked as launch access until authoritative pricing is supplied.
- Backtest and simulation examples are illustrative, never promises of future performance.
- Product and security claims should be reconciled with the current desktop/backend behavior before each public release.

