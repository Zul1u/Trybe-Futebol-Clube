import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch.interface';

export default class MatchesService {
  private teamModel: typeof Team;
  private matchModel: typeof Match;

  constructor(matchModel: typeof Match, teamModel: typeof Team) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  public async getAll(): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async getAllInProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
