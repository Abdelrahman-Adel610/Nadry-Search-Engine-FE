import { useEffect, useRef, useState } from "react";
import Recommendations from "./Recommendations";
import { useTheme } from "../context/ThemeContext";
import SearchIcon from "./SearchIcon";
import { getTextStyle } from "../utils/styleUtils";
import { useQuery } from "@tanstack/react-query";
import searchService from "../Api/searchService";

export default function SerchBar({
  foncusOnMount,
  query,
  setQuery,
}: {
  foncusOnMount: boolean;
  query: string;
  setQuery: (new_query: string) => void;
}) {
  const [inputFocused, setInputFocused] = useState(foncusOnMount);
  const { isDark } = useTheme();

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up debounced query to avoid excessive API calls
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const { data, isLoading } = useQuery({
    queryKey: [debouncedQuery],
    enabled: !!debouncedQuery && debouncedQuery.length > 0, // Only run query if there's input
    queryFn: () => searchService.suggest(debouncedQuery),
    staleTime: 60000, // Cache results for 1 minute
    refetchOnWindowFocus: false,
  });

  const filteredSuggestions = data || [];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className={`
          flex items-center
          w-full
          max-w-full
          sm:max-w-[36rem]
          rounded-full border
          shadow-sm
          px-2 sm:px-3 md:px-4 py-1
          transition-all duration-200
          ${
            isDark
              ? "bg-[var(--nadry-bg-dark)] border-[var(--nadry-border-dark)]"
              : "bg-white border-[var(--nadry-border-light)]"
          }
          ${
            inputFocused || query.trim()
              ? isDark
                ? "ring-2 ring-[var(--nadry-border-dark)]"
                : "ring-2 ring-[var(--nadry-primary-light)]"
              : ""
          }
        `}
      >
        <SearchIcon />
        <input
          type="text"
          value={query}
          autoFocus={foncusOnMount}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"What do you think of ?"}
          className={`
            flex-1 bg-transparent outline-none border-none
            text-sm sm:text-base
            px-0 py-1
            w-full min-w-0
            ${getTextStyle(isDark)}
            ${
              isDark
                ? "placeholder-[var(--nadry-placeholder-dark)]/70"
                : "placeholder-[var(--nadry-placeholder-light)]/70"
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
              isDark
                ? "ml-1 text-[var(--nadry-placeholder-dark)] hover:text-[var(--nadry-text-dark)] focus:outline-none cursor-pointer flex-shrink-0"
                : "ml-1 text-[var(--nadry-primary)] opacity-60 hover:opacity-100 focus:outline-none cursor-pointer flex-shrink-0"
            }
            onClick={() => setQuery("")}
            tabIndex={-1}
            aria-label="Clear"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill={isDark ? "var(--nadry-bg-dark)" : "#f3f4f6"}
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
      <div className="relative w-full max-w-[36rem] z-30">
        <Recommendations
          isVisible={
            inputFocused && filteredSuggestions.length > 0 && !isLoading
          }
          moveDownHandler={(s: string) => setQuery(s)}
          filteredSuggestions={filteredSuggestions}
        />
      </div>
    </div>
  );
}
