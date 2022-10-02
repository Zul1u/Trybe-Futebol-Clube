import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/customError';
import TeamsService from '../services/teams.service';

export default class MatchValidation {
  private teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  private async checkIfTheTeamExists(homeTeam: number, awayTeam: number): Promise<void> {
    await this.teamsService.getById(homeTeam);
    await this.teamsService.getById(awayTeam);
  }

  public teamsValidation = async (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    await this.checkIfTheTeamExists(homeTeam, awayTeam);

    next();
  };
}
