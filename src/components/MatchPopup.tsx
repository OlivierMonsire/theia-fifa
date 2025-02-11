import { FormEvent, useState } from "react";
import { Match } from "../lib/models/match";
import "../styles/match-popup.css";
import appStore from "../lib/stores/app-store";

export const MatchPopup = () => {
  const { matchPopup, players, matches, unsetMatchPopup, persistMatch } = appStore((state) => state);

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newMatch: Match = {
      id: match?.id || "",
      homePlayerId,
      homePlayerGoals,
      visitorPlayerId,
      visitorPlayerGoals,
    };

    persistMatch(newMatch);

    unsetMatchPopup();
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
          <div className="form-columns-wrapper">
            <div>
              <label>
                <span>{homePlayerName}</span>
                <input
                  type="number"
                  min={0}
                  max={99}
                  defaultValue={homePlayerGoals}
                  name="home-player"
                  onChange={(e) => setHomePlayerGoals(Number(e.target.value))}
                />
              </label>
            </div>
            <span className="versus-label">vs</span>
            <div>
              <label>
                <span>{visitorPlayerName}</span>
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
          </div>

          <button type="submit">{match ? "Mettre à jour le score" : "Ajouter le match"}</button>
        </form>
      </div>
    </div>
  );
};

export default MatchPopup;
