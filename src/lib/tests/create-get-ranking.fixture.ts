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
  const store = globalStore;
  let ranking: RankingPlayer[] = [];
  let roundRobin: RoundRobinPlayer[];
  return {
    givenPlayers: (players: Player[]) => {
      const setPlayers = store.getState().setPlayers;
      setPlayers(players);
    },
    givenMatches: (matches: Match[]) => {
      const setMatches = store.getState().setMatches;
      setMatches(matches);
    },
    whenGetRanking: async () => {
      ranking = await getRankingUsecase.handle(store.getState());
    },
    whenGetRoundRobin: async () => {
      roundRobin = await getRoundRobinUsecase.handle(store.getState());
    },
    thenRankingShouldBe: (expectedRanking: RankingPlayer[]) => {
      expect(ranking).toEqual(expectedRanking);
    },
    thenRoundRobinShouldBe: (expectedRoundRobin: RoundRobinPlayer[]) => {
      expect(roundRobin).toEqual(expectedRoundRobin);
    },
  };
};
