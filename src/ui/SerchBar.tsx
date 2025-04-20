import { useState } from "react";

export default function SerchBar({
  isDarkMode,
  foncusOnMount,
}: {
  isDarkMode: boolean;
  foncusOnMount: boolean;
}) {
  const [inputFocused, setInputFocused] = useState(foncusOnMount);
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        value={query}
        autoFocus={foncusOnMount}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"What do you think of ?"}
        className={`px-8 py-4 rounded-4xl text-xl focus:outline-none focus:ring-1 transition-all duration-500 mx-0
                max-w-[80vw] shadow-sm
                placeholder:text-lg placeholder:tracking-wider placeholder:opacity-50
                ${
                  isDarkMode
                    ? "bg-[var(--nadry-bg-dark)] text-[var(--nadry-text-dark)] border-1 border-[var(--nadry-border-dark)] focus:ring-[var(--nadry-border-dark)] focus:border-[var(--nadry-border-dark)] placeholder-[var(--nadry-placeholder-dark)] shadow-[0_4px_32px_0_#0008]"
                    : "bg-[var(--nadry-bg-light)] text-[var(--nadry-text-light)] border-1 border-[var(--nadry-border-light)] focus:ring-[var(--nadry-border-light)] focus:border-[var(--nadry-border-light)] placeholder-[var(--nadry-placeholder-light)] shadow-[0_4px_32px_0_#ff980022]"
                }
                ${
                  inputFocused || query.trim()
                    ? "w-[48rem] shadow-lg"
                    : "w-[32rem]"
                }
                 transition duration-200
              `}
        autoComplete="off"
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
    </div>
  );
}
