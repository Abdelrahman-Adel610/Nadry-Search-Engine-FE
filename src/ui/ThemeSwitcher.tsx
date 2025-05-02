import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { getLinkStyle } from "../utils/styleUtils";

export default function ThemeSwitcher() {
  const { isDark, themeColor, toggleDarkMode, setThemeColor } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false); // State for collapse/expand

  const linkColor = getLinkStyle(isDark);

  return (
    <div className="fixed bottom-6 right-6 z-10 flex flex-col gap-2 items-end">
      {/* Main toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300
                   bg-transparent border-2
                   ${linkColor} border-current`}
        aria-label={
          isExpanded ? "Collapse theme options" : "Expand theme options"
        }
      >
        <span className="text-xl cursor-pointer">🎨</span> {/* Palette icon */}
      </button>

      {/* Collapsible section */}
      {isExpanded && (
        <div className="flex flex-col gap-2 items-end animate-fade-in">
          {/* Theme mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300
                       bg-transparent border-2
                       ${linkColor} border-current`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="text-xl">{isDark ? "🌙" : "☀️"}</span>
          </button>

          {/* Theme color options */}
          <div
            className={`flex gap-2 p-2 rounded-full shadow-lg transition-colors duration-300
                          ${
                            isDark
                              ? "bg-[var(--nadry-bg-dark-accent)]"
                              : "bg-[var(--nadry-bg-light-accent)]"
                          }`}
          >
            {/* Blue theme */}
            <button
              onClick={() => setThemeColor("blue")}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer
                bg-[var(--nadry-blue)] ${
                  themeColor === "blue" ? "scale-110 ring-2 ring-white" : ""
                }`}
              aria-label="Blue theme"
            >
              {themeColor === "blue" && (
                <span className="text-white text-xs">✓</span>
              )}
            </button>

            {/* Orange theme */}
            <button
              onClick={() => setThemeColor("orange")}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer bg-[var(--nadry-orange)] ${
                themeColor === "orange" ? "scale-110 ring-2 ring-white" : ""
              }`}
              aria-label="Orange theme"
            >
              {themeColor === "orange" && (
                <span className="text-white text-xs">✓</span>
              )}
            </button>

            {/* Default theme */}
            <button
              onClick={() => setThemeColor("default")}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer
                bg-[var(--nadry-default)] ${
                  themeColor === "default" ? "scale-110 ring-2 ring-white" : ""
                }`}
              aria-label="Default theme"
            >
              {themeColor === "default" && (
                <span className="text-white text-xs">✓</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
