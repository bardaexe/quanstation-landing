import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { brotliCompressSync } from "node:zlib";

const routes = [
  ["/", /From strategy idea to[\s\S]*trading decision[\s\S]*Signal relay[\s\S]*System ready/i, /Systematic trading, one workstation/i],
  ["/platform", /Everything you need to trade systematic ideas with context/i, /Platform — QuantStation/i],
  ["/pricing", /Start local[\s\S]*Scale with your process/i, /Pricing — QuantStation/i],
  ["/security", /clear trust boundaries/i, /Security — QuantStation/i],
  ["/resources", /Clarity before complexity/i, /Resources — QuantStation/i],
  ["/contact", /Tell us what you’re building toward/i, /Contact — QuantStation/i],
  ["/privacy", /What stays local and what goes online/i, /Privacy Policy — QuantStation/i],
  ["/terms", /Cancellation and 14-day refunds/i, /Terms of Service — QuantStation/i],
  ["/cookies", /Desktop storage inventory/i, /Cookie Policy — QuantStation/i],
];

async function worker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

function env() {
  return {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
}

const context = { waitUntil() {}, passThroughOnException() {} };

function renderedAnchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(([, attributes, content]) => ({
    href: attributes.match(/\bhref="([^"]+)"/i)?.[1],
    text: content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  }));
}

for (const [path, heading, title] of routes) {
  test(`server-renders ${path}`, async () => {
    const app = await worker();
    const response = await app.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env(), context);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, title);
    assert.match(html, /QuantStation/);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
  });
}

test("server-renders the FAQ without a client UI runtime", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/resources", { headers: { accept: "text/html" } }),
    env(),
    context,
  );
  const html = await response.text();
  assert.match(html, /<details[^>]+name="quantstation-faq"/i);
  assert.doesNotMatch(html, /@heroui|accordion__trigger/i);
});

test("server-renders the scroll telemetry as non-interactive decoration", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env(),
    context,
  );
  const html = await response.text();
  assert.match(html, /<div[^>]+aria-hidden="true"[^>]+class="scroll-progress"/i);
  assert.match(html, /data-section="01"[^>]+data-total="00"/i);
  assert.match(html, /og-monochrome\.png/i);
  assert.match(html, /Research\. Validate\. Execute\./i);
});

test("keeps the rendered header and home-page CTA destinations intact", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env(),
    context,
  );
  const anchors = renderedAnchors(await response.text());
  const expectedLinks = [
    ["QuantStation", "/"],
    ["Pricing", "/pricing"],
    ["Security", "/security"],
    ["Contact", "/contact"],
    ["Request access", "/contact?intent=access"],
    ["Explore platform", "/platform"],
    ["Explore security", "/security"],
    ["Compare all plans", "/pricing"],
    ["Talk to us", "/contact"],
  ];

  for (const [label, href] of expectedLinks) {
    assert.ok(
      anchors.some((anchor) => anchor.href === href && anchor.text.includes(label)),
      `expected rendered link "${label}" to point to ${href}`,
    );
  }
  assert.ok(
    anchors.every(({ href }) => href === "#main-content" || (href && !href.startsWith("#"))),
    "every rendered navigation anchor needs a destination",
  );
});

test("server-renders authentic app UI showcases without embedding the app runtime", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env(),
    context,
  );
  const html = await response.text();
  assert.match(html, /QuantStation Research workspace interface/i);
  assert.match(html, /Quant workspace[\s\S]*Workspaces[\s\S]*Desktop online[\s\S]*Quant trader[\s\S]*Run Context[\s\S]*Project Source/i);
  assert.match(html, /Collapse rail[\s\S]*Run Context[\s\S]*Compute Backend[\s\S]*Backtest Control[\s\S]*Out-of-sample equity[\s\S]*\+\$42,840[\s\S]*Completed[\s\S]*Backtest Queue[\s\S]*1,284 trades/i);
  assert.match(html, /Chart 01[\s\S]*15 sec[\s\S]*Market depth[\s\S]*Order entry[\s\S]*Orders &amp; fills[\s\S]*Risk rules[\s\S]*Smart orders[\s\S]*Alerts[\s\S]*Hotkeys[\s\S]*Strategy session[\s\S]*Recordings/i);
  assert.match(html, /Report library[\s\S]*EMA Cross v1[\s\S]*Import JSON[\s\S]*Run quality/i);
  assert.match(html, /Data[\s\S]*Strategy[\s\S]*Backtest[\s\S]*Pipeline[\s\S]*Validate[\s\S]*Results[\s\S]*AI Assistant/i);
  assert.match(html, /Periodical analysis[\s\S]*Settings &amp; diagnostics[\s\S]*Raw JSON[\s\S]*Prop simulation/i);
  assert.doesNotMatch(html, /<iframe\b/i);
});

test("keeps the motion runtime and client assets within performance budgets", async () => {
  const assetsDirectory = fileURLToPath(new URL("../dist/client/assets/", import.meta.url));
  const assetNames = await readdir(assetsDirectory);
  const javascriptNames = assetNames.filter((name) => name.endsWith(".js"));
  const stylesheetNames = assetNames.filter((name) => name.endsWith(".css"));
  const motionName = javascriptNames.find((name) => /MotionSystem/i.test(name));

  assert.ok(motionName, "expected a dedicated MotionSystem client chunk");

  const javascript = await Promise.all(javascriptNames.map((name) => readFile(`${assetsDirectory}/${name}`)));
  const stylesheets = await Promise.all(stylesheetNames.map((name) => readFile(`${assetsDirectory}/${name}`)));
  const motionSource = await readFile(`${assetsDirectory}/${motionName}`);
  const compressedSize = (contents) => brotliCompressSync(contents).byteLength;

  assert.ok(compressedSize(motionSource) <= 3_072, "MotionSystem exceeded 3 KiB Brotli");
  assert.ok(javascript.reduce((total, contents) => total + compressedSize(contents), 0) <= 98_304, "client JavaScript exceeded 96 KiB Brotli");
  // Vinext combines route CSS. Reserve 1 KiB for the three shared legal-page
  // layouts, mobile navigation, and print styles; keep JS budgets unchanged.
  assert.ok(stylesheets.reduce((total, contents) => total + compressedSize(contents), 0) <= 16_384, "stylesheets exceeded 16 KiB Brotli");
  assert.match(motionSource.toString(), /IntersectionObserver/);
  assert.match(motionSource.toString(), /requestAnimationFrame/);
  assert.doesNotMatch(motionSource.toString(), /setInterval/);
});

test("rejects invalid contact requests before persistence", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "A", email: "invalid", interest: "General", message: "short" }),
    }),
    env(),
    context,
  );
  assert.equal(response.status, 400);
  assert.match(await response.text(), /full name|valid email/i);
});

test("silently accepts honeypot spam without touching storage", async () => {
  const app = await worker();
  const response = await app.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ website: "https://spam.example", name: "Robot", email: "robot@example.com", interest: "General", message: "Automated message" }),
    }),
    env(),
    context,
  );
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
});

test("rejects malformed and oversized contact requests at the worker boundary", async () => {
  const app = await worker();
  const malformed = await app.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{ malformed",
    }),
    env(),
    context,
  );
  assert.equal(malformed.status, 400);
  assert.deepEqual(await malformed.json(), { error: "Please submit valid form data." });

  const oversized = await app.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "content-length": "12001" },
      body: JSON.stringify({ name: "Ada Lovelace", email: "ada@example.com", interest: "General", message: "A valid context." }),
    }),
    env(),
    context,
  );
  assert.equal(oversized.status, 413);
  assert.deepEqual(await oversized.json(), { error: "The request is too large." });
});
