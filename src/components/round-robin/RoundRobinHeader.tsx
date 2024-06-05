import { RoundRobinPlayer } from "../../lib/models/round-robin-player";

const RoundRobinHeader: React.FC<{ players: RoundRobinPlayer[] }> = ({ players }) => {
  return (
    <thead>
      <tr>
        <th></th>
        {players.map(({ id, name }) => (
          <th key={id}>{name}</th>
        ))}
      </tr>
    </thead>
  );
};
export default RoundRobinHeader;
