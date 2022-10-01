import ITeam from '../interfaces/ITeam.interface';
import Team from '../database/models/Team';

export default class TeamsService {
  constructor(private team: typeof Team) {}

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.team.findAll();
    return teams;
  }
}
