"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppStore } from "@/lib/store/useAppStore";

export function DataHydrator() {
  const { data: session, status } = useSession();
  const { setWatchlist, _hasHydrated, watchlist } = useAppStore();

  useEffect(() => {
    if (status === "authenticated" && _hasHydrated) {
      fetch("/api/user/watchlist")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            // Only update if length differs or something (to avoid infinite loops)
            // A simple check is to stringify and compare
            if (JSON.stringify(data) !== JSON.stringify(watchlist)) {
              setWatchlist(data);
            }
          }
        })
        .catch(console.error);
    }
  }, [status, _hasHydrated, setWatchlist, watchlist]);

  return null;
}
