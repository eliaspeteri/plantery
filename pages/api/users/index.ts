import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getUsers() {
  mongoose.connect(config.MONGODB_URI);
  return await UserModel.find({}, { password: false }).lean();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await getUsers();

      res.json(result);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
