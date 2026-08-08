import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../app/api/contact/route";
import { env as testEnv } from "./mocks/cloudflare-workers";

type FakeStatement = {
  sql: string;
  values: unknown[];
  bind: (...values: unknown[]) => FakeStatement;
  run: () => Promise<{ success: boolean }>;
};

type FakeD1Options = {
  failBatch?: boolean;
  failInsert?: boolean;
};

function createFakeD1(options: FakeD1Options = {}) {
  const statements: FakeStatement[] = [];
  let batchCalls = 0;

  const binding = {
    prepare(sql: string) {
      const statement: FakeStatement = {
        sql,
        values: [],
        bind(...values) {
          statement.values = values;
          return statement;
        },
        async run() {
          if (options.failInsert && /insert into ["`]contact_requests["`]/i.test(sql)) {
            throw new Error("fake D1 insert failed");
          }
          return { success: true };
        },
      };
      statements.push(statement);
      return statement;
    },
    async batch(batch: FakeStatement[]) {
      batchCalls += 1;
      if (options.failBatch) throw new Error("fake D1 schema setup failed");
      return batch.map(() => ({ success: true }));
    },
  } as unknown as D1Database;

  return {
    binding,
    get batchCalls() {
      return batchCalls;
    },
    statements,
  };
}

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  interest: "General",
  message: "A local validation workflow.",
};

function request(body: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

function jsonRequest(payload: Record<string, unknown>, headers: Record<string, string> = {}) {
  return request(JSON.stringify(payload), headers);
}

async function post(payload: Record<string, unknown>, headers?: Record<string, string>) {
  return POST(jsonRequest(payload, headers));
}

function insertStatement(statements: FakeStatement[]) {
  const statement = statements.find(({ sql }) => /insert into ["`]contact_requests["`]/i.test(sql));
  expect(statement, "expected a contact_requests insert statement").toBeDefined();
  return statement!;
}

describe("contact API route", () => {
  beforeEach(() => {
    testEnv.DB = undefined;
    vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "contact-test-id") });
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    testEnv.DB = undefined;
    vi.unstubAllEnvs();
  });

  it("rejects malformed JSON with a client error", async () => {
    const response = await POST(request("{ malformed"));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Please submit valid form data." });
  });

  it("rejects a payload over the request-size limit before persistence", async () => {
    const fakeD1 = createFakeD1();
    testEnv.DB = fakeD1.binding;

    const response = await post(validPayload, { "content-length": "12001" });

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "The request is too large." });
    expect(fakeD1.batchCalls).toBe(0);
    expect(fakeD1.statements).toHaveLength(0);
  });

  it.each([
    ["one-character name", { name: "A" }, "Please enter your full name."],
    ["invalid email", { email: "not-an-email" }, "Please enter a valid email address."],
    ["invalid interest", { interest: "Not a topic" }, "Please select a valid topic."],
    ["nine-character message", { message: "123456789" }, "Please add a little more context."],
  ])("rejects the %s validation boundary", async (_label, overrides, error) => {
    const fakeD1 = createFakeD1();
    testEnv.DB = fakeD1.binding;

    const response = await post({ ...validPayload, ...overrides });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error });
    expect(fakeD1.batchCalls).toBe(0);
    expect(fakeD1.statements).toHaveLength(0);
  });

  it("accepts the minimum valid name and message lengths", async () => {
    const fakeD1 = createFakeD1();
    testEnv.DB = fakeD1.binding;

    const response = await post({ ...validPayload, name: "Jo", message: "1234567890" });

    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ ok: true, id: "contact-test-id" });
    expect(insertStatement(fakeD1.statements).values.slice(1, 6)).toEqual([
      "Jo",
      "ada@example.com",
      "Analytical Engines",
      "General",
      "1234567890",
    ]);
  });

  it("trims, lowercases, and caps stored field values at their route limits", async () => {
    const fakeD1 = createFakeD1();
    testEnv.DB = fakeD1.binding;

    const response = await post({
      name: ` ${"N".repeat(101)} `,
      email: `${"A".repeat(155)}@X.CO!`,
      company: ` ${"C".repeat(121)} `,
      interest: " General ",
      message: ` ${"M".repeat(2001)} `,
    });

    expect(response.status).toBe(201);
    const values = insertStatement(fakeD1.statements).values;
    expect(values.slice(1, 6)).toEqual([
      "N".repeat(100),
      `${"a".repeat(155)}@x.co`,
      "C".repeat(120),
      "General",
      "M".repeat(2000),
    ]);
  });

  it("persists a valid request through D1 and returns its id", async () => {
    const fakeD1 = createFakeD1();
    testEnv.DB = fakeD1.binding;

    const response = await post({
      name: " Ada Lovelace ",
      email: " ADA@EXAMPLE.COM ",
      company: " Analytical Engines ",
      interest: " General ",
      message: " A local validation workflow. ",
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true, id: "contact-test-id" });
    expect(fakeD1.batchCalls).toBe(1);
    expect(fakeD1.statements.some(({ sql }) => /create table if not exists contact_requests/i.test(sql))).toBe(true);
    expect(fakeD1.statements.some(({ sql }) => /create index if not exists idx_contact_requests_created_at/i.test(sql))).toBe(true);
    expect(insertStatement(fakeD1.statements).values.slice(1, 6)).toEqual([
      "Ada Lovelace",
      "ada@example.com",
      "Analytical Engines",
      "General",
      "A local validation workflow.",
    ]);
    expect(insertStatement(fakeD1.statements).values[6]).toEqual(expect.any(Number));
  });

  it("accepts honeypot submissions without touching D1", async () => {
    const fakeD1 = createFakeD1();
    testEnv.DB = fakeD1.binding;

    const response = await post({ ...validPayload, website: "https://spam.example" });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
    expect(fakeD1.batchCalls).toBe(0);
    expect(fakeD1.statements).toHaveLength(0);
  });

  it.each([
    ["schema setup", { failBatch: true }],
    ["contact insert", { failInsert: true }],
  ])("returns a server error when D1 fails during %s", async (_label, options) => {
    const fakeD1 = createFakeD1(options);
    testEnv.DB = fakeD1.binding;

    const response = await post(validPayload);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "The request could not be saved. Please try again." });
  });

  it("delivers a valid request to the webhook with the configured bearer secret", async () => {
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://hooks.example.test/contact");
    vi.stubEnv("CONTACT_WEBHOOK_SECRET", "test-secret");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await post({ ...validPayload, email: " ADA@EXAMPLE.COM " });

    expect(response.status).toBe(201);
    const result = await response.json();
    expect(result).toEqual({ ok: true, id: "contact-test-id" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://hooks.example.test/contact");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      authorization: "Bearer test-secret",
      "content-type": "application/json",
    });
    expect(JSON.parse(String(init.body))).toMatchObject({
      id: "contact-test-id",
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      interest: "General",
      message: "A local validation workflow.",
    });
    expect(JSON.parse(String(init.body)).createdAt).toEqual(expect.any(String));
  });

  it("omits the optional webhook authorization header when no secret is configured", async () => {
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://hooks.example.test/contact");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await post(validPayload);

    expect(response.status).toBe(201);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.headers).toEqual({ "content-type": "application/json" });
  });

  it.each([
    ["a non-success response", vi.fn().mockResolvedValue(new Response(null, { status: 503 }))],
    ["a network exception", vi.fn().mockRejectedValue(new Error("webhook unavailable"))],
  ])("returns a server error when webhook delivery fails through %s", async (_label, fetchMock) => {
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://hooks.example.test/contact");
    vi.stubGlobal("fetch", fetchMock);

    const response = await post(validPayload);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "The request could not be saved. Please try again." });
  });
});
