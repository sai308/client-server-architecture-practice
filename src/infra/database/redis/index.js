const { Redis } = require('ioredis');
const { REDIS_HOST, REDIS_PORT } = require('../../../../config');

// @ts-ignore
const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis Error:', err));

module.exports = { redisClient };
