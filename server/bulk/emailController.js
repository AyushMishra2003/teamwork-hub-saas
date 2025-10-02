import { emailQueue } from "./emailQueue.js";


export const sendEmailController = async (req, res) => {
  try {
    // Add job to the queue
    await emailQueue.add('sendEmail', {
      to: req.body.email,
      subject: 'Welcome!',
      body: 'Hello from our app!',
    });

    res.status(200).json({ message: 'Email job queued successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to enqueue email' });
  }
};
