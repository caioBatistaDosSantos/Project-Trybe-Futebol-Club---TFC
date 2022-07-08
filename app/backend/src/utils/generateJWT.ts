import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { IUser } from '../interfaces/loginInterface';

const secretKey = process.env.JWT_SECRET || 'secretKey';

const generateJwt = (payload: IUser) => {
  const token = jwt.sign({ data: payload }, secretKey, {
    expiresIn: '120m',
    algorithm: 'HS256',
  });

  return token;
};

export default { generateJwt };
