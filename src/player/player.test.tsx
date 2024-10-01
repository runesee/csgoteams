import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import PlayerData from "./player-data";
import Player from "./player";

const mockData1: PlayerData = {
  fullname: "Oleksandr 's1mple' Kostyliev", // 2 names with nickname in the middle
  image: "",
  nickname: "s1mple",
  country: { name: "Ukraine", flag: "" }
};

const mockData2: PlayerData = {
  fullname: "Russel 'Twistzz' Van Dulken", // 3 names with nickname in the middle
  image: "",
  nickname: "Twistzz",
  country: { name: "Canada", flag: "" }
};

describe("Player", () => {
  test("Component rendered", () => {
    const { container } = render(<Player player={mockData1} />);

    // Checks if player component exists in the document
    expect(container.firstChild).toHaveClass("player");

    // Checks if all elements of the player component exists in the document
    expect(container.querySelector(".player-image")).toBeInTheDocument();
    expect(container.querySelector(".player-nickname")).toBeInTheDocument();
    expect(container.querySelector(".player-fullname")).toBeInTheDocument();
    expect(container.querySelector(".player-country")).toBeInTheDocument();

    const children =
      container.querySelector(".player-country")?.childNodes || [];
    expect(children).toHaveLength(2);
    expect(children[0]).toHaveClass("player-country-flag");
    expect(children[1]).toHaveClass("player-country-name");
  });

  test("Fullname rendered correctly in different cases", () => {
    const { container } = render(
      <>
        <Player player={mockData1} />
        <Player player={mockData2} />
      </>
    );

    const fullnames = container.querySelectorAll(".player-fullname");

    expect(fullnames).toHaveLength(2);

    // Checks to see if the names are rendered correctly.
    // This is done because the fullname retrieved from the API contains the nickname in quotation marks,
    // we therefore have to remove the nickname from the fullname,
    // while still retaining the rest of the names.
    expect(fullnames[0].textContent).toMatch("Oleksandr Kostyliev");
    expect(fullnames[1].textContent).toMatch("Russel Van Dulken");
  });
});
