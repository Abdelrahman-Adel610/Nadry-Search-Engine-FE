import { useTheme } from "../context/ThemeContext";
import { RecommendationsProps } from "../types/types";
import SearchIcon from "./SearchIcon";
import { getTextStyle } from "../utils/styleUtils";

export default function Recommendations({
  filteredSuggestions,
  moveDownHandler,
  isVisible,
}: RecommendationsProps) {
  const { isDark } = useTheme();

  return (
    isVisible && (
      <ul
        className={`
          absolute top-1 left-0 right-0 mt-2 w-full
          border rounded-2xl shadow-lg z-20
          max-h-64 overflow-y-auto
          ${
            isDark
              ? "bg-[var(--nadry-bg-dark)] border-[var(--nadry-border-dark)]"
              : "bg-white border-[var(--nadry-primary-lighter)]"
          }
        `}
      >
        {filteredSuggestions.map((s: string, idx: number) => (
          <li
            key={s}
            className={`
              flex items-center px-6 py-3 cursor-pointer transition border-b
              ${
                isDark
                  ? "hover:bg-[var(--nadry-bg-dark-accent)] border-b-[var(--nadry-border-dark)]/10"
                  : "hover:bg-[var(--nadry-primary-lighter)] border-[var(--nadry-primary-lighter)]/20"
              }
              ${idx === filteredSuggestions.length - 1 ? "border-b-0" : ""}
              group
            `}
            onMouseDown={() => moveDownHandler(s)}
          >
            <SearchIcon />
            <span
              className={`
                text-base
                ${getTextStyle(isDark)}
                group-hover:underline
                truncate
              `}
            >
              {s}
            </span>
          </li>
        ))}
      </ul>
    )
  );
}
