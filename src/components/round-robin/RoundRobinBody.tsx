import { RoundRobinPlayer } from "../../lib/models/round-robin-player";
import { globalStore } from "../../lib/stores/store";

const RoundRobinBody: React.FC<{ players: RoundRobinPlayer[] }> = ({ players }) => {
  const getResult = (playerId: string, opponentId: string) => {
    const player = players.find(({ id }) => playerId === id);
    const result = player!.results.find((op) => opponentId === op.opponentId);
    return result?.score;
  };

  const updateMatchDetails = (pId: string, opId: string) => {
    const storeState = globalStore.getState();
    storeState.setMatchPopup(pId, opId);
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
              <td onClick={() => updateMatchDetails(p.id, op.id)} key={op.id}>
                {getResult(p.id, op.id)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
export default RoundRobinBody;
