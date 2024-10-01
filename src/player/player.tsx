import "./player.css";
import PlayerData from "./player-data";

interface PlayerProps {
  player: PlayerData;
}

export default function Player({
  player: {
    fullname: fullnameWithNickname,
    image,
    nickname,
    country: { name: countryName, flag: countryFlagImage }
  }
}: PlayerProps) {
  // Remove the nickname from the fullname
  const fullname: string = fullnameWithNickname
    .split(" ")
    .filter((name) => name !== `'${nickname}'`)
    .join(" ");

  return (
    <div className="player">
      <img src={image} className="player-image" />
      <h1 className="player-nickname">{nickname}</h1>
      <p className="player-fullname">{fullname} </p>
      <div className="player-country">
        <img src={countryFlagImage} className="player-country-flag" />
        <p className="player-country-name">{countryName}</p>
      </div>
    </div>
  );
}
