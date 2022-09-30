import * as jwt from 'jsonwebtoken';
import CustomError from '../errors/customError';
import { TokenInfos, VerifyToken } from './token.types';
import 'dotenv/config';

export default class Token {
  private secret: string;
  private jwtConfig: jwt.SignOptions;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'jwt_secret';
    this.jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  }

  public createToken(payload: TokenInfos): string {
    const token = jwt.sign({ data: payload }, this.secret, this.jwtConfig);
    return token;
  }

  public verifyToken(token: string): VerifyToken {
    try {
      const payload = jwt.verify(token, this.secret) as VerifyToken;
      return payload;
    } catch (err) {
      throw new CustomError(401, 'Invalid token');
    }
  }
}
