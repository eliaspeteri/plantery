import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import PostModel from '../../../models/post';
import { Post } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getPosts(): Promise<Post[]> {
  mongoose.connect(config.MONGODB_URI);
  const posts = await PostModel.find({});
  return posts;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data: Post[] = await getPosts();
      res.json(data);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
