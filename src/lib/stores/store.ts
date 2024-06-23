import { RoundRobinPlayer } from "./../models/round-robin-player";
import { create, StoreApi } from "zustand";
import { Player } from "../models/player";
import { Match } from "../models/match";
import { RankingPlayer } from "../models/ranking-player";
import { MatchGateway } from "../models/gateways/match.gateway";
import { PlayerGateway } from "../models/gateways/player.gateway";
import GetRoundRobinUsecase from "../usecases/get-round-robin.usecase";
import GetRankingUsecase from "../usecases/get-ranking.usecase";

export interface GlobalStoreState {
  players: Player[];
  matches: Match[];
  matchPopup: { p1Id: string; p2Id: string } | null;

  roundRobin: RoundRobinPlayer[];
  ranking: RankingPlayer[];

  setPlayers: (newPlayers: Player[]) => void;
  setMatches: (newMatches: Match[]) => void;
  setMatchPopup: (p1Id: string, p2Id: string) => void;
  unsetMatchPopup: () => void;

  persistMatch: (match: Match) => void;

  setRoundRobin: (newRoundRobin: RoundRobinPlayer[]) => void;
  setRanking: (newRanking: RankingPlayer[]) => void;
}

export type MainStore = StoreApi<GlobalStoreState>;

export const createStore = ({ matchGateway }: { playerGateway: PlayerGateway; matchGateway: MatchGateway }) =>
  create<GlobalStoreState>()((set, get) => {
    return {
      players: [],
      matches: [],
      matchPopup: null,

      roundRobin: [],
      ranking: [],

      setPlayers: (newPlayers) => set((state) => ({ ...state, players: newPlayers })),
      setMatches: (newMatches) => set((state) => ({ ...state, matches: newMatches })),
      setMatchPopup: (p1Id, p2Id) => set((state) => ({ ...state, matchPopup: { p1Id, p2Id } })),
      unsetMatchPopup: () => set((state) => ({ ...state, matchPopup: null })),

      persistMatch: async (match) => {
        const updatedMatches = await matchGateway.persist(match);
        set((state) => ({ ...state, matches: updatedMatches }));
        const getRoundRobinUsecase = new GetRoundRobinUsecase();
        const getRankingUsecase = new GetRankingUsecase();
        getRoundRobinUsecase.handle(get());
        getRankingUsecase.handle(get());
      },

      setRoundRobin: (newRoundRobin) => set((state) => ({ ...state, roundRobin: newRoundRobin })),
      setRanking: (newRanking) => set((state) => ({ ...state, ranking: newRanking })),
    };
  });
