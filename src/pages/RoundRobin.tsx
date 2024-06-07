import { useEffect } from "react";
import GetRoundRobinUsecase from "../lib/usecases/get-round-robin.usecase";
import "../styles/round-robin.css";
import RoundRobinHeader from "../components/round-robin/RoundRobinHeader";
import RoundRobinBody from "../components/round-robin/RoundRobinBody";
import { globalStore } from "../lib/stores/store";
import MatchPopup from "../components/MatchPopup";

const RoundRobin = () => {
  const { roundRobin } = globalStore((state) => ({
    roundRobin: state.roundRobin,
  }));
  const getRoundRobinUsecase: GetRoundRobinUsecase = new GetRoundRobinUsecase();

  const matchPopup = globalStore((state) => state.matchPopup);

  useEffect(() => {
    async function getRoundRobin() {
      await getRoundRobinUsecase.handle();
    }
    if (roundRobin.length === 0) {
      getRoundRobin();
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
