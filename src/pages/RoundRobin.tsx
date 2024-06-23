import "../styles/round-robin.css";
import RoundRobinHeader from "../components/round-robin/RoundRobinHeader";
import RoundRobinBody from "../components/round-robin/RoundRobinBody";
import MatchPopup from "../components/MatchPopup";
import appStore from "../lib/stores/app-store";

const RoundRobin = () => {
  const matchPopup = appStore((state) => state.matchPopup);
  return (
    <>
      {matchPopup && <MatchPopup />}
      <h1 className="page-title">Tableau des matchs</h1>
      <div className="table-container">
        <table className="round-robin">
          <RoundRobinHeader />
          <RoundRobinBody />
        </table>
      </div>
    </>
  );
};

export default RoundRobin;
