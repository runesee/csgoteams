import Team from "../team/team";
import "./mainpage.css";
import { useEffect, useState } from "react";
import TeamNavigation from "./team-navigation/team-navigation";
import useSortedTeams from "../team/use-sorted-teams";

export default function Mainpage() {
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showInternational, setShowInternational] = useState<boolean>(true);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);

  const { teams, countries } = useSortedTeams(
    selectedCountry,
    showInternational,
    sortOption,
    showFavorite
  );
  const [displayedTeamIndex, setDisplayedTeamIndex] = useState<number>(0);

  function handleChangeSort(newSortOption: string) {
    // Set the sort option state to the new sort option and update the session storage
    setSortOption(newSortOption);
    sessionStorage.setItem("sortOption", newSortOption);
  }

  function handleChangeCountry(newSelectedCountry: string) {
    // Set the selected country state to the new selected country and update the session storage
    setSelectedCountry(newSelectedCountry);
    sessionStorage.setItem("selectedCountry", newSelectedCountry);
  }

  function handleChangeInternational(newShowInternational: boolean) {
    // Set the show international state to the new value for show international and update the session storage
    setShowInternational(newShowInternational);
    sessionStorage.setItem(
      "showInternational",
      newShowInternational.toString()
    );
  }

  function handleChangeFavorite(newShowFavorite: boolean) {
    setShowFavorite(newShowFavorite);
    sessionStorage.setItem("showFavorite", newShowFavorite.toString());
  }

  useEffect(() => {
    // Load the sort option, selected country and show international from session storage
    // and set the state to the values from session storage if they exist
    const sortOptionFromSessionStorage = sessionStorage.getItem("sortOption");
    if (sortOptionFromSessionStorage !== null) {
      setSortOption(sortOptionFromSessionStorage);
    }
    const selectedCountryFromSessionStorage =
      sessionStorage.getItem("selectedCountry");
    if (selectedCountryFromSessionStorage !== null) {
      setSelectedCountry(selectedCountryFromSessionStorage);
    }
    const showInternationalFromSessionStorage =
      sessionStorage.getItem("showInternational");
    if (showInternationalFromSessionStorage !== null) {
      setShowInternational(JSON.parse(showInternationalFromSessionStorage));
    }
    const showFavoriteFromSessionStorage =
      sessionStorage.getItem("showFavorite");
    if (showFavoriteFromSessionStorage !== null) {
      setShowFavorite(JSON.parse(showFavoriteFromSessionStorage));
    }
  }, []);

  useEffect(() => {
    setDisplayedTeamIndex(0);
  }, [sortOption, selectedCountry, showInternational, showFavorite]);

  return (
    <div className="body">
      <div className="options">
        <div className="filter-and-sort">
          <div className="label">
            <p>Filter by country: </p>
            <p>Sort options: </p>
          </div>
          <div className="select">
            <select
              className="dropdown"
              data-testid="selected-country-dropdown"
              value={selectedCountry}
              name="country"
              id="country"
              onChange={(e) => handleChangeCountry(e.target.value)}
            >
              <option value="" data-testid="country-select-option">
                All countries
              </option>
              {countries.map((country) => (
                <option
                  key={country}
                  value={country}
                  data-testid="country-select-option"
                >
                  {country}
                </option>
              ))}
            </select>
            <select
              className="dropdown"
              data-testid="sort-option-dropdown"
              value={sortOption}
              name="sort"
              id="sort"
              onChange={(e) => handleChangeSort(e.target.value)}
            >
              <option value="rank-ascending">By rank (ascending)</option>
              <option value="rank-descending">By rank (descending)</option>
              <option value="name-a-z">By team name (a-z)</option>
              <option value="name-z-a">By team name (z-a)</option>
            </select>
          </div>
        </div>
        <div className="checkboxes">
          <div className="label">
            <p>Show international teams: </p>
            <p>Show only favorite teams: </p>
          </div>
          <div className="select">
            <input
              data-testid="international-checkbox"
              checked={showInternational}
              type="checkbox"
              name="international"
              id="international"
              onChange={(e) => handleChangeInternational(e.target.checked)}
            />
            <input
              data-testid="favorite-checkbox"
              type="checkbox"
              name="favorite"
              id="favorite"
              checked={showFavorite}
              onChange={(e) => handleChangeFavorite(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <hr className="solid" />
      <div className="teams-container" data-testid="teams">
        {teams.length > 0 ? (
          <div className="teams-inner-wrapper">
            <Team team={teams[displayedTeamIndex]} />
            <TeamNavigation
              displayedTeamIndex={displayedTeamIndex}
              setDisplayedTeamIndex={setDisplayedTeamIndex}
              teams={teams.length}
            />
          </div>
        ) : (
          "No teams match your current filters"
        )}
      </div>
    </div>
  );
}
