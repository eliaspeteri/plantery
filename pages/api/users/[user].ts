import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import config from '../../../utils/config';
import { PermissionDeniedError } from '../../../utils/constants/errors';

import ADMIN from '../../../utils/constants/roles';
import logger from '../../../utils/logger';

export async function getUserById(id: string | string[] | undefined) {
  mongoose.connect(config.MONGODB_URI);
  return await UserModel.findOne({ id: id }, { password: false });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.body.tokenData?.role !== ADMIN &&
    req.query.id !== req.body.tokenData?.userId
  )
    throw new PermissionDeniedError();
  if (req.method === 'GET') {
    try {
      const result = await getUserById(req.query.id);
      res.json(result);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
