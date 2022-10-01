import { Router } from 'express';
import TeamsService from '../services/teams.service';
import TeamsController from '../controllers/teams.controller';
import Team from '../database/models/Team';

class Login {
  public teamsRouter: Router;
  public teamsController: TeamsController;

  constructor() {
    this.teamsRouter = Router();
    this.teamsController = new TeamsController(new TeamsService(Team));

    this.methods();
  }

  private methods(): void {
    this.teamsRouter.get('/', this.teamsController.getAll);
  }
}

const { teamsRouter } = new Login();

export default teamsRouter;
