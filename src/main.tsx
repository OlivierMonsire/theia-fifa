import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { globalStore } from "./lib/stores/store";
import { FakePlayerGateway } from "./lib/infras/fake-player.gateway";
import { FakeMatchGateway } from "./lib/infras/fake-match.gateway";
import { fakePlayers, fakeMatches } from "./lib/fake-data";
import { FirestoreMatchGateway } from "./lib/infras/firestore-match.gateway";
import { FirestorePlayerGateway } from "./lib/infras/firestore-player.gateway";

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

const players = await playerGateway.getAll();
const matches = await matchGateway.getAll();

const setPlayers = globalStore.getState().setPlayers;
const setMatches = globalStore.getState().setMatches;

setPlayers(players);
setMatches(matches);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
