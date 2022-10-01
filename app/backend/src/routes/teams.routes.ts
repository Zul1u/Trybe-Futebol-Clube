import { Router } from 'express';
import TeamsService from '../services/teams.service';
import TeamsController from '../controllers/teams.controller';
import Team from '../database/models/Team';

class Teams {
  public teamsRouter: Router;
  public teamsController: TeamsController;

  constructor() {
    this.teamsRouter = Router();
    this.teamsController = new TeamsController(new TeamsService(Team));

    this.methods();
  }

  private methods(): void {
    this.teamsRouter.get('/', this.teamsController.getAll);
    this.teamsRouter.get('/:id', this.teamsController.getById);
  }
}

const { teamsRouter } = new Teams();

export default teamsRouter;
