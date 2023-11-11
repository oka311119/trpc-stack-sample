import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";
import cors from "@fastify/cors";

require("dotenv").config();
const corsOrigin = process.env.CORS_ORIGIN || "";

export const server = fastify();

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

server.register(cors, {
  origin: [corsOrigin, "http://localhost:3000"],
  methods: ["GET", "POST"],
});

if (require.main === module) {
  server.listen({ port: 3001 }, (err?: any) => {
    if (err) console.error(err);
    console.log("server listening on 3001");
  });
}
