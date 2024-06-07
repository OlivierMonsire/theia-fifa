import { Match } from "../models/match";
import { Player } from "../models/player";
import { RoundRobinPlayer } from "../models/round-robin-player";
import GetRoundRobinUsecase from "../usecases/get-round-robin.usecase";
import { globalStore } from "../stores/store";

export const createGetRoundRobinFixture = () => {
  let roundRobin: RoundRobinPlayer[];
  const getRoundRobinUsecase = new GetRoundRobinUsecase();
  const store = globalStore;
  return {
    givenPlayers: (players: Player[]) => {
      const setPlayers = store.getState().setPlayers;
      setPlayers(players);
    },
    givenMatches: (matches: Match[]) => {
      const setMatches = store.getState().setMatches;
      setMatches(matches);
    },
    whenGetRoundRobin: async () => {
      roundRobin = await getRoundRobinUsecase.handle(store.getState());
    },
    thenRoundRobinShouldBe: (expectedRoundRobin: RoundRobinPlayer[]) => {
      expect(roundRobin).toEqual(expectedRoundRobin);
    },
  };
};
