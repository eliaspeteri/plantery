import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function deleteUser(id: string | string[] | undefined) {
  mongoose.connect(config.MONGODB_URI);
  return await UserModel.findOneAndRemove({ id: id });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const result = await deleteUser(req.query.id);
      res.json(result);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
