import data from "data/playerData.json";
import { useEffect } from "react";
import { PlayerData, UserData } from "types/PlayerData";
import PlayerStatsCard from "./PlayerStatsCard";

export default function PlayerSidebar() {
  useEffect(() => {
    getMatchStacks();
  }, []);

  return (
    <section
      id="player-stats"
      className="flex max-w-sm flex-col gap-y-4 rounded border-4 border-zinc-700 p-4"
    >
      {data.map((playerData, ix) => (
        <PlayerStatsCard
          playerData={playerData as any as PlayerData}
          key={ix}
        />
      ))}
    </section>
  );
}

// ! Won't work because the data I'm using here is from the JSON, not updated to reflect matches
const getMatchStacks = (): Record<number, UserData[]> => {
  const playersInMatchID: Record<number, UserData[]> = {};
  //@ts-ignore
  data.forEach((playerData: PlayerData) => {
    playerData.matches.forEach((match) => {
      !playersInMatchID[match.id]
        ? (playersInMatchID[match.id] = [playerData.userData])
        : playersInMatchID[match.id].push(playerData.userData);
    });
  });

  console.log(playersInMatchID);
  return playersInMatchID;
};

const getWAR = () => {
  // Can get WAR if I can get match data by ID easily...
  // map_crc is like a map id, i.e. all inferno's will have same map_crc
  // Might be able to use steam/facit api at this point, since I have the match ids
  // ! dumb + goated idea: go straight to the matches page, yoink the stats, then parse the html for match related data? Only 1 trip = pretty good
};
