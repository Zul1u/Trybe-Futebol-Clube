interface ILeaderboard {
  name: string,
  totalGames: number,
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

export default ILeaderboard;
