import { PlayerGateway } from "../models/gateways/player.gateway";
import { Player } from "../models/player";

export class FakePlayerGateway implements PlayerGateway {
  players: Player[] = [];

  populate = (newPlayers: Player[]) => this.players.push(...newPlayers);

  getAll = async (): Promise<Player[]> => {
    return Promise.resolve(this.players);
  };
}
