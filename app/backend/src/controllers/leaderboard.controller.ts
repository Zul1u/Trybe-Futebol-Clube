import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboard: LeaderboardService) {}

  public getLeaderboardHome = async (_req: Request, res:Response) => {
    const leaderboardHome = await this.leaderboard.getLeaderboardHome();
    return res.status(200).json(leaderboardHome);
  };

  public getLeaderboardAway = async (_req: Request, res:Response) => {
    const leaderboardHome = await this.leaderboard.getLeaderboardAway();
    return res.status(200).json(leaderboardHome);
  };
}
