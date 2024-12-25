import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
  const connectionString = process.env.DATABASE_URL || "postgres://admin:admin@localhost:5432/formbuilder"

const client = postgres(connectionString);
export const db = drizzle(client, { schema });