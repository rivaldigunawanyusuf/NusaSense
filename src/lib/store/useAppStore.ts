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
    telegramChatId: string | null;
  };
  hasOnboarded: boolean;
  userRules: UserRule[];
  _hasHydrated: boolean;

  // Actions
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  setWatchlist: (watchlist: string[]) => void;
  toggleWatchlist: (ticker: string) => Promise<void>;
  setAlertsEnabled: (enabled: boolean) => void;
  setTelegramChatId: (id: string | null) => void;
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
        telegramChatId: null,
      },
      hasOnboarded: false,
      userRules: [],
      _hasHydrated: false,

      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),

      setWatchlist: (watchlist: string[]) => set({ watchlist }),

      toggleWatchlist: async (ticker: string) => {
        const clean = sanitizeTicker(ticker);
        if (!clean) return;

        const current = get().watchlist;
        const exists = current.includes(clean);

        if (exists) {
          set({ watchlist: current.filter((t) => t !== clean) });
          fetch('/api/user/watchlist', {
            method: 'POST',
            body: JSON.stringify({ symbol: clean, action: 'remove' }),
            headers: { 'Content-Type': 'application/json' }
          }).catch(console.error);
        } else {
          // Max 5 limit check
          if (current.length >= 5) {
            console.warn('Watchlist is full (max 5 tickers).');
            return;
          }
          set({ watchlist: [...current, clean] });
          fetch('/api/user/watchlist', {
            method: 'POST',
            body: JSON.stringify({ symbol: clean, action: 'add' }),
            headers: { 'Content-Type': 'application/json' }
          }).catch(console.error);
        }
      },

      setAlertsEnabled: (enabled: boolean) => {
        set((state) => ({ alertPrefs: { ...state.alertPrefs, enabled } }));
      },

      setTelegramChatId: (id: string | null) => {
        set((state) => ({ alertPrefs: { ...state.alertPrefs, telegramChatId: id } }));
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
