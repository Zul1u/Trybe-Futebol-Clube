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

export const failCreateMatch = [
  {
    homeTeam: 0,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeam: 8,
    homeTeamGoals: 1,
    awayTeam: 0,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeam: 8,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
  },
];

export const bodyOfNewMatch = {
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
}

export const newMatch = {
  id: 49,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
};

export const matchesList = [matchInprogress, matchInprogress, matchNotInProgress, matchNotInProgress];

export const matchesListInProgress = [matchInprogress, matchInprogress];
export const matchesListNotProgress = [matchNotInProgress, matchNotInProgress];

export const finishedMatch = 'Finished';

export const invalidTeamId = 'There is no team with such id!';
export const sameTeamIds = 'It is not possible to create a match with two equal teams';
