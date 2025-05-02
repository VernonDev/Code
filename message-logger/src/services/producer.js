const { Kafka, Partitioners } = require("kafkajs");
const config = require("../config");

class KafkaProducer {
  constructor() {
    const kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: config.kafka.brokers,
    });

    this.producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner, // Explicitly use the default (or choose LegacyPartitioner if needed)
    });
    this.isConnected = false;
  }

  async connect() {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
      console.log("Producer connected to Kafka");
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log("Producer disconnected from Kafka");
    }
  }

  async sendMessage(topic, message, key = null) {
    if (!this.isConnected) {
      await this.connect();
    }

    const payload = {
      topic,
      messages: [
        {
          key: key ? key.toString() : null,
          value:
            typeof message === "string" ? message : JSON.stringify(message),
        },
      ],
    };

    const result = await this.producer.send(payload);
    return result;
  }
}

// Singleton instance
const producer = new KafkaProducer();

module.exports = producer;
