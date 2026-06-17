import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

/* Applies theme-store values to <html> as CSS vars + data attrs.
   Mounted once near the top of the tree. */
export function ThemeBridge() {
  const { accent, primary, radius, density, serifAccent, showFloatingDemo, darkMode } = useThemeStore();

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', accent);
    r.style.setProperty('--primary', primary);
    r.style.setProperty('--radius', radius + 'px');
    r.style.setProperty('--density', density === 'compact' ? '0.85' : '1');
    r.dataset.density = density;
    r.dataset.serif = serifAccent ? 'on' : 'off';
    r.dataset.floating = showFloatingDemo ? 'on' : 'off';
    r.dataset.theme = darkMode ? 'dark' : 'light';
  }, [accent, primary, radius, density, serifAccent, showFloatingDemo, darkMode]);

  return null;
}
