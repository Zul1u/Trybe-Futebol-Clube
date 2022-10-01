import ITeam from '../interfaces/ITeam.interface';
import Team from '../database/models/Team';
import CustomError from '../errors/customError';

export default class TeamsService {
  constructor(private teamModel: typeof Team) { }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<ITeam> {
    const team = await this.teamModel.findByPk(id);
    if (!team) throw new CustomError(404, 'ID not found');

    return team;
  }
}
