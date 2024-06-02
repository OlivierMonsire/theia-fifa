import { Player } from "../player";

export interface PlayerGateway {
  getAll(): Promise<Player[]>;
}
