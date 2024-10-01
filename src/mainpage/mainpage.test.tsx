import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import Mainpage from "./mainpage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "../favorites/favorites-provider";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("https://hltv-api.vercel.app/api/player.json", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 9565,
          ranking: 1,
          name: "Vitality",
          logo: "",
          players: [
            {
              fullname: "Dan 'apEX' Madesclaire",
              image: "",
              nickname: "apEX",
              country: {
                name: "France",
                flag: ""
              }
            },
            {
              fullname: "Peter 'dupreeh' Rasmussen",
              image: "",
              nickname: "dupreeh",
              country: {
                name: "Denmark",
                flag: ""
              }
            },
            {
              fullname: "Emil 'Magisk' Reif",
              image: "",
              nickname: "Magisk",
              country: {
                name: "Denmark",
                flag: ""
              }
            },
            {
              fullname: "Mathieu 'ZywOo' Herbaut",
              image: "",
              nickname: "ZywOo",
              country: {
                name: "France",
                flag: ""
              }
            },
            {
              fullname: "Lotan 'Spinx' Giladi",
              image: "",
              nickname: "Spinx",
              country: {
                name: "Israel",
                flag: ""
              }
            }
          ]
        },
        {
          id: 6667,
          ranking: 2,
          name: "FaZe",
          logo: "",
          players: [
            {
              fullname: "Finn 'karrigan' Andersen",
              image: "",
              nickname: "karrigan",
              country: {
                name: "Denmark",
                flag: ""
              }
            },
            {
              fullname: "Håvard 'rain' Nygaard",
              image: "",
              nickname: "rain",
              country: {
                name: "Norway",
                flag: ""
              }
            },
            {
              fullname: "Russel 'Twistzz' Van Dulken",
              image: "",
              nickname: "Twistzz",
              country: {
                name: "Canada",
                flag: ""
              }
            },
            {
              fullname: "Robin 'ropz' Kool",
              image: "f",
              nickname: "ropz",
              country: {
                name: "Estonia",
                flag: ""
              }
            },
            {
              fullname: "Helvijs 'broky' Saukants",
              image: "",
              nickname: "broky",
              country: {
                name: "Latvia",
                flag: ""
              }
            }
          ]
        },
        {
          id: 8297,
          ranking: 8,
          name: "FURIA",
          logo: "",
          players: [
            {
              fullname: "Andrei 'arT' Piovezan",
              image: "",
              nickname: "arT",
              country: {
                name: "Brazil",
                flag: ""
              }
            },
            {
              fullname: "Yuri 'yuurih' Santos",
              image: "",
              nickname: "yuurih",
              country: {
                name: "Brazil",
                flag: ""
              }
            },
            {
              fullname: "Kaike 'KSCERATO' Cerato",
              image: "",
              nickname: "KSCERATO",
              country: {
                name: "Brazil",
                flag: ""
              }
            },
            {
              fullname: "Rafael 'saffee' Costa",
              image: "",
              nickname: "saffee",
              country: {
                name: "Brazil",
                flag: ""
              }
            },
            {
              fullname: "André 'drop' Abreu",
              image: "",
              nickname: "drop",
              country: {
                name: "Brazil",
                flag: ""
              }
            }
          ]
        }
      ])
    );
  })
);

describe("Mainpage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test("Mainpage renders correctly", async () => {
    const { findByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <Mainpage />
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(await findByTestId("selected-country-dropdown")).toBeInTheDocument();
    expect(await findByTestId("sort-option-dropdown")).toBeInTheDocument();
    expect(await findByTestId("international-checkbox")).toBeInTheDocument();
    expect(await findByTestId("favorite-checkbox")).toBeInTheDocument();
    expect(await findByTestId("teams")).toBeInTheDocument();
  });

  test("Sort works correctly", async () => {
    const { findByTestId, findByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <Mainpage />
        </FavoritesProvider>
      </QueryClientProvider>
    );

    // Checks that the first team is Vitality (default sort option is rank ascending and Vitality is rank 1, FaZe is rank 2 and FURIA is rank 8)
    expect(await findByText("Vitality")).toBeInTheDocument();

    const sortOptionDropdown = await findByTestId("sort-option-dropdown");

    fireEvent.change(sortOptionDropdown, {
      target: { value: "rank-descending" }
    });
    // Checks that the first team is FURIA (rank descending)
    expect(await findByText("FURIA")).toBeInTheDocument();

    fireEvent.change(sortOptionDropdown, { target: { value: "name-a-z" } });
    // Checks that the first team is FaZe (name a-z)
    expect(await findByText("FaZe")).toBeInTheDocument();

    fireEvent.change(sortOptionDropdown, { target: { value: "name-z-a" } });
    // Checks that the first team is Vitality (name z-a)
    expect(await findByText("Vitality")).toBeInTheDocument();

    // Resets the sort option to default state
    fireEvent.change(sortOptionDropdown, {
      target: { value: "rank-ascending" }
    });
  });

  test("Filter to show international teams works correctly", async () => {
    const { findByTestId, findByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <Mainpage />
        </FavoritesProvider>
      </QueryClientProvider>
    );

    const internationalCheckbox = await findByTestId("international-checkbox");

    // Checks that the international checkbox is checked by default
    expect(internationalCheckbox).toBeChecked();

    // Checks that the first team is Vitality (international team, and rank 1)
    expect(await findByText("Vitality")).toBeInTheDocument();

    fireEvent.click(internationalCheckbox);
    expect(internationalCheckbox).not.toBeChecked();

    // Checks that the team displayed first is now FURIA (the only international team in the mock data)
    expect(await findByText("FURIA")).toBeInTheDocument();

    // Resets the filter to default state
    fireEvent.click(internationalCheckbox);
  });

  test("Filter to only show favorites works correctly", async () => {
    const { findByTestId, findByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <Mainpage />
        </FavoritesProvider>
      </QueryClientProvider>
    );

    const favoriteCheckbox = await findByTestId("favorite-checkbox");

    // Checks that the favorite checkbox is not checked by default
    expect(favoriteCheckbox).not.toBeChecked();

    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    // Checks that no team is currently favorited
    expect(
      await findByText("No teams match your current filters")
    ).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);

    const uncheckedFavoritesButton = await findByTestId("outline-star");
    // Favorites the current team (Vitality)
    fireEvent.click(uncheckedFavoritesButton);

    // Checks that the favorited team has been added to local storage
    let storedFavorites = JSON.parse(
      localStorage.getItem("isFavorite") ?? "{}"
    );
    expect(storedFavorites[9565]).toBe(true); // 9565 is Vitality's id

    fireEvent.click(favoriteCheckbox);
    expect(await findByText("Vitality")).toBeInTheDocument();

    const checkedFavoritesButton = await findByTestId("fill-star");
    // Unfavorites the current team (Vitality)
    fireEvent.click(checkedFavoritesButton);

    // Checks that the unfavorited team's local storage value is now false
    storedFavorites = JSON.parse(localStorage.getItem("isFavorite") ?? "{}");
    expect(storedFavorites[9565]).toBe(false);

    // Resets the filter to default state
    fireEvent.click(favoriteCheckbox);
  });

  test("Filter to show teams with players from a specific country works correctly", async () => {
    const { findByTestId, findByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <Mainpage />
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(await findByText("Vitality")).toBeInTheDocument();

    const selectedCountryDropdown = await findByTestId(
      "selected-country-dropdown"
    );
    userEvent.selectOptions(selectedCountryDropdown, "Estonia");

    // Checks that the first team is FaZe (the only team with a player from Estonia)
    expect(await findByText("FaZe")).toBeInTheDocument();

    // Resets the filter to default state
    userEvent.selectOptions(selectedCountryDropdown, "");
  });
});
