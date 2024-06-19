import { Match } from "../match";

export interface MatchGateway {
  getAll(): Promise<Match[]>;
  persist(match: Match): Promise<Match[]>;
}
