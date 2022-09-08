import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import PostModel from '../../../models/post';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getPost(id: string | string[] | undefined) {
  mongoose.connect(config.MONGODB_URI);
  const post = await PostModel.find({ id: id });
  return post;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await getPost(req.query.id);
      res.json(data);
    } catch (error) {
      logger.error((error as any).message);
    }
  }
}
