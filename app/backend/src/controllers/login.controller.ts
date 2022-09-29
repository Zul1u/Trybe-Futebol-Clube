import { Request, Response } from 'express';
import Token from '../helpers/token.helper';
import LoginService from '../services/login.service';

export default class LoginController {
  private loginService: LoginService;
  private token: Token;

  constructor() {
    this.loginService = new LoginService();
    this.token = new Token();
  }

  public getUser = async (req: Request, res: Response) => {
    const user = await LoginService.getUser(req.body);

    const { id, role, username } = user;
    const a = this.token.createToken({ id, role, username });

    return res.status(200).json({ token: a });
  };
}
