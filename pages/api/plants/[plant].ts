import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import PlantModel from '../../../models/plant';
import { Plant } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function getPlantById(id: string): Promise<Plant | null> {
  mongoose.connect(config.MONGODB_URI);
  const plant: Plant | null = await PlantModel.findById(id);

  return plant;
}

export async function getPlantByName(name: string): Promise<Plant[] | null> {
  mongoose.connect(config.MONGODB_URI);

  const doc: Plant[] | null = await PlantModel.find({ name: name });

  return doc;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { plant } = req.query;
      const data: Plant | null = await getPlantById(plant as string);
      res.json({ data: data });
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
