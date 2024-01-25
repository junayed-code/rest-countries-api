"use client";

import React, { useEffect, useState, createContext } from "react";

type Theme = "dark" | "light";
type ThemeProviderValues = {
  theme: Theme;
  toggleTheme: (theme?: Theme) => void;
};

export const ThemeContext = createContext<ThemeProviderValues>({
  theme: "dark",
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  const toggleTheme = (theme?: any) => {
    setCurrentTheme(prev => {
      const THEME = theme || (prev === "dark" ? "light" : "dark");
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(THEME);
      sessionStorage.setItem("__theme", THEME);
      return THEME;
    });
  };

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const __theme = sessionStorage.getItem("__theme");
    toggleTheme(__theme || (mql.matches ? "dark" : "light"));
    const handleThemeChange = (e: MediaQueryListEvent) => {
      toggleTheme(e.matches ? "dark" : "light");
    };

    mql.addEventListener("change", handleThemeChange);

    return () => {
      mql.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
