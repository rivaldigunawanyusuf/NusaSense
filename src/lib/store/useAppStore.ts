import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { sanitizeTicker } from '@/lib/utils/security';

export interface AppState {
  // Watchlist limits to max 5 items
  watchlist: string[];
  alertPrefs: {
    enabled: boolean;
  };
  hasOnboarded: boolean;
  _hasHydrated: boolean;

  // Actions
  toggleWatchlist: (ticker: string) => void;
  setAlertsEnabled: (enabled: boolean) => void;
  completeOnboarding: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      alertPrefs: {
        enabled: false,
      },
      hasOnboarded: false,
      _hasHydrated: false,

      toggleWatchlist: (ticker: string) => {
        const clean = sanitizeTicker(ticker);
        if (!clean) return;

        const current = get().watchlist;
        const exists = current.includes(clean);

        if (exists) {
          set({ watchlist: current.filter((t) => t !== clean) });
        } else {
          // Max 5 limit check
          if (current.length >= 5) {
            console.warn('Watchlist is full (max 5 tickers).');
            return;
          }
          set({ watchlist: [...current, clean] });
        }
      },

      setAlertsEnabled: (enabled: boolean) => {
        set({ alertPrefs: { enabled } });
      },

      completeOnboarding: () => {
        set({ hasOnboarded: true });
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'nusasense-storage', // key in local storage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
