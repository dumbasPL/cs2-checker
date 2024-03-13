import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from '../../server/src/server';
// eslint-disable-next-line import/no-unresolved
import { ipcLink } from "electron-trpc/renderer";

const isElectron = 'electronTRPC' in window;

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    isElectron ? ipcLink() : httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

export default trpc;