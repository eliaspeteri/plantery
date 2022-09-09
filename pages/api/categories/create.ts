import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import CategoryModel from '../../../models/category';
import { NewCategory } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function createCategory(categoryObject: NewCategory) {
  mongoose.connect(config.MONGODB_URI);
  const category = new CategoryModel(categoryObject);
  await category.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      const data = await createCategory({
        title: title,
        description: description
      });
      res.json(data);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
