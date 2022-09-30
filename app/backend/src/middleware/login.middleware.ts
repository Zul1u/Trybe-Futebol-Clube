import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/customError';

export default class ValidateUser {
  private static validateEmail(email: string): void {
    if (!email) throw new CustomError(400, 'All fields must be filled');
  }

  private static validatePassword(password: string): void {
    if (!password) throw new CustomError(400, 'All fields must be filled');
  }

  public validateLogin = (req: Request, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    ValidateUser.validateEmail(email);
    ValidateUser.validatePassword(password);
    next();
  };
}
