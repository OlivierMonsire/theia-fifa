import { globalStore } from "../../lib/stores/store";

const RoundRobinHeader = () => {
  const { roundRobin } = globalStore((state) => ({
    roundRobin: state.roundRobin,
  }));
  return (
    <thead>
      <tr>
        <th></th>
        {roundRobin.map(({ id, name }) => (
          <th key={id}>{name}</th>
        ))}
      </tr>
    </thead>
  );
};
export default RoundRobinHeader;
