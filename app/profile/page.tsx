"use client";

import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useState, useEffect } from "react";

const supabase = createClient();

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <div>
      <div className="flex gap-4">
        {session && (
          <>
            <button
              className="text-sm font-bold"
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
