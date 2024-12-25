import { integer, text, timestamp, pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";

export type FormsInsert = InferInsertModel<typeof forms>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  dbUserId: varchar("db_user_id").notNull().unique(),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  formId: varchar("form_id", { length: 256 }).notNull(),
  description: text("description").notNull(),
  formLink: text("form_link").notNull(),
  editFormLink: text("edit_form_link").default(""),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  forms: many(forms),
}));

export const formsRelations = relations(forms, ({ one }) => ({
  user: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }),
}));