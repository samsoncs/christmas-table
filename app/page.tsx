"use client";

import useSWR from "swr";
import {
  leaderboardFetcher,
  leaderboardFetchKey,
} from "./fetchers/leaderboardFetcher";
import Image from "next/image";
// import { createClient } from "@/utils/supabase/client";

// const supabase = createClient();

interface PodiumPlaceProps {
  username: string;
  points: number;
  place: 1 | 2 | 3;
}

const PodiumPlace: React.FC<PodiumPlaceProps> = ({
  username,
  points,
  place,
}) => {
  const backgroundColorTransition =
    place === 1
      ? "to-yellow-500/50"
      : place === 2
        ? "to-green-500/50"
        : "to-red-500/50";
  const backgroundColor =
    place === 1 ? "bg-yellow-500" : place === 2 ? "bg-green-500" : "bg-red-500";
  const borderColor =
    place === 1
      ? "border-yellow-500"
      : place === 2
        ? "border-green-500"
        : "border-red-500";
  return (
    <div
      className={`${place === 1 ? "col-span-4" : "col-span-3"} flex flex-col items-center justify-end rounded-md bg-gradient-to-b from-zinc-800 from-20% ${backgroundColorTransition} to-100% p-2`}
    >
      <div className="relative">
        <Image
          src={`/avatars/${username}.webp`}
          alt={username}
          height={100}
          width={100}
          className={`flex ${place === 1 ? "h-28 w-28" : "h-24 w-24"} relative max-w-96 items-center justify-center rounded-full border-4 ${borderColor} bg-zinc-600`}
        />
        <div className="absolute -bottom-4 left-0 right-0 mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full font-bold text-zinc-900/70 ${backgroundColor}`}
          >
            {place}
          </div>
        </div>
      </div>

      <div className={`${place === 1 ? "h-6" : "h-3"} w-full`} />
      <div className="flex flex-col items-center">
        <div className="text-sm font-bold">{username}</div>
        <div className="text-sm">{`${points} pts.`}</div>
      </div>
    </div>
  );
};

interface LeaderboardRowProps {
  username: string;
  points: number;
  place: number;
  isLast: boolean;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  username,
  points,
  place,
  isLast,
}) => (
  <div>
    <div
      className={`grid grid-cols-12 ${isLast ? "" : "border-b"} border-zinc-800 p-2 px-1 text-sm font-bold`}
    >
      <div className="col-span-9 flex items-center gap-3">
        <Image
          src={`/avatars/${username}.webp`}
          alt={username}
          height={50}
          width={50}
          className="relative flex max-w-96 items-center justify-center rounded-full"
        />
        <div className="flex flex-col justify-center">
          <div>{username}</div>
          <div className="text-zinc-400">{place}</div>
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-end">
        {points} pts.
      </div>
    </div>
  </div>
);

const Index = () => {
  const { data, isLoading, error } = useSWR(
    leaderboardFetchKey,
    leaderboardFetcher,
  );

  const ordered = data?.sort((a, b) => b.score - a.score);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-10 gap-2">
        <PodiumPlace
          username={ordered![1].userName}
          points={ordered![1].score}
          place={2}
        />
        <PodiumPlace
          username={ordered![0].userName}
          points={ordered![0].score}
          place={1}
        />
        <PodiumPlace
          username={ordered![2].userName}
          points={ordered![2].score}
          place={3}
        />
      </div>

      <div>
        {ordered!.slice(3).map((o, i) => (
          <LeaderboardRow
            key={o.userId}
            username={o.userName}
            points={o.score}
            place={i + 4}
            isLast={i === ordered!.length - 4}
          />
        ))}
      </div>

      {/* <button
        onClick={async () => {
          const { error } = await supabase.rpc("add_score", {
            score_id: 1,
            score_name: "Testing",
            results: "{}",
          });
        }}
      >
        Test
      </button> */}
    </div>
  );
};

export default Index;
