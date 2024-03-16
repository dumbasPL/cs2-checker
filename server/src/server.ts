import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { setupDb, migrateDb, db, Tag } from './db';

export async function initDb(filename: string) {
  setupDb(filename);
  await migrateDb();
}

export const appRouter = router({
  tagList: publicProcedure
    .input(z.object({}))
    .query(async () => {
      return await db<Tag>('Tag').select('*');
    }),
  tagCreate: publicProcedure
    .input(z.object({name: z.string()}))
    .mutation(async opts => {
      return await db<Tag>('Tag').insert({name: opts.input.name});
    }),
  tagDelete: publicProcedure
    .input(z.object({id: z.number()}))
    .mutation(async opts => {
      await db<Tag>('Tag').where('id', opts.input.id).delete();
      return null;
    }),
});

export type AppRouter = typeof appRouter;