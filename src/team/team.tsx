import "./team.css";
import TeamData from "./team-data";
import Player from "../player/player";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useContext } from "react";
import { FavoritesContext } from "../favorites/favorites-provider";

interface TeamProps {
  team: TeamData;
}

export default function Team({
  team,
  team: { name: teamName, logo, ranking, players }
}: TeamProps) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div className="team" id="team">
      <div className="team-header">
        <div className="logo-name-and-star">
          <img src={logo} className="logo-image" id="logo-image" />
          <h1 className="team-name">{teamName}</h1>
          <div>
            {isFavorite(team) ? (
              <AiFillStar
                size={40}
                data-testid="fill-star"
                className="favorite-star"
                onClick={() => toggleFavorite(team)}
              />
            ) : (
              <AiOutlineStar
                size={40}
                data-testid="outline-star"
                className="favorite-star"
                onClick={() => toggleFavorite(team)}
              />
            )}
          </div>
        </div>
        <p className="ranking">Rank: {ranking} </p>
      </div>
      <div className="players">
        <div className="player-on-team">
          <Player player={players[0]} />
        </div>
        <div className="player-on-team">
          <Player player={players[1]} />
        </div>
        <div className="player-on-team">
          <Player player={players[2]} />
        </div>
        <div className="player-on-team">
          <Player player={players[3]} />
        </div>
        <div className="player-on-team">
          <Player player={players[4]} />
        </div>
      </div>
    </div>
  );
}
