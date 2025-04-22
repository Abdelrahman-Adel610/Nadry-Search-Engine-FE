import { useTheme } from "../context/ThemeContext";

export default function SearchIcon() {
  const { isDark } = useTheme();
  return (
    <span
      className={
        isDark
          ? "text-[var(--nadry-placeholder-dark)] opacity-80 me-2"
          : "text-[var(--nadry-primary)] opacity-60 me-2"
      }
    >
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 20L17 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
