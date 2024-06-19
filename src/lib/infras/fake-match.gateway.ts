import { MatchGateway } from "../models/gateways/match.gateway";
import { Match } from "../models/match";

export class FakeMatchGateway implements MatchGateway {
  private matches: Match[] = [];

  populate = (newMatches: Match[]) => this.matches.push(...newMatches);

  getAll = async (): Promise<Match[]> => {
    return Promise.resolve(this.matches);
  };

  persist = async (match: Match): Promise<Match[]> => {
    const index = this.matches.findIndex(
      (m) =>
        [match.homePlayerId, match.visitorPlayerId].includes(m.homePlayerId) &&
        [match.homePlayerId, match.visitorPlayerId].includes(m.visitorPlayerId)
    );

    if (index !== -1) {
      this.matches[index] = { ...this.matches[index], ...match };
    } else {
      match.id = `match-${this.matches.length + 1}`;
      this.matches.push(match);
    }

    return this.matches;
  };
}
