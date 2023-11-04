import { initTRPC } from "@trpc/server";
import { z } from "zod";

type User = {
  id: string;
  name: string;
  bio?: string;
};

const users: Record<string, User> = {};

export const t = initTRPC.create();

export const appRouter = t.router({
  getUserById: t.procedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .query((opts) => {
      const user = { id: "1", name: "joen" };
      return user;
    }),
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
        bio: z.string().max(142).optional(),
      })
    )
    .mutation((opts) => {
      const id = Date.now().toString();
      const user: User = { id, ...opts.input };
      users[user.id] = user;
      return { id, ...opts.input };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
