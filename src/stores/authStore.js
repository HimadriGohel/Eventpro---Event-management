import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/* Auth state.
   - `user` is persisted (so the UI can paint immediately on reload).
   - `accessToken` lives in memory only — refreshed via the httpOnly cookie.
   The legacy methods (`login`, `logout`, `setRole`, `setKycStatus`) keep the
   prototype-ported pages working without changes. */

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isBootstrapping: true,

      // ---- new API (used by axios client + auth hooks) ----
      setSession: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: !!user, isBootstrapping: false }),

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      clearSession: () =>
        set({ user: null, accessToken: null, isAuthenticated: false, isBootstrapping: false }),

      setBootstrapping: (v) => set({ isBootstrapping: !!v }),

      // ---- legacy shims (used by ported prototype pages) ----
      login: (user) => set({ user, isAuthenticated: !!user, isBootstrapping: false }),
      logout: () => set({ user: null, accessToken: null, isAuthenticated: false, isBootstrapping: false }),
      setRole: (role) =>
        set((s) => ({ user: s.user ? { ...s.user, role } : { role } })),
      setKycStatus: (kycStatus) =>
        set((s) => ({ user: s.user ? { ...s.user, kycStatus } : { kycStatus } })),
    }),
    {
      name: 'eventpro-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user }), // never persist tokens
    },
  ),
);
