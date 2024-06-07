import { create } from "zustand";
import { Player } from "../models/player";
import { Match } from "../models/match";

export interface GlobalStoreState {
  players: Player[];
  matches: Match[];
  matchPopup: { p1Id: string; p2Id: string } | null;
  setPlayers: (newPlayers: Player[]) => void;
  setMatches: (newMatches: Match[]) => void;
  setMatchPopup: (p1Id: string, p2Id: string) => void;
  unsetMatchPopup: () => void;
}

export const globalStore = create<GlobalStoreState>()((set) => ({
  players: [],
  matches: [],
  matchPopup: null,

  setPlayers: (newPlayers) => set({ players: newPlayers }),
  setMatches: (newMatches) => set({ matches: newMatches }),
  setMatchPopup: (p1Id, p2Id) => {
    set({ matchPopup: { p1Id: p1Id, p2Id: p2Id } });
  },
  unsetMatchPopup: () => set({ matchPopup: null }),
}));
