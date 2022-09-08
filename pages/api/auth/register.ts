import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import config from '../../../utils/config';
import logger from '../../../utils/logger';
import PasswordServ from '../../../utils/password';

export async function register(newUser: {
  password: string;
  isEmailVerified: any;
}) {
  newUser.password = await PasswordServ.hash(newUser.password);
  delete newUser.isEmailVerified;
  let user = new UserModel(newUser);
  mongoose.connect(config.MONGODB_URI);
  user = await user.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await register(req.body);
    res.json({ message: 'Verify your email yo' });
  } catch (error) {
    logger.error((error as any).message);
    res.json({ error: (error as any).message });
  }
}
