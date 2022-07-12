import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from '../utils/JWT';

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

    JWT.verifyToken(token);

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
}
