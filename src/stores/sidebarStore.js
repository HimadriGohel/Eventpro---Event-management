import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSidebarStore = create(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (isCollapsed) => set({ isCollapsed }),
    }),
    {
      name: 'eventpro-sidebar',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
