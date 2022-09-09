import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import PlantModel from '../../../models/plant';
import { Plant } from '../../../types';
import config from '../../../utils/config';
import logger from '../../../utils/logger';

export async function createPlant(plantObject: Plant) {
  mongoose.connect(config.MONGODB_URI);
  const plant = new PlantModel(plantObject);
  await plant.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, latin, description, cultivation } = req.body;
      const data = await createPlant({
        name: name,
        latin: latin,
        description: description,
        cultivation: cultivation,
        createdAt: new Date()
      });
      res.json(data);
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
