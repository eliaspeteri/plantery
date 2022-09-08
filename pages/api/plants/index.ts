import { NextApiRequest, NextApiResponse } from 'next';
import PlantModel from '../../../models/plant';
import { Plant } from '../../../types';

export async function getPlants(): Promise<Plant[]> {
  const plants = await PlantModel.find({});
  return plants;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data: Plant[] = await getPlants();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }
}
