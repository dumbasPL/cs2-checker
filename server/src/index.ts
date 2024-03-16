import "dotenv/config";
import { createHTTPServer  } from "@trpc/server/adapters/standalone";
import { initDb, appRouter } from './server';
import cors from 'cors';

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(), // FIXME: dev only
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const hostname = process.env.LISTEN_HOST || "localhost";

async function main() {
  await initDb(process.env.DB_PATH || "./dev.db");
  server.listen(port, hostname);
  console.log("Server started on http://localhost:3000");
}

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Shutting down...");
  server.server.close(() => {
    console.log("Server shut down");
    process.exit(0);
  });
});

main();
