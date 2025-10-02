// utils/tokenUtil.js
import jwt from 'jsonwebtoken';
import { client } from "../redisClient.js";
import AppError from './error.utlis.js';

const SECRET = 'SECRET'; // store this in .env in production
const EXPIRE_SECONDS = 60; // 60 seconds = 1 minute

// Create token and store in Redis
export const generateAndStoreToken = async (email) => {
  const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1d' });

  // Save token in Redis with expiry
  await client.set(`session:${email}`, token, { EX: EXPIRE_SECONDS });

  return token;
};

// Verify token from cookie and Redis
export const verifyTokenFromRequest = async (req) => {
  const token = req.cookies?.token;
  if (!token) throw new Error('No token found',400);

  const decoded = jwt.verify(token, process.env.SECRET);
  const storedToken = await client.get(`session:${decoded.email}`);

  // console.log(storedToken);

  if (!storedToken || storedToken !== token) {
    throw new AppError('Session expired or invalid');
  }

  return decoded.email;
}


// clear token from redis
export const clearStoreCookie = async (req) => {

  const token = req.cookies?.token;
  if (!token) throw new Error('No token found');

  const decoded = jwt.verify(token, process.env.SECRET);
  const storedToken = await client.del(`session:${decoded.email}`);

}
