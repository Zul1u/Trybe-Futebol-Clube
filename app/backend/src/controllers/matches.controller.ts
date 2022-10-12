import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.matchesService.getAll();
    return res.status(200).json(matches);
  };

  public getAllInProgress = async (req: Request, res: Response) => {
    if (!req.query.inProgress) return this.getAll(req, res);

    const inProgress = req.query.inProgress === 'true';
    const matches = await this.matchesService.getAllInProgress(inProgress);

    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const newMatch = await this.matchesService.createMatch(req.body);
    return res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    await this.matchesService.finishMatch(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatchScore = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const teamsScore = { homeTeamGoals, awayTeamGoals };

    const updatedMatch = await this.matchesService.updateMatchScore(
      teamsScore,
      Number(req.params.id),
    );

    return res.status(200).json(updatedMatch);
  };
}
