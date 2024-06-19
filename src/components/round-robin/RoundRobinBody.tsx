import { globalStore } from "../../lib/stores/store";

const RoundRobinBody = () => {
  const { roundRobin, setMatchPopup } = globalStore((state) => ({
    roundRobin: state.roundRobin,
    setMatchPopup: state.setMatchPopup,
  }));

  const getResult = (playerId: string, opponentId: string) => {
    const player = roundRobin.find(({ id }) => playerId === id);
    const result = player!.results.find((op) => opponentId === op.opponentId);
    return result?.score;
  };

  const updateMatchDetails = (pId: string, opId: string) => {
    setMatchPopup(pId, opId);
  };

  return (
    <tbody>
      {roundRobin.map((p) => (
        <tr key={p.id}>
          <th>{p.name}</th>
          {roundRobin.map((op) => {
            return p.id === op.id ? (
              <td key={op.id} className="same-user" />
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
