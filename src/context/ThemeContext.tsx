import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeColor, ThemeContextType } from "../types/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize theme from localStorage or defaults
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem("themeColor") as ThemeColor) || "blue";
  });

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  // Set color theme and save to localStorage
  const handleSetThemeColor = (color: ThemeColor) => {
    setThemeColor(color);
  };

  // Update localStorage and apply theme when state changes
  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    localStorage.setItem("themeColor", themeColor);

    // Apply theme to document
    document.documentElement.dataset.theme = themeColor;
    document.documentElement.classList.toggle("dark", isDark);

    // Update URL hash if different
    const currentHash = `#${isDark ? "dark" : "light"}`;
    if (location.hash !== currentHash) {
      navigate(`${location.pathname}${location.search}${currentHash}`, {
        replace: true,
      });
    }
  }, [
    isDark,
    themeColor,
    location.pathname,
    location.search,
    navigate,
    location.hash,
  ]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        themeColor,
        toggleDarkMode,
        setThemeColor: handleSetThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
