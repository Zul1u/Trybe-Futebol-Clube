import { NextFunction, Response } from 'express';
import Token from '../helpers/token.helper';
import CustomError from '../errors/customError';
import ModifiedRequest from '../interfaces/IRequest.interface';

export default class TokenAuth extends Token {
  public tokenValidation = async (req: ModifiedRequest, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) throw new CustomError(401, 'Token not found');
    const { data } = super.verifyToken(authorization);

    req.tokenInfos = data;

    next();
  };
}
