export default function Recommendations({
  isDarkMode,
  filteredSuggestions,
  moveDownHandler,
  isVisible,
}: {
  isDarkMode: boolean;
  filteredSuggestions: string[];
  moveDownHandler: (s: string) => void;
  isVisible: boolean;
}) {
  return (
    isVisible && (
      <ul
        className={`
          absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[36rem] max-w-[90vw]
          border rounded-3xl shadow-lg z-20
          max-h-[15.5rem] overflow-y-auto
          ${
            isDarkMode
              ? "bg-[var(--nadry-bg-dark)] text-[var(--nadry-text-dark)] border-[var(--nadry-border-dark)]"
              : "bg-white text-black border-gray-300"
          }
        `}
      >
        {filteredSuggestions.map((s: string, idx: number) => (
          <li
            key={s}
            className={`
              flex items-center gap-3 px-6 py-3 cursor-pointer transition
              ${
                isDarkMode
                  ? "hover:bg-[var(--nadry-bg-dark-accent)] border-b border-b-[var(--nadry-border-dark)]/10"
                  : "hover:bg-gray-100 border-b border-b-gray-200"
              }
              ${idx === filteredSuggestions.length - 1 ? "border-b-0" : ""}
              group
            `}
            onMouseDown={() => moveDownHandler(s)}
          >
            {/* Search icon */}
            <span
              className={
                isDarkMode
                  ? "text-[var(--nadry-placeholder-dark)] opacity-80"
                  : "text-gray-400 opacity-80"
              }
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
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
            <span
              className={`
                text-base
                ${isDarkMode ? "text-[var(--nadry-text-dark)]" : "text-black"}
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
