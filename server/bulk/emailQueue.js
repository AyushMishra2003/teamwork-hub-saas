// queues/emailQueue.js
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

// Redis connection
const connection = new IORedis(); 

// Create the queue
export const emailQueue = new Queue('emailQueue', { connection });
