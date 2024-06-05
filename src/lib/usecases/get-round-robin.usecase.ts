import { MatchGateway } from "../models/gateways/match.gateway";
import { PlayerGateway } from "../models/gateways/player.gateway";
import { RoundRobinPlayer } from "../models/round-robin-player";

export default class GetRoundRobinUsecase {
  async handle(playerGateway: PlayerGateway, matchGateway: MatchGateway): Promise<RoundRobinPlayer[]> {
    const players = await playerGateway.getAll();
    const matches = await matchGateway.getAll();

    const roundRobin: RoundRobinPlayer[] = [];
    const sortedPlayers = players.sort((p1, p2) => {
      if (p1.name < p2.name) return -1;
      else if (p1.name > p2.name) return 1;
      return 0;
    });
    sortedPlayers.forEach((p) => {
      const newPlayer: RoundRobinPlayer = {
        id: p.id,
        name: p.name,
        results: [],
      };

      matches.forEach((m) => {
        if (m.homePlayerId === newPlayer.id) {
          newPlayer.results.push({
            opponentId: m.visitorPlayerId,
            matchId: m.id,
            score: `${m.homePlayerGoals} - ${m.visitorPlayerGoals}`,
          });
        } else if (m.visitorPlayerId === newPlayer.id) {
          newPlayer.results.push({
            opponentId: m.homePlayerId,
            matchId: m.id,
            score: `${m.visitorPlayerGoals} - ${m.homePlayerGoals}`,
          });
        }
      });

      roundRobin.push(newPlayer);
    });

    return Promise.resolve(roundRobin);
  }
}
