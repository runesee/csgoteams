import React, { useEffect, useState } from "react";
import TeamData from "../team/team-data";

interface FavoritesContextValue {
  isFavorite: (team: TeamData) => boolean;
  toggleFavorite: (team: TeamData) => void;
}

interface FavoritesProps {
  children: JSX.Element;
}

export const FavoritesContext = React.createContext<FavoritesContextValue>(
  {} as FavoritesContextValue
);

/*
    Contains state on whether a team is a favorite. This state is stored in local storage, and is kept in sync as long as the state is only changed by toggleFavorite(team); so don't mutate "isFavorites" in local storage directly.
*/
export function FavoritesProvider({ children }: FavoritesProps) {
  const [isFavorite, setIsFavorite] = useState<{ [teamId: number]: boolean }>(
    {}
  );

  //Initialize isFavorite with state from local storage.
  useEffect(() => {
    const maybeIsFavoriteJson: null | string =
      localStorage.getItem("isFavorite");
    if (maybeIsFavoriteJson === null) return;
    setIsFavorite(JSON.parse(maybeIsFavoriteJson));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        isFavorite: (team) => isFavorite[team.id] ?? false,
        toggleFavorite: (team) => {
          const toggledIsFavorite = {
            ...isFavorite,
            [team.id]: !(isFavorite[team.id] ?? false)
          };
          //Toggle favorites both in this component's state and in local storage.
          setIsFavorite(toggledIsFavorite);
          localStorage.setItem("isFavorite", JSON.stringify(toggledIsFavorite));
        }
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
