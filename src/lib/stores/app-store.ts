import { fakeMatches, fakePlayers } from "../fake-data";
import { FakeMatchGateway } from "../infras/fake-match.gateway";
import { FakePlayerGateway } from "../infras/fake-player.gateway";
import { FirestoreMatchGateway } from "../infras/firestore-match.gateway";
import { FirestorePlayerGateway } from "../infras/firestore-player.gateway";
import GetRankingUsecase from "../usecases/get-ranking.usecase";
import GetRoundRobinUsecase from "../usecases/get-round-robin.usecase";
import { createStore } from "./store";

const usedDB = import.meta.env.VITE_USED_DB;

let playerGateway;
let matchGateway;

if (usedDB === "firestore") {
  playerGateway = new FirestorePlayerGateway();
  matchGateway = new FirestoreMatchGateway();
} else {
  playerGateway = new FakePlayerGateway();
  matchGateway = new FakeMatchGateway();
  playerGateway.populate(fakePlayers);
  matchGateway.populate(fakeMatches);
}

const appStore = createStore({ playerGateway, matchGateway });

const players = await playerGateway.getAll();
const matches = await matchGateway.getAll();

const { setPlayers, setMatches } = appStore.getState();

setPlayers(players);
setMatches(matches);

const getRoundRobinUsecase = new GetRoundRobinUsecase();
const getRankingUsecase = new GetRankingUsecase();
await getRoundRobinUsecase.handle(appStore.getState());
await getRankingUsecase.handle(appStore.getState());

export default appStore;
