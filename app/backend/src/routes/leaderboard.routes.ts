import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class Leaderboard {
  public leaderboardRouter: Router;
  private leaderboardController: LeaderboardController;

  constructor() {
    this.leaderboardRouter = Router();
    this.leaderboardController = new LeaderboardController(new LeaderboardService(Match, Team));

    this.methods();
  }

  private methods(): void {
    this.leaderboardRouter.get('/home', this.leaderboardController.getLeaderboardHome);
    this.leaderboardRouter.get('/away', this.leaderboardController.getLeaderboardAway);
  }
}

const { leaderboardRouter } = new Leaderboard();

export default leaderboardRouter;
