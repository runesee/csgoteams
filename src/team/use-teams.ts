import { useQuery } from "@tanstack/react-query";
import TeamData from "./team-data";

export const useTeams = (): TeamData[] | undefined =>
  useQuery<TeamData[]>({
    queryFn: () =>
      fetch("https://hltv-api.vercel.app/api/player.json").then((response) =>
        response.json()
      ),
    queryKey: ["teams"],
    //Only fetch once
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity
  }).data;
