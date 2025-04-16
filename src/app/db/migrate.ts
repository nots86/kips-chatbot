import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 });

async function main(){
    await migrate(drizzle(migrationClient), {
        migrationsFolder: "./src/app/db/migrations"
        
    })
    
        
    await migrationClient.end()
    console.log("Migration completed successfully.");
}
main() // call the main function