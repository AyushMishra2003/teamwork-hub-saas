// workers/emailWorker.js
import { Worker } from 'bullmq';
import { emailQueue } from './emailQueue.js';

// Worker picks jobs from 'emailQueue'
const worker = new Worker(
  'emailQueue',
  async (job) => {
    if (job.name === 'sendEmail') {
      const { to, subject, body } = job.data;
      console.log(`Sending email to ${to}`);
      // Here you call your actual sendEmail function
      await fakeSendEmail(to, subject, body);
    }
  },
  { connection: { host: '127.0.0.1', port: 6379 } }
);

// Fake email sending function (replace with real email logic)
async function fakeSendEmail(to, subject, body) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email sent to ${to} with subject: ${subject}`);
      resolve();
    }, 2000); // simulate delay
  });
}

// Event listeners
worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});
