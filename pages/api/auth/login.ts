'use strict';

import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../models/user';
import {
  InvalidCredentialsError,
  EmailNotVerifiedError
} from '../../../utils/constants/errors';

import TokenServ from '../../../utils/token';
import PasswordServ from '../../../utils/password';
import config from '../../../utils/config';
import mongoose from 'mongoose';
import logger from '../../../utils/logger';

export async function login(email: string) {
  mongoose.connect(config.MONGODB_URI);
  const user = await UserModel.findOne({ email: email });
  return user;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const user = await login(email);
      if (!user) ({ error: new InvalidCredentialsError() });

      if (!user.isEmailVerified) ({ error: new EmailNotVerifiedError() });

      const isPasswordMatched = await PasswordServ.match(
        password,
        user.password
      );

      if (!isPasswordMatched)
        res.json({ error: new InvalidCredentialsError().message });

      const token = await TokenServ.generate({
        userId: user.id,
        role: user.role
      });

      res.json({ token, email: user.email, name: user.name, role: user.role });
    } catch (error) {
      logger.error((error as any).message);
      res.json({ error: (error as any).message });
    }
  }
}
