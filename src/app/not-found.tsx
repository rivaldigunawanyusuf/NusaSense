import Link from "next/link";
import { Compass } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="pt-6">
      <h1 className="sr-only">Page not found</h1>
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
      >
        <Link
          href={ROUTES.home}
          className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-strong"
        >
          Back to Signal Feed
        </Link>
      </EmptyState>
    </div>
  );
}
