import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import PlantModel from "../../../models/plant";
import { Plant } from "../../../types";
import config from "../../../utils/config";
import logger from "../../../utils/logger";

export async function getPlantById(id: string): Promise<Plant | null> {
  mongoose.connect(config.MONGODB_URI);
  const plant: Plant | null = await PlantModel.findById(id);

  return plant;
}

export async function getPlantByName(latin: string) {
  mongoose.connect(config.MONGODB_URI);
  const doc = await PlantModel.findOne({
    latin: latin.charAt(0).toUpperCase() + latin.slice(1),
  });
  return JSON.stringify(doc);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { plant } = req.query;
      const data = await getPlantByName(plant as string);
      res.json(JSON.parse(data));
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
