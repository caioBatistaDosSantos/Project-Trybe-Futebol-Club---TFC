import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET || 'secretKey';

export default function jwtVerifier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }

    jwt.verify(token, secretKey);

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
}
