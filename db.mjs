import { neon } from "@neondatabase/serverless";

// Choose database URL based on environment
const isDevelopment = process.env.NODE_ENV === "development";
const databaseUrl = isDevelopment 
  ? process.env.POSTGRES_URL_DEV 
  : process.env.POSTGRES_URL;

if (!databaseUrl) {
  const envVar = isDevelopment ? "POSTGRES_URL_DEV" : "POSTGRES_URL";
  throw new Error(`${envVar} environment variable is not set`);
}

console.log(`🔗 Connecting to ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'} database`);

export const db = neon(databaseUrl, {
  fetchOptions: {
    cache: "no-store",
  },
});
