import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { OnboardingModal } from "@/components/features/OnboardingModal";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        Skip to content
      </a>

      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col sm:border-x sm:border-line relative pb-16">
        <AppHeader />
        <main id="main" className="pb-safe-nav flex-1 px-4 pt-5">
          {children}
        </main>
      </div>

      <BottomNav />
      <OnboardingModal />
    </>
  );
}
