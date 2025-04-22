import { useTheme } from "../../context/ThemeContext";

export default function LoadingSkeleton({ count = 5 }: { count?: number }) {
  const { isDark } = useTheme();

  return (
    <div className="sm:min-w-[40rem] min-w-[30rem]">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`mb-6 p-6 rounded-lg animate-pulse  ${
            isDark ? "bg-[var(--nadry-bg-dark-accent)]" : "bg-gray-100 "
          }`}
        >
          <div
            className={`h-5 w-3/4 mb-4 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-3 w-1/4 mb-3 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-4 w-full mb-2 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-4 w-5/6 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
}
