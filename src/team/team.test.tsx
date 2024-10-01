import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import TeamData from "./team-data";
import PlayerData from "../player/player-data";
import Team from "./team";
import { FavoritesProvider } from "../favorites/favorites-provider";

// Define a team with 5 instances of mock data for players
const playerData1: PlayerData = {
  fullname: "Dan Madesclaire",
  image: "",
  nickname: "apEX",
  country: { name: "France", flag: "" }
};

const playerData4: PlayerData = {
  fullname: "Mathieu Herbaut",
  image: "",
  nickname: "ZywOo",
  country: { name: "France", flag: "" }
};

const playerData2: PlayerData = {
  fullname: "Lotan Giladi",
  image: "",
  nickname: "Spinx",
  country: { name: "Israel", flag: "" }
};

const playerData3: PlayerData = {
  fullname: "Emil Reif",
  image: "",
  nickname: "Magisk",
  country: { name: "Denmark", flag: "" }
};

const playerData5: PlayerData = {
  fullname: "Peter Rasmussen",
  image: "",
  nickname: "dupreeh",
  country: { name: "Denmark", flag: "" }
};

const playerArray: PlayerData[] = [];
playerArray[0] = playerData1;
playerArray[1] = playerData2;
playerArray[2] = playerData3;
playerArray[3] = playerData4;
playerArray[4] = playerData5;

const teamData: TeamData = {
  id: 9565,
  ranking: 1,
  name: "Vitality",
  logo: "",
  players: playerArray
};

describe("Team", () => {
  test("Team component rendered correctly", () => {
    const { container } = render(
      <FavoritesProvider>
        <Team team={teamData} />
      </FavoritesProvider>
    );

    // Checks if team component exists in the document
    expect(container.firstChild).toHaveClass("team");

    // Checks if all elements of the team component exists in the document
    expect(container.querySelector(".logo-image")).toBeInTheDocument();
    expect(container.querySelector(".team-name")).toBeInTheDocument();
    expect(container.querySelector(".ranking")).toBeInTheDocument();
    expect(container.querySelector(".logo-name-and-star")).toBeInTheDocument();
    expect(container.querySelector(".favorite-star")).toBeInTheDocument();
    expect(container.querySelector(".players")).toBeInTheDocument();

    // Check that the team logo and name are present inside their container
    const children =
      container.querySelector(".logo-name-and-star")?.childNodes || [];
    expect(children).toHaveLength(3);
    expect(children[0]).toHaveClass("logo-image");
    expect(children[1]).toHaveClass("team-name");
  });

  test("Correct data in team and player components", () => {
    const { container } = render(
      <FavoritesProvider>
        <Team team={teamData} />
      </FavoritesProvider>
    );

    // Check that the respective player components are present and display correct data (in the right order)
    const players = container.querySelectorAll(".player-on-team");
    const playersNicknames = container.querySelectorAll(".player-nickname");
    const playersNames = container.querySelectorAll(".player-fullname");
    const playersCountries = container.querySelectorAll(".player-country-name");
    expect(players).toHaveLength(5);
    for (let i = 0; i < 5; i++) {
      expect(playersNicknames[i]).toHaveTextContent(playerArray[i].nickname);
      expect(playersNames[i]).toHaveTextContent(playerArray[i].fullname);
      expect(playersCountries[i]).toHaveTextContent(
        playerArray[i].country.name
      );
    }

    // Check that team name and ranking elements display correct data
    expect(container.querySelector(".team-name")).toHaveTextContent("Vitality");
    expect(container.querySelector(".ranking")).toHaveTextContent("1");
  });

  test("Favorite icon functionality", () => {
    const { container, getByTestId } = render(
      <FavoritesProvider>
        <Team team={teamData} />
      </FavoritesProvider>
    );

    // Check only one star element present at a time
    let starElement = container.querySelectorAll(".favorite-star");
    expect(starElement).toHaveLength(1);

    // Check initial state set as unfavorited
    expect(getByTestId("outline-star")).toBeInTheDocument();

    // Check that clicking favorite icon changes UI element
    // Clicking once changes to new UI element
    // Clicking twice changes back to initial UI element
    fireEvent.click(getByTestId("outline-star"));
    starElement = container.querySelectorAll(".favorite-star");
    expect(starElement).toHaveLength(1);
    expect(getByTestId("fill-star")).toBeInTheDocument();

    fireEvent.click(getByTestId("fill-star"));
    starElement = container.querySelectorAll(".favorite-star");
    expect(starElement).toHaveLength(1);
    expect(getByTestId("outline-star")).toBeInTheDocument();
  });
});
