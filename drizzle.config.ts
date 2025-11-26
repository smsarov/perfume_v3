import { defineConfig } from "drizzle-kit";
import "dotenv-flow/config";

const url = process.env.DATABASE_URL!;

export default defineConfig({
  out: "./packages/shared/db/drizzle",
  schema: "./packages/shared/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url }
});
