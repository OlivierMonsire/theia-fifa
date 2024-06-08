import { globalStore } from "../lib/stores/store";

const Ranking = () => {
  const labels = ["P", "J", "MJ", "V", "N", "D", "BM", "BE", "Diff", "Pts"];

  const { ranking } = globalStore((state) => ({
    ranking: state.ranking,
  }));

  const displayedLabels = () => {
    return labels.map((l, i) => <th key={i}>{l}</th>);
  };

  const displayedTableRows = () => {
    return ranking.map((joueur, index) => (
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
