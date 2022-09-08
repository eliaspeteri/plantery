import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: string =
  process.env.NODE_ENV === 'test'
    ? (process.env.MONGODB_TEST_URI as string)
    : (process.env.MONGODB_URI as string);

const config = { MONGODB_URI };

export default config;
