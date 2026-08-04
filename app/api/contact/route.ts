const interests = new Set(["General", "Access", "Plans", "Security", "Starter", "Pro", "Premium", "Elite", "Privateer", "Partnership"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  interest?: unknown;
  message?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) return Response.json({ error: "The request is too large." }, { status: 413 });

    const payload = (await request.json()) as ContactPayload;
    if (text(payload.website, 200)) return Response.json({ ok: true }, { status: 201 });

    const name = text(payload.name, 100);
    const email = text(payload.email, 160).toLowerCase();
    const company = text(payload.company, 120);
    const interest = text(payload.interest, 40);
    const message = text(payload.message, 2_000);

    if (name.length < 2) return Response.json({ error: "Please enter your full name." }, { status: 400 });
    if (!emailPattern.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!interests.has(interest)) return Response.json({ error: "Please select a valid topic." }, { status: 400 });
    if (message.length < 10) return Response.json({ error: "Please add a little more context." }, { status: 400 });

    const [{ env }, { getDb }, { contactRequests }] = await Promise.all([
      import("cloudflare:workers"),
      import("../../../db"),
      import("../../../db/schema"),
    ]);
    await ensureSchema(env.DB);
    const id = crypto.randomUUID();
    await getDb().insert(contactRequests).values({ id, name, email, company, interest, message, createdAt: new Date() });
    return Response.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof SyntaxError ? "Please submit valid form data." : "The request could not be saved. Please try again.";
    return Response.json({ error: message }, { status: error instanceof SyntaxError ? 400 : 500 });
  }
}

function text(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

async function ensureSchema(database: D1Database) {
  if (!database) throw new Error("D1 binding DB is unavailable");
  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS contact_requests (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      interest TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )`),
    database.prepare("CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests (created_at)"),
  ]);
  await database.prepare("PRAGMA optimize").run();
}
