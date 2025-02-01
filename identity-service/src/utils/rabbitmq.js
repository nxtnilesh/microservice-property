import amqplib from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const EXCHANGE_NAME = 'otp_exchange';

let channel;

export const connectRabbitMQ = async () => {
  if (channel) return channel;

  const connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

  return channel;
};

export const publishMessage = async (routingKey, message) => {
  const channel = await connectRabbitMQ();
  channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));
};

export const consumeMessages = async (routingKey, callback) => {
  const channel = await connectRabbitMQ();
  const { queue } = await channel.assertQueue('', { exclusive: true });

  await channel.bindQueue(queue, EXCHANGE_NAME, routingKey);

  channel.consume(queue, (msg) => {
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      callback(content);
      channel.ack(msg);
    }
  });
};
