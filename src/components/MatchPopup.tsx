import { FormEvent, useState } from "react";
import { globalStore } from "../lib/stores/store";
import { Match } from "../lib/models/match";

export const MatchPopup = () => {
  const { matchPopup, players, matches, unsetMatchPopup } = globalStore((state) => state);

  const match = matches.find(
    (m) =>
      [matchPopup?.p1Id, matchPopup?.p2Id].includes(m.homePlayerId) &&
      [matchPopup?.p1Id, matchPopup?.p2Id].includes(m.visitorPlayerId)
  );

  const [homePlayerGoals, setHomePlayerGoals] = useState(match?.homePlayerGoals || 0);
  const [visitorPlayerGoals, setVisitorPlayerGoals] = useState(match?.visitorPlayerGoals || 0);

  if (!matchPopup) return <></>;

  const homePlayerId = match ? match.homePlayerId : matchPopup.p1Id;
  const visitorPlayerId = match ? match.visitorPlayerId : matchPopup.p2Id;

  const homePlayerName = players.find((p) => p.id === homePlayerId)!.name;
  const visitorPlayerName = players.find((p) => p.id === visitorPlayerId)!.name;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newMatch: Match = {
      id: match?.id || "",
      homePlayerId,
      homePlayerGoals,
      visitorPlayerId,
      visitorPlayerGoals,
    };

    console.log(newMatch);
  };

  const closePopup = () => {
    unsetMatchPopup();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <div onClick={handleBackgroundClick} className="match-popup-bg">
      <div className="match-popup">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              {homePlayerName}:
              <input
                type="number"
                min={0}
                max={99}
                value={homePlayerGoals}
                name="home-player"
                onChange={(e) => setHomePlayerGoals(Number(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>
              {visitorPlayerName}:
              <input
                type="number"
                min={0}
                max={99}
                defaultValue={visitorPlayerGoals}
                name="visitor-player"
                onChange={(e) => setVisitorPlayerGoals(Number(e.target.value))}
              />
            </label>
          </div>
          <button type="submit">Mettre à jour le score</button>
        </form>
      </div>
    </div>
  );
};

export default MatchPopup;
