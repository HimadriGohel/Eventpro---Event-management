import { create } from 'zustand';

export const useToastStore = create((set, get) => ({
  toasts: [],
  push: (msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    const toast = { id, msg, ...opts };
    set((s) => ({ toasts: [...s.toasts, toast] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, opts.duration || 2400);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const useToast = () => {
  const push = useToastStore((s) => s.push);
  return { push };
};
