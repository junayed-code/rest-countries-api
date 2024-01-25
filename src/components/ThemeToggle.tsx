"use client";

import useTheme from "@/hooks/useTheme";
import { MoonIcon } from "./icons";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button
        onClick={() => toggleTheme()}
        className="flex text-[15px] sm:text-base items-center gap-x-2 font-semibold cursor-pointer"
      >
        <MoonIcon
          className="-mt-0.5 sm:text-xl"
          fill={theme === "dark" ? "#fff" : "none"}
        />
        <span>Dark Mode</span>
      </button>
    </div>
  );
}

export default ThemeToggle;
