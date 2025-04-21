import { useLocation } from "react-router-dom";
import { resultItemType } from "../../types/types";

export default function ResultItem({
  item: { url, description, title },
  isLast,
}: {
  item: resultItemType;
  isLast: boolean;
}) {
  const dark = useLocation().hash === "#dark";
  return (
    <li key={url} className="py-3">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-1
                  ${dark ? "bg-[var(--nadry-bg-dark-accent)]" : "bg-orange-50"}
                `}
          aria-hidden="true"
        >
          {/* Compass icon (Unicode U+1F9ED) */}
          <span
            className={
              dark
                ? "text-lg text-[var(--nadry-orange)]"
                : "text-lg text-orange-400"
            }
            role="img"
            aria-label="compass"
          >
            🧭
          </span>
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-base sm:text-lg font-semibold transition
                  ${
                    dark
                      ? "text-[var(--nadry-orange)] hover:underline"
                      : "text-blue-700 hover:underline"
                  }
                `}
        >
          {title}
        </a>
        <span
          className={`text-xs sm:text-sm truncate
                  ${
                    dark ? "text-[var(--nadry-orange-light)]" : "text-green-700"
                  }
                `}
        >
          {url}
        </span>
      </div>
      <div
        className={`text-sm sm:text-base leading-relaxed mt-1
                ${
                  dark
                    ? "text-[var(--nadry-text-dark)] opacity-90"
                    : "text-gray-700"
                }
              `}
      >
        {description}
      </div>

      {isLast && (
        <hr
          className={`my-2 border-t
                  ${
                    dark
                      ? "border-[var(--nadry-border-dark)]/20"
                      : "border-gray-600/20"
                  }
                `}
        />
      )}
    </li>
  );
}
