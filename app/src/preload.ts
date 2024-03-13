// eslint-disable-next-line import/no-unresolved
import {exposeElectronTRPC} from "electron-trpc/main";

process.once('loaded', () => {
  exposeElectronTRPC();
});