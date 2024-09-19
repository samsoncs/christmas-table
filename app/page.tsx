"use client";

import Card from "@/components/Card";

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
  const backgroundColor =
    place === 1
      ? "to-yellow-500/50"
      : place === 2
        ? "to-sky-500/50"
        : "to-orange-500/50";
  const borderColor =
    place === 1
      ? "border-yellow-500"
      : place === 2
        ? "border-sky-500"
        : "border-orange-500";
  return (
    <div
      className={`${place === 1 ? "col-span-4" : "col-span-3"} flex flex-col items-center justify-end rounded-md bg-gradient-to-b from-zinc-900 from-20% ${backgroundColor} to-100% p-2`}
    >
      <div
        className={`flex ${place === 1 ? "h-28 w-28" : "h-24 w-24"} items-center justify-center rounded-full border-4 ${borderColor} bg-zinc-800`}
      >
        Test
      </div>

      <div
        className={`${place === 1 ? "h-8" : place === 2 ? "h-5" : "h-2"} w-full`}
      />

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
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  username,
  points,
  place,
}) => (
  <Card>
    <div className="grid grid-cols-12 gap-2 px-1 text-sm font-bold">
      <div className="items-centerfont-bold col-span-2 flex">{place}.</div>
      <div className="col-span-7 flex items-center">{username}</div>
      <div className="col-span-3 flex items-center justify-end">
        {points} pts.
      </div>
    </div>
  </Card>
);

const Index = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-10 gap-2">
        <PodiumPlace username="User 1" points={24} place={2} />
        <PodiumPlace username="Blah blah" points={24} place={1} />
        <PodiumPlace username="Flat shoe s" points={24} place={3} />
      </div>

      <LeaderboardRow username="Some cool user" points={16} place={4} />
      <LeaderboardRow username="Some cool user" points={16} place={4} />
      <LeaderboardRow username="Some cool user" points={16} place={4} />
      <LeaderboardRow username="Some cool user" points={16} place={4} />
    </div>
  );
};

export default Index;
