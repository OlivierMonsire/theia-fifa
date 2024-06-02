import { Player } from "./models/player";
import { Match } from "./models/match";

export const fakePlayers: Player[] = [
  { id: "player-1", name: "Jack" },
  { id: "player-2", name: "Emma" },
  { id: "player-3", name: "Estelle" },
  { id: "player-4", name: "Jean-Paul" },
  { id: "player-5", name: "Emilien" },
  { id: "player-6", name: "Emilien" },
  { id: "player-7", name: "Anastatia" },
  { id: "player-8", name: "Arold" },
  { id: "player-9", name: "Aimée" },
  { id: "player-10", name: "Rose" },
];

export const fakeMatches: Match[] = [
  { homePlayer: { id: "player-1", goals: 11 }, visitorPlayer: { id: "player-3", goals: 3 } },
  { homePlayer: { id: "player-1", goals: 1 }, visitorPlayer: { id: "player-2", goals: 0 } },
];
