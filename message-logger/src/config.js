require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || "message-logger",
    brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
    topic: process.env.KAFKA_TOPIC || "messages",
    consumerGroup: process.env.KAFKA_CONSUMER_GROUP || "message-logger-group",
  },
  postgres: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "message_logger",
  },
};
