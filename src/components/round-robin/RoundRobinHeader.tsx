import appStore from "../../lib/stores/app-store";

const RoundRobinHeader = () => {
  const { roundRobin } = appStore((state) => ({
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
