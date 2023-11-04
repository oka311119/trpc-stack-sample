import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";
import cors from "@fastify/cors";

export const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

server.register(cors, {
  // Set the Access-Control-Allow-Origin header
  origin: "http://localhost:3000", // Adjust this to match the client's URL
  methods: ["GET", "PUT", "POST", "DELETE"], // Specify the allowed HTTP methods
  // Additional configurations can be added here if needed
});

// server.get("/", (request, reply) => reply.send({ hello: "world!!" }));

if (require.main === module) {
  // called directly i.e. "node app"
  server.listen({ port: 3001 }, (err?: any) => {
    if (err) console.error(err);
    console.log("server listening on 3001");
  });
}
