import { useLocation, useSearchParams } from "react-router-dom";
const searchTime = (Math.random() * 0.2 + 0.05).toFixed(3);

export default function QueryTags({ resultCount }: { resultCount: number }) {
  const [searchPargams] = useSearchParams();
  const dark = useLocation().hash === "#dark";
  const searchQuery = searchPargams.get("query");
  const tags = searchQuery
    ? Array.from(
        new Set(
          searchQuery
            .split(/\s+/)
            .map((w) => w.trim())
            .filter(Boolean)
        )
      )
    : [];
  return (
    <div className="flex flex-wrap items-center gap-4 mb-2">
      <div className="text-gray-500 text-base">
        {resultCount > 0 ? (
          <>
            <span>
              Found about <b>{resultCount.toLocaleString()}</b> results in{" "}
              <b>{searchTime}s</b>
            </span>
          </>
        ) : (
          <span>No results found.</span>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className={
              dark
                ? "bg-[var(--nadry-bg-dark-accent)] text-[var(--nadry-orange)] px-3 py-1 rounded-full text-sm font-semibold"
                : "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
            }
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
