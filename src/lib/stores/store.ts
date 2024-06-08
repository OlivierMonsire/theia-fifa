import { RoundRobinPlayer } from "./../models/round-robin-player";
import { create } from "zustand";
import { Player } from "../models/player";
import { Match } from "../models/match";
import { RankingPlayer } from "../models/ranking-player";
import { fakePlayers, fakeMatches } from "../fake-data";
import { FakeMatchGateway } from "../infras/fake-match.gateway";
import { FakePlayerGateway } from "../infras/fake-player.gateway";
import { FirestoreMatchGateway } from "../infras/firestore-match.gateway";
import { FirestorePlayerGateway } from "../infras/firestore-player.gateway";
import GetRoundRobinUsecase from "../usecases/get-round-robin.usecase";
import GetRankingUsecase from "../usecases/get-ranking.usecase";

const usedDB = import.meta.env.VITE_USED_DB;

const getMatchGateway = () => (usedDB === "firestore" ? new FirestoreMatchGateway() : new FakeMatchGateway());
const getPlayerGateway = () => (usedDB === "firestore" ? new FirestorePlayerGateway() : new FakePlayerGateway());

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

export const globalStore = create<GlobalStoreState>()((set, get) => {
  const playerGateway = getPlayerGateway();
  const matchGateway = getMatchGateway();

  const initializeData = async () => {
    if (playerGateway instanceof FakePlayerGateway) playerGateway.populate(fakePlayers);
    if (matchGateway instanceof FakeMatchGateway) matchGateway.populate(fakeMatches);

    const players = await playerGateway.getAll();
    const matches = await matchGateway.getAll();

    const { setPlayers, setMatches } = get();

    setPlayers(players);
    setMatches(matches);
  };

  initializeData();
  return {
    players: [],
    matches: [],
    matchPopup: null,

    roundRobin: [],
    ranking: [],

    setPlayers: (newPlayers) => set({ players: newPlayers }),
    setMatches: (newMatches) => set({ matches: newMatches }),
    setMatchPopup: (p1Id, p2Id) => {
      set({ matchPopup: { p1Id: p1Id, p2Id: p2Id } });
    },
    unsetMatchPopup: () => set({ matchPopup: null }),

    persistMatch: async (match) => {
      matchGateway.persist(match);
      const getRoundRobinUsecase = new GetRoundRobinUsecase();
      const getRankingUsecase = new GetRankingUsecase();
      await getRoundRobinUsecase.handle();
      await getRankingUsecase.handle();
    },

    setRoundRobin: (newRoundRobin) => set({ roundRobin: newRoundRobin }),
    setRanking: (newRanking) => set({ ranking: newRanking }),
  };
});
