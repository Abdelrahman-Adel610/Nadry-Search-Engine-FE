import { useState } from "react";
import Recommendations from "./Recommendations";
import { suggestions } from "../data/data";
export default function SerchBar({
  isDarkMode,
  foncusOnMount,
  query,
  setQuery,
}: {
  isDarkMode: boolean;
  foncusOnMount: boolean;
  query: string;
  setQuery: (new_query: string) => void;
}) {
  const [inputFocused, setInputFocused] = useState(foncusOnMount);

  // Filter suggestions based on query
  const filteredSuggestions = query.trim().length > 0 ? suggestions : [];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className={`
          flex items-center
          w-full
          max-w-[36rem]
          sm:max-w-[36rem]
          rounded-full border
          shadow-sm
          px-4 py-1
          transition-all duration-200
          ${
            isDarkMode
              ? "bg-[var(--nadry-bg-dark)] border-[var(--nadry-border-dark)]"
              : "bg-white border-[var(--nadry-border-light)]"
          }
          ${
            inputFocused || query.trim()
              ? isDarkMode
                ? "ring-2 ring-[var(--nadry-border-dark)]"
                : "ring-2 ring-[var(--nadry-orange-light)]"
              : ""
          }
        `}
      >
        {/* Search Icon */}
        <span
          className={
            isDarkMode
              ? "mr-2 text-[var(--nadry-placeholder-dark)]"
              : "mr-2 text-gray-400"
          }
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 20L17 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          autoFocus={foncusOnMount}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"What do you think of ?"}
          className={`
            flex-1 bg-transparent outline-none border-none
            text-lg
            px-0 py-1
            ${
              isDarkMode
                ? "text-[var(--nadry-text-dark)] placeholder-[var(--nadry-placeholder-dark)]"
                : "text-black placeholder:text-gray-400"
            }
          `}
          autoComplete="off"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        {/* Clear Button */}
        {query && (
          <button
            type="button"
            className={
              isDarkMode
                ? "ml-2 text-[var(--nadry-placeholder-dark)] hover:text-[var(--nadry-text-dark)] focus:outline-none"
                : "ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            }
            onClick={() => setQuery("")}
            tabIndex={-1}
            aria-label="Clear"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill={isDarkMode ? "var(--nadry-bg-dark)" : "#f3f4f6"}
              />
              <path
                d="M15 9l-6 6M9 9l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
      <Recommendations
        isDarkMode={isDarkMode}
        isVisible={inputFocused && filteredSuggestions.length > 0}
        moveDownHandler={(s: string) => setQuery(s)}
        filteredSuggestions={filteredSuggestions}
      />
    </div>
  );
}
