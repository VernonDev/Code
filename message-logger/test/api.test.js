const { test } = require("jest");
const { build } = require("../src/app");
const producer = require("../src/services/producer");

// Mock the producer
jest.mock("../src/services/producer", () => ({
  sendMessage: jest.fn().mockResolvedValue([
    {
      topic: "messages",
      partition: 0,
      offset: "123",
    },
  ]),
}));

// Mock the database
jest.mock("../src/db", () => ({
  saveMessage: jest.fn().mockResolvedValue(1),
  getMessages: jest.fn().mockResolvedValue([
    {
      id: 1,
      topic: "messages",
      key: "test-key",
      value: "test-message",
      partition: 0,
      offset: "123",
      timestamp: new Date().toISOString(),
    },
  ]),
  getMessagesByTopic: jest.fn().mockResolvedValue([]),
}));

// Mock the consumer so it doesn't actually connect to Kafka
jest.mock("../src/consumers/messageConsumer", () => ({
  start: jest.fn().mockResolvedValue(),
  stop: jest.fn().mockResolvedValue(),
}));

describe("API Routes", () => {
  let app;

  beforeAll(async () => {
    app = build();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Health check returns ok", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({ status: "ok" });
  });

  test("POST /messages sends a message to Kafka", async () => {
    const payload = { message: "test message", key: "test-key" };
    const response = await app.inject({
      method: "POST",
      url: "/messages",
      payload,
    });

    expect(response.statusCode).toBe(200);
    expect(producer.sendMessage).toHaveBeenCalledWith(
      "messages",
      "test message",
      "test-key"
    );

    const responseBody = JSON.parse(response.payload);
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toHaveProperty("topic", "messages");
  });

  test("GET /messages returns message history", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/messages",
    });

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.payload);
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data).toHaveLength(1);
  });
});
