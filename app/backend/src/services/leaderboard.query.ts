export const queryleaderboardHomeTeam = `SELECT 
t.team_name AS name,
COUNT(t.team_name) AS totalGames,
CAST(((SUM(m.home_team_goals > m.away_team_goals) * 3) + SUM(m.home_team_goals = m.away_team_goals))
    AS SIGNED) AS totalPoints,
CAST(SUM(m.home_team_goals > m.away_team_goals)
    AS SIGNED) AS totalVictories,
CAST(SUM(m.home_team_goals = m.away_team_goals)
    AS SIGNED) AS totalDraws,
CAST(SUM(m.home_team_goals < m.away_team_goals)
    AS SIGNED) AS totalLosses,
CAST(SUM(m.home_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(m.away_team_goals) AS SIGNED) AS goalsOwn,
CAST(SUM(m.home_team_goals) - SUM(m.away_team_goals)
    AS SIGNED) AS goalsBalance,
    
CAST(((((SUM(m.home_team_goals > m.away_team_goals) * 3)
+ SUM(m.home_team_goals = m.away_team_goals))
    / (COUNT(t.team_name) * 3) * 100))AS DECIMAL(10,2)) AS efficiency
    
FROM
TRYBE_FUTEBOL_CLUBE.matches AS m
    INNER JOIN
TRYBE_FUTEBOL_CLUBE.teams AS t ON t.id = m.home_team
WHERE
m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC ;`;

export const queryleaderboardAwayTeam = `SELECT 
t.team_name AS name,
COUNT(t.team_name) AS totalGames,
CAST(((SUM(m.home_team_goals < m.away_team_goals) * 3) + SUM(m.home_team_goals = m.away_team_goals))
    AS SIGNED) AS totalPoints,
CAST(SUM(m.home_team_goals < m.away_team_goals)
    AS SIGNED) AS totalVictories,
CAST(SUM(m.home_team_goals = m.away_team_goals)
    AS SIGNED) AS totalDraws,
CAST(SUM(m.home_team_goals > m.away_team_goals)
    AS SIGNED) AS totalLosses,
CAST(SUM(m.away_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(m.home_team_goals) AS SIGNED) AS goalsOwn,
CAST(SUM(m.away_team_goals) - SUM(m.home_team_goals)
    AS SIGNED) AS goalsBalance,
    
CAST(((((SUM(m.home_team_goals < m.away_team_goals) * 3)
+ SUM(m.home_team_goals = m.away_team_goals))
    / (COUNT(t.team_name) * 3) * 100))AS DECIMAL(10,2)) AS efficiency
    
FROM
TRYBE_FUTEBOL_CLUBE.matches AS m
    INNER JOIN
TRYBE_FUTEBOL_CLUBE.teams AS t ON t.id = m.away_team
WHERE
m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC ;`;
