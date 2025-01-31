import amqp from "amqplib";
import logger from "./logger.js";

let connection = null;
let channel = null;

const EXCHANGE_NAME = "property_image";

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: true });
    logger.info("RabbitMq connected");
    return channel;
  } catch (error) {
    logger.error("Error while connection to rabbitmq", error);
  }
}

export default connectRabbitMQ;