import { NextFunction, Request, Response } from 'express';
import CustomError from '../shared/customError';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as CustomError;

  if (err instanceof CustomError) {
    return res.status(status).json({ message });
  }

  console.error(err);
  return res.status(500).json({ message });
};

export default errorMiddleware;
