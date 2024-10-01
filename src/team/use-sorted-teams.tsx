import { useEffect, useState } from "react";
import { useTeams } from "./use-teams";
import PlayerData from "../player/player-data";
import TeamData from "./team-data";
import { FavoritesContext } from "../favorites/favorites-provider";
import { useContext } from "react";

export default function useSortedTeams(
  selectedCountry: string,
  showInternational: boolean,
  sortOption: string,
  showFavorite: boolean
) {
  const teamsFromAPI = useTeams();

  const { isFavorite } = useContext(FavoritesContext);

  const [teams, setTeams] = useState<TeamData[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [teamsWithPlayersFromCountry, setTeamsWithPlayersFromCountry] =
    useState<Map<string, TeamData[]>>(new Map());

  function allEqualCountries(arr: string[]) {
    return arr.every((v) => v === arr[0]);
  }

  useEffect(() => {
    if (teamsFromAPI !== undefined) {
      const teamsWithPlayersFromCountry: Map<string, TeamData[]> = new Map();
      // Iterate over all teams
      for (let i = 0; i < teamsFromAPI.length; i++) {
        const players: PlayerData[] = teamsFromAPI[i].players;
        // Iterate over all players in the team
        for (let j = 0; j < players.length; j++) {
          const country = players[j].country.name;
          // If the country is already in the map, add the team to the array of teams from that country if it isn't already there
          if (teamsWithPlayersFromCountry.has(country)) {
            if (
              !teamsWithPlayersFromCountry
                .get(country)
                ?.includes(teamsFromAPI[i])
            ) {
              teamsWithPlayersFromCountry.get(country)?.push(teamsFromAPI[i]);
            }
          } else {
            // If the country isn't in the map, add it with an array containing the team as the value
            teamsWithPlayersFromCountry.set(country, [teamsFromAPI[i]]);
          }
        }
      }
      // Set the teamsWithPlayersFromCountry state to the map
      setTeamsWithPlayersFromCountry(teamsWithPlayersFromCountry);

      // Set the countries state to the keys of the map (the countries) sorted alphabetically
      setCountries(Array.from(teamsWithPlayersFromCountry.keys()).sort());
    }
  }, [teamsFromAPI]);

  useEffect(() => {
    if (teamsFromAPI !== undefined) {
      let teamsCopy: TeamData[] = [];
      if (selectedCountry !== "") {
        // If a country is selected, set teamsCopy to (a copy of) the array of teams from that country
        teamsCopy = [
          ...(teamsWithPlayersFromCountry.get(selectedCountry) ?? [])
        ];
      } else {
        // If no country is selected, set the teamsCopy to (a copy of) the original array of teams
        teamsCopy = [...teamsFromAPI];
      }

      // If the showInternational checkbox is not checked, filter out international teams
      if (!showInternational) {
        teamsCopy = teamsCopy.filter((team) =>
          allEqualCountries(team.players.map((player) => player.country.name))
        );
      }

      if (showFavorite) {
        teamsCopy = teamsCopy.filter((team) => isFavorite(team));
      }

      // Sort the teams according to the selected sort option
      switch (sortOption) {
        case "rank-ascending":
          teamsCopy.sort((a, b) => a.ranking - b.ranking);
          break;
        case "rank-descending":
          teamsCopy.sort((a, b) => b.ranking - a.ranking);
          break;
        case "name-a-z":
          teamsCopy.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-z-a":
          teamsCopy.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
      setTeams(teamsCopy);
    }
  }, [
    sortOption,
    selectedCountry,
    teamsFromAPI,
    showInternational,
    showFavorite,
    teamsWithPlayersFromCountry,
    isFavorite
  ]);

  return { teams, countries };
}
