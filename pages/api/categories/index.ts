import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import CategoryModel from '../../../models/category';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getCategories() {
  mongoose.connect(config.MONGODB_URI);
  const categories = await CategoryModel.find({}).lean();
  return categories;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await getCategories();
      res.json(data);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
