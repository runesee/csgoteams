import { render } from "@testing-library/react";
import TeamNavigation from "./team-navigation";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("TeamNavigation", () => {
  testButtonPresence(0, 3, ["1", "2", "3"], ["0", "4", "..."]);
  testButtonPresence(0, 9, ["1", "2", "3", "4", "5", "...", "9"], ["0", "6"]);
  testButtonPresence(3, 9, ["1", "2", "3", "4", "5", "...", "9"], ["0", "6"]);
  testButtonPresence(
    4,
    9,
    ["1", "...", "4", "5", "6" /*, "..."*/, "9"],
    ["0", "3", "7"]
  );
  testButtonPresence(6, 9, ["1", "...", "5", "6", "7", "8", "9"], ["0", "4"]);

  test("Button presses change active button.", async () => {
    const TeamNavigationParent = () => {
      const [displayedTeamIndex, setDisplayedTeamIndex] = useState<number>(0);
      return (
        <TeamNavigation
          displayedTeamIndex={displayedTeamIndex}
          teams={8}
          setDisplayedTeamIndex={setDisplayedTeamIndex}
        />
      );
    };
    const { getByText } = render(<TeamNavigationParent />);

    expect(getByText("3")).not.toHaveClass("active");
    expect(getByText("1")).toHaveClass("active");
    await userEvent.click(getByText("3"));
    expect(getByText("3")).toHaveClass("active");
    expect(getByText("1")).not.toHaveClass("active");
  });
});

const testButtonPresence = (
  teamIndex: number,
  teams: number,
  presentButtons: string[],
  absentButtons: string[]
) => {
  test(`Team ${teamIndex + 1}/${teams} displays correct buttons.`, () => {
    const { queryAllByText } = render(
      <TeamNavigation
        displayedTeamIndex={teamIndex}
        teams={teams}
        setDisplayedTeamIndex={() => {}}
      />
    );
    presentButtons.forEach((i) => {
      expect(queryAllByText(i).length).toBeGreaterThan(0);
    });
    absentButtons.forEach((i) => {
      expect(queryAllByText(i).length).toBe(0);
    });
  });
};
