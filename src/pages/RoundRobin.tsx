import { useEffect, useState } from "react";
import { RoundRobinPlayer } from "../lib/models/round-robin-player";
import { FakePlayerGateway } from "../lib/infras/fake-player.gateway";
import { FakeMatchGateway } from "../lib/infras/fake-match.gateway";
import GetRoundRobinUsecase from "../lib/usecases/get-round-robin.usecase";
import { fakeMatches, fakePlayers } from "../lib/fake-data";
import "../styles/round-robin.css";
import { FirestorePlayerGateway } from "../lib/infras/firestore-player.gateway";
import { FirestoreMatchGateway } from "../lib/infras/firestore-match.gateway";
import RoundRobinHeader from "../components/round-robin/RoundRobinHeader";
import RoundRobinBody from "../components/round-robin/RoundRobinBody";

const usedDB = import.meta.env.VITE_USED_DB;

const RoundRobin = () => {
  let playerGateway: FakePlayerGateway | FirestorePlayerGateway;
  let matchGateway: FakeMatchGateway | FirestoreMatchGateway;

  if (usedDB === "firestore") {
    playerGateway = new FirestorePlayerGateway();
    matchGateway = new FirestoreMatchGateway();
  } else {
    playerGateway = new FakePlayerGateway();
    matchGateway = new FakeMatchGateway();
    playerGateway.populate(fakePlayers);
    matchGateway.populate(fakeMatches);
  }

  const getRoundRobinUsecase: GetRoundRobinUsecase = new GetRoundRobinUsecase();

  const [players, setPlayers] = useState<RoundRobinPlayer[]>([]);

  useEffect(() => {
    async function getPlayers() {
      const newPlayers = await getRoundRobinUsecase.handle(playerGateway, matchGateway);

      setPlayers(newPlayers);
    }
    if (players.length === 0) {
      getPlayers();
    }
  });

  return (
    <>
      <h1 className="page-title">Tableau des matchs</h1>
      <div className="table-container">
        <table className="round-robin">
          <RoundRobinHeader players={players} />
          <RoundRobinBody players={players} />
        </table>
      </div>
    </>
  );
};

export default RoundRobin;
