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
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90%] max-w-[48rem] border rounded-2xl shadow-lg z-20
          max-h-[15.5rem] overflow-y-auto
            ${
              isDarkMode
                ? "bg-[var(--nadry-bg-dark-accent)] text-[var(--nadry-text-dark)] border-[var(--nadry-border-dark)]"
                : "bg-[var(--nadry-bg-light)] text-[var(--nadry-text-light)] border-[var(--nadry-border-light)]"
            }
          `}
      >
        {filteredSuggestions.map((s: string) => (
          <li
            key={s}
            className={`px-6 py-3 cursor-pointer transition 
                ${
                  isDarkMode
                    ? "hover:bg-[var(--nadry-bg-dark)] border-b border-b-[var(--nadry-text-dark)]/10"
                    : "hover:bg-[var(--nadry-bg-accent)] border-b border-b-[var(--nadry-text-light)]/10"
                }
              `}
            onMouseDown={() => moveDownHandler(s)}
          >
            {s}
          </li>
        ))}
      </ul>
    )
  );
}
