import { Match } from "../models/match";
import { Player } from "../models/player";
import { RankingPlayer } from "../models/ranking-player";
import { globalStore } from "../stores/store";
import GetRankingUsecase from "../usecases/get-ranking.usecase";

export const createGetRankingFixture = () => {
  const getRankingUsecase = new GetRankingUsecase();
  const store = globalStore;
  let ranking: RankingPlayer[] = [];
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
    thenRankingShouldBe: (expectedRanking: RankingPlayer[]) => {
      expect(ranking).toEqual(expectedRanking);
    },
  };
};
