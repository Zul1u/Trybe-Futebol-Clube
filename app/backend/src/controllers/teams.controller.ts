import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private teamService: TeamsService) {}

  public getAll = async (req: Request, res:Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };
}
