import { createClient } from "@/utils/supabase/client";
import { Fetcher } from "swr";

const supabase = createClient();

export const leaderboardFetchKey = "get_leaderbboard";

type LeaderboardRow = {
  userId: string;
  userName: string;
  score: number;
};

const query = supabase
.from("leaderboard")
.select("user_id,score,contestant(user_name)");

export const leaderboardFetcher: Fetcher<LeaderboardRow[], string> = async (
  _: string,
) => {

  const {data, error} = await query;

  if (error) {
    const err = new Error(error.message);
    err.name = error.hint;
    throw err;
  }

  return data.map(d => { return {userId: d.user_id, score: d.score, userName: (d.contestant as any).user_name} }) as unknown as LeaderboardRow[];
};
