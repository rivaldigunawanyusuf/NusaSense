import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { sanitizeTicker } from '@/lib/utils/security';

export interface UserRule {
  id: string;
  ruleString: string;
  active: boolean;
}

export interface AppState {
  // Auth state
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;

  // Watchlist limits to max 5 items
  watchlist: string[];
  alertPrefs: {
    enabled: boolean;
  };
  hasOnboarded: boolean;
  userRules: UserRule[];
  _hasHydrated: boolean;

  // Actions
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  toggleWatchlist: (ticker: string) => void;
  setAlertsEnabled: (enabled: boolean) => void;
  completeOnboarding: () => void;
  addUserRule: (rule: Omit<UserRule, 'id'>) => void;
  removeUserRule: (id: string) => void;
  toggleUserRule: (id: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      watchlist: [],
      alertPrefs: {
        enabled: false,
      },
      hasOnboarded: false,
      userRules: [],
      _hasHydrated: false,

      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),

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

      addUserRule: (rule) => {
        const id = crypto.randomUUID();
        set((state) => ({ userRules: [...state.userRules, { ...rule, id }] }));
      },

      removeUserRule: (id: string) => {
        set((state) => ({ userRules: state.userRules.filter((r) => r.id !== id) }));
      },

      toggleUserRule: (id: string) => {
        set((state) => ({
          userRules: state.userRules.map((r) =>
            r.id === id ? { ...r, active: !r.active } : r
          ),
        }));
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
