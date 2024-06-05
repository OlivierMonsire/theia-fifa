import { RoundRobinPlayer } from "../../lib/models/round-robin-player";

const RoundRobinBody: React.FC<{ players: RoundRobinPlayer[] }> = ({ players }) => {
  const getResult = (playerId: string, opponentId: string) => {
    const player = players.find(({ id }) => playerId === id);
    const score = player!.results.find((op) => opponentId === op.opponentId);
    return score?.score;
  };
  return (
    <tbody>
      {players.map((p) => (
        <tr key={p.id}>
          <th>{p.name}</th>
          {players.map((op) => {
            return p.id === op.id ? (
              <td key={op.id} className="empty" />
            ) : (
              <td key={op.id}>{getResult(p.id, op.id)}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
export default RoundRobinBody;
