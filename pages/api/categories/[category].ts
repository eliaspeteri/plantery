import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import CategoryModel from '../../../models/category';
import { Category } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getCategory(title: string | string[] | undefined) {
  mongoose.connect(config.MONGODB_URI);
  return await CategoryModel.findOne({ title: title });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await getCategory(req.query.title);
      res.json(data as Category);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
