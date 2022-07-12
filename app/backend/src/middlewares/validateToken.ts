import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from '../utils/JWT';

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }

    // test: await needed for method "stub"
    await JWT.verifyToken(token);

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
}
