import { NextFunction, Request, Response } from 'express';
import IMatch from '../interfaces/IMatch.interface';
import CustomError from '../errors/customError';
import TeamsService from '../services/teams.service';

export default class MatchValidation {
  private teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  private static checksIfTeamFieldIsSentCorrectly(team: number, teamGoal: number): void {
    if (typeof team !== 'number') {
      throw new CustomError(
        400,
        'Home team and away team fields are required and must be of type number',
      );
    }
    if (typeof teamGoal !== 'number') {
      throw new CustomError(
        400,
        'Home team goals and away team goals fields are required and must be of type number',
      );
    }
  }

  private static checksIfAllFieldsAreSentCorrectly(teamsInfo: IMatch): void {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals } = teamsInfo;

    MatchValidation.checksIfTeamFieldIsSentCorrectly(awayTeam, awayTeamGoals);
    MatchValidation.checksIfTeamFieldIsSentCorrectly(homeTeam, homeTeamGoals);
  }

  private async checkIfTheTeamExists(homeTeam: number, awayTeam: number): Promise<void> {
    await this.teamsService.getById(homeTeam);
    await this.teamsService.getById(awayTeam);
  }

  public matchCreationValidation = async (req: Request, _res: Response, next: NextFunction) => {
    MatchValidation.checksIfAllFieldsAreSentCorrectly(req.body);

    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    await this.checkIfTheTeamExists(homeTeam, awayTeam);

    next();
  };

  public checkMatchScoreUpdateFields = async (req: Request, _res: Response, next: NextFunction) => {
    const { awayTeamGoals, homeTeamGoals } = req.body;

    if (awayTeamGoals === undefined || homeTeamGoals === undefined) {
      throw new CustomError(
        400,
        'Home team goals and away team goals fields are required and must be of type number',
      );
    }

    next();
  };
}
