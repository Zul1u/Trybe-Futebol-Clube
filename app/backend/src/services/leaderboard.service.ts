import { QueryTypes } from 'sequelize';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { queryleaderboardAwayTeam, queryleaderboardHomeTeam } from './leaderboard.query';

export default class LeaderboardService {
  private teamModel: typeof Team;
  private matchModel: typeof Match;

  constructor(matchModel: typeof Match, teamModel: typeof Team) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  public async getLeaderboardHome(): Promise<object[] | undefined> {
    const leaderboardHomeTeam = this.matchModel
      .sequelize?.query(queryleaderboardHomeTeam, { type: QueryTypes.SELECT });
    return leaderboardHomeTeam;
  }

  public async getLeaderboardAway(): Promise<object[] | undefined> {
    const leaderboardHomeTeam = this.matchModel
      .sequelize?.query(queryleaderboardAwayTeam, { type: QueryTypes.SELECT });
    return leaderboardHomeTeam;
  }
}
