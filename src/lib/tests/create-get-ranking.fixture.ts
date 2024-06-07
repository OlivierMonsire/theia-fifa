import { Match } from "../models/match";
import { Player } from "../models/player";
import { RankingPlayer } from "../models/ranking-player";
import { RoundRobinPlayer } from "../models/round-robin-player";
import { globalStore } from "../stores/store";
import GetRankingUsecase from "../usecases/get-ranking.usecase";
import GetRoundRobinUsecase from "../usecases/get-round-robin.usecase";

export type Fixture = ReturnType<typeof createFixture>;

export const createFixture = () => {
  const getRankingUsecase = new GetRankingUsecase();
  const getRoundRobinUsecase = new GetRoundRobinUsecase();
  const { setPlayers, setMatches } = globalStore.getState();
  return {
    givenPlayers: (players: Player[]) => setPlayers(players),
    givenMatches: (matches: Match[]) => setMatches(matches),
    whenGetRanking: async () => await getRankingUsecase.handle(),
    whenGetRoundRobin: async () => await getRoundRobinUsecase.handle(),
    thenRankingShouldBe: (expectedRanking: RankingPlayer[]) => {
      const { ranking } = globalStore.getState();
      expect(ranking).toEqual(expectedRanking);
    },
    thenRoundRobinShouldBe: (expectedRoundRobin: RoundRobinPlayer[]) => {
      const { roundRobin } = globalStore.getState();
      expect(roundRobin).toEqual(expectedRoundRobin);
    },
  };
};
