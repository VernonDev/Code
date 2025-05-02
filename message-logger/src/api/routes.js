const producer = require("../services/producer");
const db = require("../db");
const config = require("../config");

async function routes(fastify) {
  // Health check
  fastify.get("/health", async () => {
    return { status: "ok" };
  });

  // Send message to Kafka
  fastify.post("/messages", {
    schema: {
      body: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
          key: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                topic: { type: "string" },
                partition: { type: "integer" },
                offset: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { message, key } = request.body;

      try {
        const result = await producer.sendMessage(
          config.kafka.topic,
          message,
          key
        );
        return {
          success: true,
          data: result[0],
        };
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
          success: false,
          error: "Failed to send message",
        });
      }
    },
  });

  // Get messages from database - FIXED SCHEMA
  fastify.get("/messages", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer" },
          offset: { type: "integer" },
          topic: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  topic: { type: "string" },
                  key: { type: "string" },
                  value: { type: "string" },
                  partition: { type: "integer" },
                  offset: { type: "string" },
                  timestamp: { type: "string" },
                },
              },
            },
            meta: {
              type: "object",
              properties: {
                limit: { type: "integer" },
                offset: { type: "integer" },
                topic: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const limit = request.query.limit ? parseInt(request.query.limit) : 100;
      const offset = request.query.offset ? parseInt(request.query.offset) : 0;
      const { topic } = request.query;

      try {
        const messages = topic
          ? await db.getMessagesByTopic(topic, limit, offset)
          : await db.getMessages(limit, offset);

        return {
          success: true,
          data: messages,
          meta: { limit, offset, topic },
        };
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
          success: false,
          error: "Failed to fetch messages",
        });
      }
    },
  });
}

module.exports = routes;
