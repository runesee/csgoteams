import PlayerData from "../player/player-data";

export default interface TeamData {
  id: number;
  ranking: number;
  name: string;
  logo: string;
  players: PlayerData[];
}
