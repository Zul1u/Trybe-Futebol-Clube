import { Request, Response } from 'express';
import ModifiedRequest from '../interfaces/IRequest.interface';
import Token from '../helpers/token.helper';
import LoginService from '../services/login.service';
import { TokenInfos } from '../interfaces/Token.types';

export default class LoginController {
  private tokenGenerator: Token;

  constructor() {
    this.tokenGenerator = new Token();
  }

  public getUser = async (req: Request, res: Response) => {
    const user = await LoginService.getUser(req.body);

    const { id, role, username } = user;
    const token = this.tokenGenerator.createToken({ id, role, username });

    return res.status(200).json({ token });
  };

  public validateUser = (req: ModifiedRequest, res: Response) => {
    const { role } = req.tokenInfos as TokenInfos;
    return res.status(200).json({ role });
  };
}
