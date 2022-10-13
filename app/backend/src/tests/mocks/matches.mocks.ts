export const matchNotInProgress = {
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

export const matchInprogress = {
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
  {
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeam: 16,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
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

export const failUpdateMatchScore = [
  {
    awayTeamGoals: 3,
  },
  {
    homeTeamGoals: 2,
  }
]

export const updateMatchScore = {
  homeTeamGoals: 2,
  awayTeamGoals: 3
}

export const updatedMatchScore = {
  id: 2,
  homeTeam: 9,
  homeTeamGoals: 2,
  awayTeam: 14,
  awayTeamGoals: 3,
  inProgress: false,
  teamHome: {
    teamName: 'Internacional'
  },
  teamAway: {
    teamName: 'Santos'
  }
}

export const matchesList = [matchInprogress, matchInprogress, matchNotInProgress, matchNotInProgress];

export const matchesListInProgress = [matchInprogress, matchInprogress];
export const matchesListNotProgress = [matchNotInProgress, matchNotInProgress];

export const finishedMatch = 'Finished';

export const invalidTeamId = 'There is no team with such id!';
export const sameTeamIds = 'It is not possible to create a match with two equal teams';

export const teamRequired = 'Home team and away team fields are required and must be of type number';
export const teamGoalsRequired = 'Home team goals and away team goals fields are required and must be of type number';

export const matchAlreadyFinished = 'this match has already finished';