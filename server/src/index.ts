import { createHTTPServer  } from "@trpc/server/adapters/standalone";
import { appRouter } from './server';
import cors from 'cors';

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(3000);