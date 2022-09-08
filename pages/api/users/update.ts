import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import { User } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function updateUser(
  id: string | string[] | undefined,
  userObj: User
) {
  mongoose.connect(config.MONGODB_URI);
  return await UserModel.findOneAndUpdate({ id: id }, userObj, { new: true });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const result = await updateUser(req.query.id, req.body);
      res.json(result);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
