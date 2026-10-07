"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store/useAppStore";
import type { TooltipRenderProps } from "react-joyride";

const Joyride = dynamic(() => import("./JoyrideWrapper"), { ssr: false });

function CustomTooltip({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) {
  return (
    <div
      {...tooltipProps}
      className="max-w-sm rounded-2xl border border-line bg-surface p-4 text-ink shadow-xl sm:p-5"
    >
      {step.title && (
        <h3 className="mb-2 text-base font-bold text-ink sm:text-lg">
          {step.title}
        </h3>
      )}
      <div className="mb-4 text-sm text-ink-muted leading-relaxed">
        {step.content}
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          {...closeProps}
          className="text-xs font-semibold text-ink-faint hover:text-ink transition-colors"
        >
          Skip
        </button>
        <div className="flex items-center gap-2">
          {index > 0 && (
            <button
              {...backProps}
              className="rounded-full bg-field px-4 py-2 text-xs font-semibold text-ink hover:bg-line transition-colors"
            >
              Back
            </button>
          )}
          <button
            {...primaryProps}
            className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-strong transition-colors"
          >
            {continuous ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TourGuide() {
  const { hasOnboarded, _hasHydrated } = useAppStore();
  const [run, setRun] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tourKey, setTourKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && _hasHydrated && hasOnboarded) {
      const hasSeenTour = localStorage.getItem("nusa_tour_seen");
      if (!hasSeenTour) {
        setTimeout(() => setRun(true), 800);
      }
    }
    
    // Manual trigger listener
    const handleStartTour = () => {
      setTourKey(prev => prev + 1);
      setRun(true);
    };
    window.addEventListener("start-nusa-tour", handleStartTour);
    
    return () => window.removeEventListener("start-nusa-tour", handleStartTour);
  }, [mounted, _hasHydrated, hasOnboarded]);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if (["finished", "skipped"].includes(status)) {
      localStorage.setItem("nusa_tour_seen", "true");
      setRun(false);
    }
  };

  if (!mounted) return null;

  return (
    // @ts-expect-error react-joyride types are slightly mismatched for v2 styles and disableBeacon
    <Joyride
      key={tourKey}
      steps={[
        {
          target: "body",
          placement: "center",
          title: "Welcome to NusaSense!",
          content: "Let's take a quick tour to explore how you can find the best stocks on the IDX.",
          disableBeacon: true,
        },
        {
          target: "#tour-scan-schedule",
          title: "Automated Scanning",
          content: "Our n8n engine scans the entire market and detects fundamental anomalies at 06:00 WIB every day.",
          disableBeacon: true,
        },
        {
          target: "[data-testid='filter-chips']",
          title: "Quick Filters",
          content: "Use these filters to easily switch between All Stocks and just the detected Anomalies.",
          disableBeacon: true,
        },
        {
          target: "[data-testid='anomaly-card']",
          title: "Anomaly Cards",
          content: "Cards highlight unusual metrics like a spiked Dividend Yield or dropped P/E, automatically computed from the Sectors API.",
          disableBeacon: true,
        },
        {
          target: "#nav-home",
          title: "Home Feed",
          content: "This is your main dashboard. Return here anytime to see the latest detected market signals.",
          disableBeacon: true,
        },
        {
          target: "#nav-watchlist",
          title: "Your Watchlist",
          content: "Save your favorite stocks to the Watchlist to keep a close eye on them.",
          disableBeacon: true,
        },
        {
          target: "#nav-settings",
          title: "Preferences",
          content: "Customize your alerts and UI preferences here. You're all set to go!",
          disableBeacon: true,
        }
      ]}
      run={run}
      continuous
      showProgress
      showSkipButton
      tooltipComponent={CustomTooltip}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 1000,
          arrowColor: '#181f2d', // Match bg-surface in dark mode
        },
        beacon: {
          display: "none"
        },
        beaconInner: {
          display: "none"
        },
        beaconOuter: {
          display: "none"
        }
      }}
    />
  );
}
