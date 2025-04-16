// connect to database
// Database client instalisation

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema"
import postgres from "postgres";
import "dotenv/config"


// Create PostgreSQL client
const client = postgres(process.env.DATABASE_URL as string, {
    debug: (connection, query, params) => {
    console.log(query, params)
  }
})
// Initialize Drizzle ORM
export const db = drizzle(client, {schema, logger: true}) // Passing client and schema