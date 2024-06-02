import { FakeMatchGateway } from "../infras/fake-match.gateway";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { RoundRobinPlayer } from "../models/round-robin-player";
import { FakePlayerGateway } from "../infras/fake-player.gateway";
import GetRoundRobinUsecase from "../usecases/retrieve-round-robin.usecase";

export const createGetRoundRobinFixture = () => {
  let roundRobin: RoundRobinPlayer[];
  const playerGateway = new FakePlayerGateway();
  const matchGateway = new FakeMatchGateway();
  const getRoundRobinUsecase = new GetRoundRobinUsecase();
  return {
    givenPlayers: (players: Player[]) => {
      playerGateway.populate(players);
    },
    givenMatches: (matches: Match[]) => {
      matchGateway.populate(matches);
    },
    whenGetRoundRobin: async () => {
      roundRobin = await getRoundRobinUsecase.handle(playerGateway, matchGateway);
    },
    thenRoundRobinShouldBe: (expectedRoundRobin: RoundRobinPlayer[]) => {
      expect(roundRobin).toEqual(expectedRoundRobin);
    },
  };
};
