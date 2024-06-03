import { useState, useEffect } from "react";
import { fakePlayers, fakeMatches } from "../lib/fake-data";
import { FakeMatchGateway } from "../lib/infras/fake-match.gateway";
import { FakePlayerGateway } from "../lib/infras/fake-player.gateway";
import { FirestoreMatchGateway } from "../lib/infras/firestore-match.gateway";
import { FirestorePlayerGateway } from "../lib/infras/firestore-player.gateway";
import GetRankingUsecase from "../lib/usecases/get-ranking.usecase";
import { RankingPlayer } from "../lib/models/ranking-player";

const Ranking = () => {
  const labels = ["P", "J", "MJ", "V", "N", "D", "BM", "BE", "Diff", "Pts"];

  const usedDB = import.meta.env.VITE_USED_DB;

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

  const getRankingUsecase: GetRankingUsecase = new GetRankingUsecase();

  const [players, setPlayers] = useState<RankingPlayer[]>([]);

  useEffect(() => {
    async function getPlayers() {
      const newPlayers = await getRankingUsecase.handle(playerGateway, matchGateway);

      setPlayers(newPlayers);
    }
    if (players.length === 0) {
      getPlayers();
    }
  });

  const displayedLabels = () => {
    return labels.map((l, i) => <th key={i}>{l}</th>);
  };

  const displayedTableRows = () => {
    return players.map((joueur, index) => (
      <tr key={index}>
        <td>{joueur.rank}</td>
        <td>{joueur.name}</td>
        <td>{joueur.matchesPlayed}</td>
        <td>{joueur.wins}</td>
        <td>{joueur.draws}</td>
        <td>{joueur.losses}</td>
        <td>{joueur.goalsScored}</td>
        <td>{joueur.goalsConceded}</td>
        <td>{joueur.GoalsDiff}</td>
        <td>{joueur.points}</td>
      </tr>
    ));
  };

  return (
    <>
      <h1 className="page-title">Classement</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>{displayedLabels()}</tr>
          </thead>
          <tbody>{displayedTableRows()}</tbody>
        </table>
      </div>
    </>
  );
};

export default Ranking;
