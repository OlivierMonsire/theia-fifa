import { FakeMatchGateway } from "../infras/fake-match.gateway";
import { FakePlayerGateway } from "../infras/fake-player.gateway";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { RankingPlayer } from "../models/ranking-player";
import { RoundRobinPlayer } from "../models/round-robin-player";
import { createStore } from "../stores/store";
import GetRankingUsecase from "../usecases/get-ranking.usecase";
import GetRoundRobinUsecase from "../usecases/get-round-robin.usecase";

export type Fixture = ReturnType<typeof createFixture>;

export const createFixture = () => {
  const getRankingUsecase = new GetRankingUsecase();
  const getRoundRobinUsecase = new GetRoundRobinUsecase();
  const playerGateway = new FakePlayerGateway();
  const matchGateway = new FakeMatchGateway();
  const globalStore = createStore({ playerGateway, matchGateway });
  const { setPlayers, setMatches } = globalStore.getState();
  return {
    givenPlayers: (players: Player[]) => setPlayers(players),
    givenMatches: (matches: Match[]) => setMatches(matches),
    whenGetRanking: async () => await getRankingUsecase.handle(globalStore.getState()),
    whenGetRoundRobin: async () => await getRoundRobinUsecase.handle(globalStore.getState()),
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
