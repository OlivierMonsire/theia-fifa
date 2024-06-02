import { MatchGateway } from "../models/gateways/match.gateway";
import { PlayerGateway } from "../models/gateways/player.gateway";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { RankingPlayer } from "../models/ranking-player";

export default class GetRankingUsecase {
  async handle(playerGateway: PlayerGateway, matchGateway: MatchGateway) {
    const players = await playerGateway.getAll();
    const matches = await matchGateway.getAll();

    return this.initRanking(players, matches);
  }

  private initRanking(players: Player[], matches: Match[]) {
    const ranking: RankingPlayer[] = players.map((p) => {
      const player = this.initRankingPlayer(p);
      this.handlePlayerMatches(player, matches);
      return player;
    });

    const rankingWithPositions = this.makePositions(ranking);
    return rankingWithPositions;
  }

  private initRankingPlayer = (newPlayer: Player): RankingPlayer => {
    return {
      id: newPlayer.id,
      name: newPlayer.name,
      rank: 1,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      goalsScored: 0,
      goalsConceded: 0,
      GoalsDiff: 0,
      points: 0,
    };
  };

  private handlePlayerMatches = (player: RankingPlayer, matches: Match[]) => {
    const playerMatches = matches.filter((m) => m.homePlayerId === player.id || m.visitorPlayerId === player.id);
    player.matchesPlayed = playerMatches.length;

    player.wins = playerMatches.filter((m) => {
      return this.isWinner(player.id, m);
    }).length;

    player.losses = playerMatches.filter((m) => {
      return !this.isWinner(player.id, m) && m.homePlayerGoals !== m.visitorPlayerGoals;
    }).length;

    player.draws = playerMatches.filter((m) => m.homePlayerGoals === m.visitorPlayerGoals).length;

    player.goalsScored = playerMatches.reduce((acc, m) => {
      return acc + (player.id === m.homePlayerId ? m.homePlayerGoals : m.visitorPlayerGoals);
    }, 0);

    player.goalsConceded = playerMatches.reduce((acc, m) => {
      return acc + (player.id === m.homePlayerId ? m.visitorPlayerGoals : m.homePlayerGoals);
    }, 0);

    player.GoalsDiff = player.goalsScored - player.goalsConceded;

    player.points = player.wins * 3 + player.draws;
  };

  private isWinner(playerId: string, match: Match) {
    return (
      (playerId === match.homePlayerId && match.homePlayerGoals > match.visitorPlayerGoals) ||
      (playerId === match.visitorPlayerId && match.visitorPlayerGoals > match.homePlayerGoals)
    );
  }

  private makePositions(ranking: RankingPlayer[]): RankingPlayer[] {
    const sortedByPointsRanking = this.sortRanking(ranking);

    let rank = 1;
    const sortedRankingWithPoints: RankingPlayer[] = [];
    sortedByPointsRanking.forEach((p, i) => {
      if (i === 0) {
        p.rank = rank;
      } else if (sortedByPointsRanking[i].points === sortedByPointsRanking[i - 1].points) {
        rank++;
        p.rank = sortedByPointsRanking[i - 1].rank;
      } else {
        rank++;
        p.rank = rank;
      }

      sortedRankingWithPoints.push(p);
    });

    return sortedRankingWithPoints;
  }

  private sortRanking(ranking: RankingPlayer[]) {
    return ranking.sort((p1, p2) => {
      if (p1.points > p2.points) return -1;
      else if (p1.points < p2.points) return 1;
      return 0;
    });
  }
}
