import { Match } from "../match";

export interface MatchGateway {
  getAll(): Promise<Match[]>;
}
