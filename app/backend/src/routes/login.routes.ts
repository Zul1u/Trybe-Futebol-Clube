import { Router } from 'express';
import ValidateUser from '../middleware/login.middleware';
import LoginController from '../controllers/login.controller';
import TokenAuth from '../middleware/tokenAuth.middleware';

class Login {
  public loginRouter: Router;
  private loginController: LoginController;
  private validateUser: ValidateUser;
  private tokenAuth: TokenAuth;

  constructor() {
    this.loginRouter = Router();
    this.validateUser = new ValidateUser();
    this.loginController = new LoginController();
    this.tokenAuth = new TokenAuth();

    this.methods();
  }

  private methods(): void {
    this.loginRouter.post('/', this.validateUser.validateLogin, this.loginController.getUser);

    this.loginRouter
      .get('/validate', this.tokenAuth.tokenValidation, this.loginController.validateUser);
  }
}

const { loginRouter } = new Login();

export default loginRouter;
