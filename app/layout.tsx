"use client";
import { useEffect, useState } from "react";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import Login from "@/components/Login";
import Link from "next/link";
import { AuthContext } from "@/components/utils/AuthContext";
import Image from "next/image";
import { BASE_PATH } from "../next.config.mjs";

const navLinks: { href: string; name: string }[] = [
  {
    href: "/",
    name: "Leaderboard",
  },
  {
    href: "/test",
    name: "Test",
  },
];

const TrophyOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
    />
  </svg>
);

const TrophySolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
      clipRule="evenodd"
    />
  </svg>
);

const ClockOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const ClockSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
      clipRule="evenodd"
    />
  </svg>
);

const UserCircleOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const UserCircleSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const supabase = createClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isLoading && !session) {
    if (!pathname.endsWith("login") && pathname !== "/") {
      return (
        <html lang="en" className={GeistSans.className}>
          <body className="flex items-center justify-center bg-zinc-800 pt-10 text-zinc-100">
            <Login />
          </body>
        </html>
      );
    }
  }

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="relative bg-zinc-800 text-zinc-100">
        <div className="flex w-full bg-zinc-800">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center">
              <div className="p-4">
                <Link href="/">
                  <Image
                    src={`${BASE_PATH}/christmas_table.svg`}
                    width="140"
                    height="140"
                    alt="Christmas Table"
                  />
                </Link>
              </div>
              <div className="grow" />
            </div>
          </div>
        </div>
        <main className="mx-auto w-full max-w-screen-xl">
          <div className="mx-2">
            {!isLoading && (
              <AuthContext.Provider value={{ session }}>
                {children}
              </AuthContext.Provider>
            )}
          </div>
        </main>
        <nav
          id="mobile-menu"
          className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 sm:px-3"
        >
          <div className="flex justify-around gap-2 p-4">
            <Link
              href="/"
              className={`w-24 ${pathname === "/" ? "text-green-400" : ""}`}
            >
              <div className="flex flex-col items-center gap-1 text-sm font-bold">
                {pathname === "/" ? <TrophySolid /> : <TrophyOutline />}
                <div>Standings</div>
              </div>
            </Link>
            <Link
              href="/history"
              className={`w-24 ${pathname === "/history" ? "text-green-400" : ""}`}
            >
              <div className="flex flex-col items-center gap-1 text-sm font-bold">
                {pathname === "/history" ? <ClockSolid /> : <ClockOutline />}
                <div>History</div>
              </div>
            </Link>
            <Link
              href="/profile"
              className={`w-24 ${pathname === "/profile" ? "text-green-400" : ""}`}
            >
              <div className="flex flex-col items-center gap-1 text-sm font-bold">
                {pathname === "/profile" ? (
                  <UserCircleSolid />
                ) : (
                  <UserCircleOutline />
                )}
                <div>Profile</div>
              </div>
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
