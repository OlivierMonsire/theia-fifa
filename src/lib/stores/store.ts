import { create } from "zustand";
import { Player } from "../models/player";
import { Match } from "../models/match";

export interface GlobalStoreState {
  players: Player[];
  matches: Match[];
  setPlayers: (newPlayers: Player[]) => void;
  setMatches: (newMatches: Match[]) => void;
}

export const globalStore = create<GlobalStoreState>()((set) => ({
  players: [],
  matches: [],
  setPlayers: (newPlayers: Player[]) => set({ players: newPlayers }),
  setMatches: (newMatches: Match[]) => set({ matches: newMatches }),
}));
