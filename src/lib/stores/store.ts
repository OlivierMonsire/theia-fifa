import { RoundRobinPlayer } from "./../models/round-robin-player";
import { create } from "zustand";
import { Player } from "../models/player";
import { Match } from "../models/match";
import { RankingPlayer } from "../models/ranking-player";

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

  setRoundRobin: (newRoundRobin: RoundRobinPlayer[]) => void;
  setRanking: (newRanking: RankingPlayer[]) => void;
}

export const globalStore = create<GlobalStoreState>()((set) => ({
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

  setRoundRobin: (newRoundRobin) => set({ roundRobin: newRoundRobin }),
  setRanking: (newRanking) => set({ ranking: newRanking }),
}));
