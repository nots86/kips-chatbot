import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const envPath = resolve(process.cwd(), '.env');
config({ path: envPath });

// Verify environment variable is loaded correctly
console.log('DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env file');
}

export default defineConfig({
    schema: "./src/app/db/schema.ts",
    out: "./src/app/db/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL as string
    },
    verbose: true, // print all SQL statements prior to execution
    strict: true, // Ask questions before any changes, to make sure
    dialect: "postgresql"
});

