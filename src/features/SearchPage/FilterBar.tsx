import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  getCardStyle,
  getTextStyle,
  getBadgeStyle,
  getLinkStyle,
} from "../../utils/styleUtils";
import { FilterBarProps } from "../../types/types";
import { filterOptions } from "../../data/data";

export default function FilterBar({ sortOrder, onSortChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className="relative mb-4 md:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${getCardStyle(
          isDark
        )} ${getTextStyle(isDark)}`}
      >
        <span className="text-sm">
          {sortOrder === "relevance" ? "Sort: Relevance" : "Sort: Date"}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 p-2 rounded-lg shadow-lg z-10 min-w-[150px] ${getCardStyle(
            isDark
          )}`}
        >
          <div className="py-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className={`block w-full text-left px-4 py-2 text-sm rounded cursor-pointer transition-colors
                  ${
                    sortOrder === option.id
                      ? getBadgeStyle(isDark, true)
                      : getBadgeStyle(isDark)
                  }
                  ${
                    sortOrder === option.id
                      ? getLinkStyle(isDark)
                      : getTextStyle(isDark)
                  }
                  ${
                    isDark
                      ? "hover:bg-[var(--nadry-bg-dark)]"
                      : "hover:bg-[var(--nadry-primary-lighter)]/30"
                  }`}
                onClick={() => {
                  onSortChange(option.id);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
