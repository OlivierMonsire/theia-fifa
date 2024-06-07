import { useEffect, useState } from "react";
import { RoundRobinPlayer } from "../lib/models/round-robin-player";
import GetRoundRobinUsecase from "../lib/usecases/get-round-robin.usecase";
import "../styles/round-robin.css";
import RoundRobinHeader from "../components/round-robin/RoundRobinHeader";
import RoundRobinBody from "../components/round-robin/RoundRobinBody";
import { globalStore } from "../lib/stores/store";
import MatchPopup from "../components/MatchPopup";

const RoundRobin = () => {
  const getRoundRobinUsecase: GetRoundRobinUsecase = new GetRoundRobinUsecase();

  const [roundRobin, setRoundRobin] = useState<RoundRobinPlayer[]>([]);
  const matchPopup = globalStore((state) => state.matchPopup);

  useEffect(() => {
    async function getPlayers() {
      const newRoundRobin = await getRoundRobinUsecase.handle();
      setRoundRobin(newRoundRobin);
    }
    if (roundRobin.length === 0) {
      getPlayers();
    }
  });

  return (
    <>
      {matchPopup && <MatchPopup />}
      <h1 className="page-title">Tableau des matchs</h1>
      <div className="table-container">
        <table className="round-robin">
          <RoundRobinHeader players={roundRobin} />
          <RoundRobinBody players={roundRobin} />
        </table>
      </div>
    </>
  );
};

export default RoundRobin;
