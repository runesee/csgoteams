import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./team-navigation.css";

interface TeamNavigationProps {
  teams: number;
  displayedTeamIndex: number;
  setDisplayedTeamIndex: React.Dispatch<React.SetStateAction<number>>;
}

const arrowSize: number = 40;

export default function TeamNavigation({
  displayedTeamIndex,
  setDisplayedTeamIndex,
  teams
}: TeamNavigationProps) {
  const Button = ({ teamIndex }: { teamIndex: number }) =>
    teamIndex === displayedTeamIndex ? (
      <button className="active">{teamIndex + 1}</button>
    ) : (
      <button onClick={() => setDisplayedTeamIndex(teamIndex)}>
        {teamIndex + 1}
      </button>
    );

  return (
    <div className="team-navigation">
      <IoIosArrowBack
        onClick={() => setDisplayedTeamIndex((i) => i - 1)}
        size={arrowSize}
        className="arrow"
        style={{ visibility: displayedTeamIndex === 0 ? "hidden" : "" }}
      />
      {teams > 7 ? (
        <>
          <Button teamIndex={0} />
          {displayedTeamIndex < 4 ? (
            <Button teamIndex={1} />
          ) : (
            <div className="dotdotdot">...</div>
          )}
          <Button
            teamIndex={Math.max(2, Math.min(teams - 5, displayedTeamIndex - 1))}
          />
          <Button
            teamIndex={Math.max(3, Math.min(teams - 4, displayedTeamIndex))}
          />
          <Button
            teamIndex={Math.max(4, Math.min(teams - 3, displayedTeamIndex + 1))}
          />
          {displayedTeamIndex > teams - 5 ? (
            <Button teamIndex={teams - 2} />
          ) : (
            <div className="dotdotdot">...</div>
          )}
          <Button teamIndex={teams - 1} />
        </>
      ) : (
        Array(teams)
          .fill(0)
          .map((_, i) => <Button teamIndex={i} key={i} />)
      )}

      <IoIosArrowForward
        onClick={() => setDisplayedTeamIndex((i) => i + 1)}
        size={arrowSize}
        className="arrow"
        style={{ visibility: displayedTeamIndex === teams - 1 ? "hidden" : "" }}
      />
    </div>
  );
}
