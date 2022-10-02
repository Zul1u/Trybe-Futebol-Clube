import { Router } from 'express';
import Match from '../database/models/Match';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/Matches.controller';
import Team from '../database/models/Team';
import TokenAuth from '../middleware/tokenAuth.middleware';
import MatchValidation from '../middleware/matches.middleware';
import TeamsService from '../services/teams.service';

class Matches {
  public matchesRouter: Router;
  private matchesContrler: MatchesController;
  private tokenAuth: TokenAuth;
  private matchValidation: MatchValidation;

  constructor() {
    this.matchesRouter = Router();
    this.matchesContrler = new MatchesController(new MatchesService(Match, Team));
    this.tokenAuth = new TokenAuth();
    this.matchValidation = new MatchValidation(new TeamsService(Team));

    this.methods();
  }

  private methods(): void {
    this.matchesRouter.get('/', this.matchesContrler.getAll);
    this.matchesRouter.get('/matches', this.matchesContrler.getAllInProgress);

    this.matchesRouter.post(
      '/',
      this.tokenAuth.tokenValidation,
      this.matchesContrler.createMatch,
    );
  }
}

const { matchesRouter } = new Matches();

export default matchesRouter;
