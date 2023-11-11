import { initTRPC } from "@trpc/server";
import { z } from "zod";

export type User = {
  id: string;
  name: string;
};

export const t = initTRPC.create();

export const appRouter = t.router({
  getUserById: t.procedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .query((opts) => {
      const user: User = { id: "1", name: "jone doe" };
      return user;
    }),
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
      })
    )
    .mutation((opts) => {
      const id = Date.now().toString();
      return { id, ...opts.input };
    }),
});

export type AppRouter = typeof appRouter;
