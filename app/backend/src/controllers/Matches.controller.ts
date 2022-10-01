import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {}

  public getAll = async (req: Request, res:Response) => {
    const matches = await this.matchesService.getAll();
    return res.status(200).json(matches);
  };
}
