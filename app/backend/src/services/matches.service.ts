import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch.interface';
import TeamsScore from '../interfaces/Team.type';
import CustomError from '../errors/customError';

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

  public async getById(id: number): Promise<IMatch> {
    const match = await this.matchModel.findByPk(
      id,
      {
        include: [
          { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    if (!match) throw new CustomError(404, 'There is no team with such id!');

    return match;
  }

  public async createMatch(matchInfos: IMatch): Promise<IMatch> {
    const newMatch = await this.matchModel.create(matchInfos);
    return newMatch;
  }

  public async finishMatch(id: number): Promise<void> {
    const match = await this.getById(id);
    if (!match.inProgress) throw new CustomError(400, 'this match has already finished');

    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatchScore(teamsScore: TeamsScore, id: number): Promise<IMatch> {
    const { homeTeamGoals, awayTeamGoals } = teamsScore;
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const updatedMatch = await this.getById(id);

    return updatedMatch;
  }
}
