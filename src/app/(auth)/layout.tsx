import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 py-8">
      <div className="w-full max-w-[360px]">
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg"
            aria-label="NusaSense home"
          >
            <BrandMark className="size-8" />
            <span className="text-[17px] font-semibold tracking-tight text-white">
              Nusa<span className="text-brand">Sense</span>
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
