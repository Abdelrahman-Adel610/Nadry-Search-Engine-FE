import { useLocation, useNavigate } from "react-router-dom";
import { relatedSearches } from "../../data/data";

export default function RelatedSearches({
  setQuery,
}: {
  setQuery: (newQuery: string) => void;
}) {
  const dark = useLocation().hash === "#dark";
  const navigate = useNavigate();

  return (
    <div
      className={` top-32 right-8 w-72 border rounded-2xl shadow-2xl p-5 transition-all duration-200
        absolute lg:opacity-100 opacity-0
        ${
          dark
            ? "bg-[var(--nadry-bg-dark)] border-[var(--nadry-border-dark)]"
            : "bg-white border-gray-200"
        }
      `}
    >
      <div
        className={`font-bold mb-3 text-lg flex items-center gap-2
          ${dark ? "text-[var(--nadry-text-dark)]" : "text-gray-800"}
        `}
      >
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold
            ${
              dark
                ? "bg-[var(--nadry-bg-dark-accent)] text-[var(--nadry-orange)]"
                : "bg-orange-100 text-orange-600"
            }
          `}
        >
          🔎
        </span>
        Related Searches
      </div>
      <ul className="space-y-2">
        {relatedSearches.map((item: string, idx: number) => (
          <li
            key={idx}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition
              ${
                dark
                  ? "hover:bg-[var(--nadry-bg-dark-accent)]"
                  : "hover:bg-orange-50"
              }
            `}
            onClick={() => {
              const params = new URLSearchParams(location.search);
              params.set("query", item);
              setQuery(item);
              navigate(`/search?${params.toString()}${location.hash}`);
            }}
          >
            <span
              className={`transition
                ${
                  dark
                    ? "text-[var(--nadry-orange)] group-hover:text-orange-400"
                    : "text-orange-400 group-hover:text-orange-600"
                }
              `}
            >
              →
            </span>
            <span
              className={`font-medium transition
                ${
                  dark
                    ? "text-[var(--nadry-text-dark)] group-hover:text-orange-400"
                    : "text-gray-700 group-hover:text-orange-700"
                }
              `}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
