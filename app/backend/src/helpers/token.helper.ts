import * as jwt from 'jsonwebtoken';
import CustomError from '../errors/customError';
import { TokenInfos, VerifyToken } from '../interfaces/Token.types';
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

  protected verifyToken(token: string): VerifyToken {
    try {
      const payload = jwt.verify(token, this.secret) as VerifyToken;
      return payload;
    } catch (error) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  }
}
