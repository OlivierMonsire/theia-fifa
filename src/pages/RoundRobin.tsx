import { useEffect, useState } from "react";
import { RoundRobinPlayer } from "../lib/models/round-robin-player";
import GetRoundRobinUsecase from "../lib/usecases/get-round-robin.usecase";
import "../styles/round-robin.css";
import RoundRobinHeader from "../components/round-robin/RoundRobinHeader";
import RoundRobinBody from "../components/round-robin/RoundRobinBody";
import { globalStore } from "../lib/stores/store";

const RoundRobin = () => {

  const getRoundRobinUsecase: GetRoundRobinUsecase = new GetRoundRobinUsecase();

  const [players, setPlayers] = useState<RoundRobinPlayer[]>([]);

  useEffect(() => {
    async function getPlayers() {
      const newPlayers = await getRoundRobinUsecase.handle(globalStore.getState());

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
