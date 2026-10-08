"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, isMounted, router]);

  if (!isMounted || status === "loading") {
    return (
      <div className="flex w-full items-center justify-center p-10">
        <div className="size-8 animate-spin rounded-full border-4 border-neutral-800 border-t-lime-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
