// redis/redisClient.js
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

// export a promise to connect (for control in app.js)
const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

export { client, connectRedis };
