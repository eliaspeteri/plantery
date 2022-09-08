import { NextApiRequest, NextApiResponse } from 'next';
import PlantModel from '../../../models/plant';
import { Plant } from '../../../types';
import logger from '../../../utils/logger';

export async function getPlant(id: string): Promise<Plant | null> {
  const plant: Plant | null = await PlantModel.findById(id);

  return plant;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { plant } = req.query;
    const data = await getPlant(plant as string);
    res.status(200).json({ data: data });
  } catch (error) {
    logger.error((error as any).message);
    res.json({ error: (error as any).message });
  }
}
