import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULTS = {
  accent: '#1E40AF',
  primary: '#1E40AF',
  darkMode: false,
  radius: 12,
  density: 'comfortable',
  serifAccent: true,
  showFloatingDemo: true,
};

export const useThemeStore = create(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTweak: (key, value) => set({ [key]: value }),
      reset: () => set(DEFAULTS),
    }),
    { name: 'eventpro-theme' },
  ),
);
