import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { hello: "world" };
});

export default server;
