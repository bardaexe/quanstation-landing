import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contactRequests = sqliteTable(
  "contact_requests",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company").notNull().default(""),
    interest: text("interest").notNull(),
    message: text("message").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [index("idx_contact_requests_created_at").on(table.createdAt)],
);
