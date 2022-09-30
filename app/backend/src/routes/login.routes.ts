import { Router } from 'express';
import ValidateUser from '../middleware/login.middleware';
import LoginController from '../controllers/login.controller';

export default class Login {
  public loginRouter: Router;
  private loginController: LoginController;
  private validateUser: ValidateUser;

  constructor() {
    this.loginRouter = Router();
    this.validateUser = new ValidateUser();
    this.loginController = new LoginController();

    this.methods();
  }

  private methods(): void {
    this.loginRouter.post('/', this.validateUser.validateLogin, this.loginController.getUser);
  }
}

export const { loginRouter } = new Login();
