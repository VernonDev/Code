const { Kafka } = require("kafkajs");
const config = require("../config");
const db = require("../db");

class MessageConsumer {
  constructor() {
    const kafka = new Kafka({
      clientId: `${config.kafka.clientId}-consumer`,
      brokers: config.kafka.brokers,
    });

    this.consumer = kafka.consumer({
      groupId: config.kafka.consumerGroup,
    });
    this.isRunning = false;
  }

  async start() {
    if (this.isRunning) return;

    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: config.kafka.topic,
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { offset, key, value, timestamp } = message;
        console.log(
          `Processing message: ${value.toString()} from topic ${topic}`
        );

        try {
          await db.saveMessage({
            topic,
            partition,
            offset,
            key: key ? key.toString() : null,
            value: value.toString(),
            timestamp,
          });

          console.log(`Message saved to database: ${offset}`);
        } catch (error) {
          console.error("Error saving message to database:", error);
        }
      },
    });

    this.isRunning = true;
    console.log(
      `Consumer started and subscribed to topic: ${config.kafka.topic}`
    );
  }

  async stop() {
    if (!this.isRunning) return;

    await this.consumer.disconnect();
    this.isRunning = false;
    console.log("Consumer stopped");
  }
}

// Singleton instance
const consumer = new MessageConsumer();

module.exports = consumer;
