import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { PlayerData } from "types/PlayerData";

export default function PlayerStatsCard({
  playerData,
}: {
  playerData: PlayerData;
}) {
  const statMap = {
    WR: `${playerData.overall.wr}%`,
    Matches: playerData.matches.length,
    Rating: playerData.overall.rating,
    ADR: playerData.overall.adr,
    "1vX": `${playerData.overall["1vX"]}%`,
    WAR: getWAR(playerData.overall.rating, playerData.overall.wr),
  };

  return (
    <Link href={`/player/${playerData.userData.steamID}`} passHref>
      <div
        className="group flex cursor-pointer flex-col items-center gap-4
           rounded p-4 transition-all hover:bg-zinc-700 hover:shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Image
            src={playerData.userData.photoURL}
            alt=""
            width={36}
            height={36}
            className="aspect-square rounded-full"
          />
          <div className="flex flex-col">
            {playerData.userData.name}
            <span className="text-xs text-zinc-600 transition-colors group-hover:text-zinc-500">
              Last match: {dayjs(playerData.last).format("ddd, MM/DD/YY")}
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-y-2 gap-x-8 text-xs">
          {Object.entries(statMap).map(([name, value], ix) => (
            <Stat name={name} value={value} key={ix} />
          ))}
        </div>
      </div>
    </Link>
  );
}

function Stat({ name, value }: { name: string; value: string | number }) {
  return (
    <div className="flex justify-between text-zinc-300">
      {name}{" "}
      <span className="w-full text-right text-zinc-400 transition-colors group-hover:text-zinc-300">
        {value}
      </span>
    </div>
  );
}

const getWinLoss = (winrate: number, matches: number): [number, number] => {
  const wins = Math.floor(winrate * matches);
  return [wins, matches - wins];
};

const getWAR = (rating: number, winrate: number): number => {
  return Math.ceil(rating * (0.5 + winrate / 100) * 100) / 100;
};
