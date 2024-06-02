import { useEffect, useState } from "react";
import { RoundRobinPlayer } from "../lib/models/round-robin-player";
import { FakePlayerGateway } from "../lib/infras/fake-player.gateway";
import { FakeMatchGateway } from "../lib/infras/fake-match.gateway";
import GetRoundRobinUsecase from "../lib/usecases/retrieve-round-robin.usecase";
import { fakeMatches, fakePlayers } from "../lib/fake-data";
import "../styles/round-robin.css";
import { FirestorePlayerGateway } from "../lib/infras/firestore-player.gateway";
import { FirestoreMatchGateway } from "../lib/infras/firestore-match.gateway";

const usedDB = import.meta.env.VITE_USED_DB;


const RoundRobin = () => {
  let playerGateway: FakePlayerGateway | FirestorePlayerGateway;
  let matchGateway: FakeMatchGateway | FirestoreMatchGateway;

  if (usedDB === 'firestore') {
    playerGateway = new FirestorePlayerGateway();
    matchGateway = new FirestoreMatchGateway();
  } else {
    playerGateway = new FakePlayerGateway();
    matchGateway = new FakeMatchGateway();
    playerGateway.populate(fakePlayers);
    matchGateway.populate(fakeMatches);
  }

  const getRoundRobinUsecase: GetRoundRobinUsecase = new GetRoundRobinUsecase();

  const [players, setPlayers] = useState<RoundRobinPlayer[]>([]);

  useEffect(() => {
    async function getPlayers() {
      const newPlayers = await getRoundRobinUsecase.handle(playerGateway, matchGateway);

      setPlayers(newPlayers);
    }
    if (players.length === 0) {
      getPlayers();
    }
  });

  const getResult = (playerId: string, opponentId: string) => {
    const player = players.find(({ id }) => playerId === id);
    const score = player!.results.find((op) => opponentId === op.opponentId);
    return score?.score;
  };

  return (
    <>
      <div className="round-robin-container">
        <table className="round-robin">
          <thead>
            <tr>
              <th></th>
              {players.map(({ id, name }) => (
                <th key={id}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id}>
                <th>{p.name}</th>
                {players.map((op) => {
                  if (p.id === op.id) {
                    return <td key={op.id} className="empty" />;
                  } else {
                    return <td key={op.id}>{getResult(p.id, op.id)}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoundRobin;
