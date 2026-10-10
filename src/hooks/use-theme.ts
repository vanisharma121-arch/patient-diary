import { useCallback, useState } from 'react';

/** Light/dark switch shared by the dock and anything else that needs it. */
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggle = useCallback(() => {
    setDark((was) => {
      const next = !was;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('pd-theme', next ? 'dark' : 'light');
      } catch {
        /* storage can be unavailable; the switch still works for this visit */
      }
      return next;
    });
  }, []);
  return { dark, toggle };
}
