import { QueryTypes } from 'sequelize';
import CustomError from '../errors/customError';
import ILeaderboard from '../interfaces/ILeaderboard.interface';
import Match from '../database/models/Match';
import { queryleaderboardAwayTeam, queryleaderboardHomeTeam } from './leaderboard.query';

export default class LeaderboardService {
  private matchModel: typeof Match;
  private generalLeaderboard: ILeaderboard[];

  constructor(matchModel: typeof Match) {
    this.matchModel = matchModel;
  }

  public async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const leaderboardHomeTeam = await this.matchModel
      .sequelize?.query(queryleaderboardHomeTeam, { type: QueryTypes.SELECT });

    if (!leaderboardHomeTeam) throw new CustomError(500, 'Algo deu errado!!');

    return leaderboardHomeTeam as ILeaderboard[];
  }

  public async getLeaderboardAway(): Promise<ILeaderboard[]> {
    const leaderboardAwayTeam = await this.matchModel
      .sequelize?.query(queryleaderboardAwayTeam, { type: QueryTypes.SELECT });

    if (!leaderboardAwayTeam) throw new CustomError(500, 'Algo deu errado!!');

    return leaderboardAwayTeam as ILeaderboard[];
  }

  private leaderboard(homeTeam: ILeaderboard, awayTeam: ILeaderboard): void {
    const leaderboard = {
      name: homeTeam.name,
      totalGames: homeTeam.totalGames + awayTeam.totalGames,
      totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
      totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
      totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
      totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
      goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
      efficiency: '',
    };
    leaderboard.efficiency = `${((leaderboard.totalPoints / (leaderboard.totalGames * 3)) * 100)
      .toFixed(2)}`;
    this.generalLeaderboard.push(leaderboard);
  }

  private buildingGeneralLeaderboard(home: ILeaderboard[], away: ILeaderboard[]): void {
    this.generalLeaderboard = [];
    home.filter((homeTeam: ILeaderboard) => away.forEach((awayTeam: ILeaderboard) => {
      if (homeTeam.name === awayTeam.name) {
        this.leaderboard(homeTeam, awayTeam);
      }
    }));
  }

  private order(): void {
    this.generalLeaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
  }

  public async getLeaderboardGeneral(): Promise<ILeaderboard[]> {
    const home = await this.getLeaderboardHome();
    const away = await this.getLeaderboardAway();
    this.buildingGeneralLeaderboard(home, away);
    this.order();
    return this.generalLeaderboard;
  }
}
