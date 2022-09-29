import { Router } from 'express';
import LoginController from '../controllers/login.controller';

export default class Login {
  public loginRouter: Router;
  private loginController: LoginController;

  constructor() {
    this.loginRouter = Router();
    this.loginController = new LoginController();

    this.methods();
  }

  private methods(): void {
    this.loginRouter.post('/', this.loginController.getUser);
  }
}

export const { loginRouter } = new Login();
