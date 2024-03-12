import prisma from './prisma';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  tagList: publicProcedure
    .input(z.object({}))
    .query(async () => {
      const tags = await prisma.tag.findMany();
      return tags;
    }),
  tagCreate: publicProcedure
    .input(z.object({name: z.string(), color: z.string().regex(/^#[0-9A-Fa-f]{6}$/)}))
    .mutation(async opts => {
      const tag = await prisma.tag.create({data: opts.input});
      return tag;
    }),
  tagDelete: publicProcedure
    .input(z.object({id: z.number()}))
    .mutation(async opts => {
      await prisma.tag.delete({where: {id: opts.input.id}});
      return null;
    }),
});
 
export type AppRouter = typeof appRouter;