import { Router } from 'express';
import Match from '../database/models/Match';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/Matches.controller';
import Team from '../database/models/Team';

class Matches {
  public matchesRouter: Router;
  private matchesContrler: MatchesController;

  constructor() {
    this.matchesRouter = Router();
    this.matchesContrler = new MatchesController(new MatchesService(Match, Team));

    this.methods();
  }

  private methods(): void {
    this.matchesRouter.get('/', this.matchesContrler.getAll);
  }
}

const { matchesRouter } = new Matches();

export default matchesRouter;
