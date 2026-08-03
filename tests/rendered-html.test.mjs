import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", /From strategy idea to trading decision/i, /Systematic trading, one workstation/i],
  ["/platform", /Everything you need to trade systematic ideas with context/i, /Platform — QuantStation/i],
  ["/pricing", /Start local[\s\S]*Scale with your process/i, /Pricing — QuantStation/i],
  ["/security", /clear trust boundaries/i, /Security — QuantStation/i],
  ["/resources", /Clarity before complexity/i, /Resources — QuantStation/i],
  ["/contact", /Tell us what you’re building toward/i, /Contact — QuantStation/i],
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

