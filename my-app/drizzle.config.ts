import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

// Construct an absolute path to your .env.local file
const envPath = path.resolve(process.cwd(), ".env.local");

// Load the environment variables from that specific file
dotenv.config({ path: envPath });

// --- DEBUGGING LINE ---
// This will print the database URL to your terminal.
// If it prints "undefined", the problem is the .env.local file itself.
console.log("Reading DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});

