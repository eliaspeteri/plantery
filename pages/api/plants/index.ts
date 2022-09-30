import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import PlantModel from "../../../models/plant";
import config from "../../../utils/config";
import logger from "../../../utils/logger";

export async function getPlants() {
  mongoose.connect(config.MONGODB_URI);
  const plants = await PlantModel.find({}).lean();
  return JSON.stringify(plants);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getPlants();
      res.json(JSON.parse(data));
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
