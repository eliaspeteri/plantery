import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import { NewUser } from '../../../types';
import logger from '../../../utils/logger';

export async function createUser(userObj: NewUser) {
  const doc = new UserModel(userObj);
  return await doc.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const result = await createUser(req.body);
      res.json(result);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
