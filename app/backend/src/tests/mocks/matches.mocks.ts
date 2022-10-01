const matchNotInProgress = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'São Paulo'
  },
  teamAway: {
    teamName: 'Grêmio'
  }
};

const matchInprogress = {
  id: 2,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
  teamHome: {
    teamName: 'São Paulo'
  },
  teamAway: {
    teamName: 'Grêmio'
  }
};

export const matchesList = [matchInprogress, matchInprogress, matchNotInProgress, matchNotInProgress];

export const matchesListInProgress = [matchInprogress, matchInprogress];
export const matchesListNotProgress = [matchNotInProgress, matchNotInProgress];