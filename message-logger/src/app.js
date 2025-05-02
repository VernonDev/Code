//const fastify = require("fastify")({ logger: true });
// const config = require("./config");
// const routes = require("./api/routes");
// const consumer = require("./consumers/messageConsumer");
// const path = require("path");
// const fastifyStatic = require("@fastify/static");

// Update your src/app.js to add schema validation support:

const fastify = require("fastify")({
  logger: true,
  ajv: {
    customOptions: {
      strict: false,
      // This will allow additional properties not defined in the schema
      additionalProperties: true,
    },
  },
});
const config = require("./config");
const routes = require("./api/routes");
const consumer = require("./consumers/messageConsumer");
const path = require("path");

// Register Swagger
fastify.register(require("@fastify/swagger"), {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Message Logger API",
      description: "API for logging messages using Kafka and PostgreSQL",
      version: "1.0.0",
    },
    host: `localhost:${config.server.port}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

// Register static file plugin for dashboard
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "api/static"),
  prefix: "/dashboard/",
});

// Add this route
fastify.get("/", (request, reply) => {
  reply.redirect("/dashboard/dashboard.html");
});

// Register routes
fastify.register(routes);

// Start server and consumer
const start = async () => {
  try {
    // Start Kafka consumer
    await consumer.start();

    // Start Fastify server
    await fastify.listen({
      port: config.server.port,
      host: "0.0.0.0",
    });

    console.log(`Server is running on http://localhost:${config.server.port}`);
    console.log(
      `API documentation: http://localhost:${config.server.port}/documentation`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle shutdown
const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await consumer.stop();
  await fastify.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
