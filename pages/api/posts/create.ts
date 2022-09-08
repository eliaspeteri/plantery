import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { NewPost } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';
import PostModel from '../../../models/post';

export async function newPost(postObject: NewPost) {
  mongoose.connect(config.MONGODB_URI);
  const post = new PostModel(postObject);
  await post.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { createdBy, postTitle, message, category } = req.body;
      const data = await newPost({
        createdAt: new Date(),
        createdBy: createdBy,
        postTitle: postTitle,
        message: message,
        category: category
      });
      res.json(data);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
