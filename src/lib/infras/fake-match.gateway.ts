import { MatchGateway } from "../models/gateways/match.gateway";
import { Match } from "../models/match";

export class FakeMatchGateway implements MatchGateway {
  private matches: Match[] = [];

  populate = (newMatches: Match[]) => this.matches.push(...newMatches);

  getAll = async (): Promise<Match[]> => {
    return Promise.resolve(this.matches);
  };
}
