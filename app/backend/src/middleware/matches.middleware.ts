import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class MatchValidation {
  private teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  private async checkIfTheTeamExists(id: number): Promise<void> {
    await this.teamsService.getById(id);
  }

  public teamsValidation = async (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    await this.checkIfTheTeamExists(homeTeam);
    await this.checkIfTheTeamExists(awayTeam);

    next();
  };
}
