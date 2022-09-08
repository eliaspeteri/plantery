import jwt from 'jsonwebtoken';
import config from './config';

const tokenExpirePeriod = config.JWT_LIFETIME;
const jwtSecret = config.JWT_SECRET;

async function generate(payLoad: any, expiresIn = tokenExpirePeriod) {
  const isObject = typeof payLoad === 'object';

  if (!payLoad) throw new TypeError('Token Payload Should Not Be Empty');

  if (!isObject) throw new TypeError('Token Payload Must Be An Object');

  return new Promise((resolve, reject) => {
    jwt.sign(payLoad, jwtSecret, { expiresIn }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

async function verify(token: string) {
  if (!token) {
    throw new TypeError('Token Should Not Be Empty');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error: any, decodedToken) => {
      if (error) {
        reject(error);
      } else {
        resolve(decodedToken);
      }
    });
  });
}

const TokenServ = { generate, verify };

export default TokenServ;
