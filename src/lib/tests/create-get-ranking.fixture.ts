import { FakeMatchGateway } from "../infras/fake-match.gateway";
import { FakePlayerGateway } from "../infras/fake-player.gateway";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { RankingPlayer } from "../models/ranking-player";
import GetRankingUsecase from "../usecases/get-ranking.usecase";

export const createGetRankingFixture = () => {
  const playerGateway = new FakePlayerGateway();
  const matchGateway = new FakeMatchGateway();
  const getRankingUsecase = new GetRankingUsecase();
  let ranking: RankingPlayer[] = [];
  return {
    givenPlayers: (newPlayers: Player[]) => {
      playerGateway.populate(newPlayers);
    },
    givenMatches: (newMatches: Match[]) => {
      matchGateway.populate(newMatches);
    },
    whenGetRanking: async () => {
      ranking = await getRankingUsecase.handle(playerGateway, matchGateway);
    },
    thenRankingShouldBe: (expectedRanking: RankingPlayer[]) => {
      expect(ranking).toEqual(expectedRanking);
    },
  };
};
