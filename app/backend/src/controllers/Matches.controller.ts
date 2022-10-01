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
}
