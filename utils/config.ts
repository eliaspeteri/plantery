import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: string =
  process.env.NODE_ENV === 'test'
    ? (process.env.MONGODB_TEST_URI as string)
    : (process.env.MONGODB_URI as string);
const JWT_LIFETIME: string = process.env.JWT_LIFETIME as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

const config = { MONGODB_URI, JWT_LIFETIME, JWT_SECRET };

export default config;
