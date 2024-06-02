const Ranking = () => {
  const labels = ["P", "J", "V", "N", "D", "BM", "BE", "Diff", "Pts"];

  const joueurs = [
    {
      name: "Player 1",
      rank: 1,
      points: 20,
      goalsScored: 15,
      goalsConceded: 5,
      matchesPlayed: 10,
      wins: 8,
      losses: 1,
      draws: 1,
    },
    {
      name: "Player 2",
      rank: 2,
      points: 18,
      goalsScored: 12,
      goalsConceded: 8,
      matchesPlayed: 9,
      wins: 6,
      losses: 2,
      draws: 1,
    },
    {
      name: "Player 3",
      rank: 3,
      points: 15,
      goalsScored: 10,
      goalsConceded: 7,
      matchesPlayed: 8,
      wins: 4,
      losses: 3,
      draws: 1,
    },
  ];

  const displayedLabels = () => {
    return labels.map((l) => <th>{l}</th>);
  };

  const displayedTableRows = () => {
    return joueurs.map((joueur, index) => (
      <tr key={index}>
        <td>{joueur.rank}</td>
        <td>{joueur.name}</td>
        <td>{joueur.points}</td>
        <td>{joueur.goalsScored}</td>
        <td>{joueur.goalsConceded}</td>
        <td>{joueur.matchesPlayed}</td>
        <td>{joueur.wins}</td>
        <td>{joueur.losses}</td>
        <td>{joueur.draws}</td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>{displayedLabels()}</tr>
        </thead>
        <tbody>
          {displayedTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
