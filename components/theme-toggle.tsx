"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "resonance-lp-theme";

const readStored = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark";
  } catch {
    // Private browsing or blocked storage — fall back to light.
    return false;
  }
};

/**
 * The theme lives outside React (localStorage plus a class on <html>), so it is
 * modelled as an external store rather than component state. `useSyncExternalStore`
 * handles the server/client difference for us: SSR renders the light snapshot and
 * React re-renders once after hydration if the stored preference differs.
 */
let isDark = typeof window === "undefined" ? false : readStored();
let listeners: Array<() => void> = [];

const subscribe = (listener: () => void) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((candidate) => candidate !== listener);
  };
};

const getSnapshot = () => isDark;
const getServerSnapshot = () => false;

const setDark = (next: boolean) => {
  isDark = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // Persisting is best-effort; the toggle still works for this session.
  }
  for (const listener of listeners) listener();
};

/**
 * Light/dark toggle, shared by the landing page and the workspace sidebar.
 *
 * The app has `next-themes` installed but no `ThemeProvider` mounted in the root
 * layout, so this drives the `.dark` class on <html> directly — the same hook
 * `globals.css` keys its dark tokens off. If a provider is added later, swap this
 * for `useTheme()` rather than running both.
 */
export const ThemeToggle = () => {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = useCallback(() => setDark(!isDark), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="cursor-pointer rounded-lg border border-border px-2.75 py-1.75 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
};
