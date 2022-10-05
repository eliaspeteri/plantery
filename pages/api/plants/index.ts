import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import PlantModel from '../../../models/plant';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getPlants(page = 0, limit = 5) {
  mongoose.connect(config.MONGODB_URI);
  let plants = await PlantModel.find()
    .sort({ latin: 1 })
    .skip(page * limit)
    .limit(limit);
  return JSON.stringify({
    plants,
    previous: `${process.env.ROOT}/api/plants?page=${
      page - 1 >= 0 ? page - 1 : 0
    }&limit=${limit || 10}`,
    next: `${process.env.ROOT}/api/plants?page=${page + 1 || 1}&limit=${
      limit || 10
    }`
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await getPlants(
        parseInt(req.query.page as string),
        parseInt(req.query.limit as string)
      );
      console.log(data);
      res.json(JSON.parse(data));
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
