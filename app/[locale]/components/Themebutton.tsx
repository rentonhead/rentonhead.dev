"use client";

import { useEffect, useState } from "react";

export default function Themebutton() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("rentonhead-theme");
    const nextTheme = stored === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("rentonhead-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}>
      <span aria-hidden="true">{theme === "dark" ? "○" : "●"}</span>
    </button>
  );
}
