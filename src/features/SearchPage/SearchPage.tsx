import { useSearchParams, useLocation, Link } from "react-router-dom";
import { dummyResults } from "../../data/data";
import SerchBar from "../../ui/SerchBar";
import Logo from "../../ui/Logo";
import { useState } from "react";
import QueryTags from "./QueryTags";
import ResultItem from "./ResultItem";
import { resultItemType } from "../../types/types";
import RelatedSearches from "./RelatedSearches";
import PaginationConrols from "./PaginationConrols";

const RESUTLTS_PER_PAGE = 15;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [query, setQuery] = useState(
    searchParams.get("query")?.toLowerCase() || ""
  );

  const dark = location.hash === "#dark";

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const filtered = dummyResults;

  const resultCount = filtered.length;

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(resultCount / RESUTLTS_PER_PAGE));
  const paginatedResults = filtered.slice(
    (currentPage - 1) * RESUTLTS_PER_PAGE,
    currentPage * RESUTLTS_PER_PAGE
  );

  return (
    <div className="w-full max-w-4xl my-10 px-3 ">
      <div className="flex flex-col sm:flex-row items-center mb-6 gap-3 max-w-3xl mx-auto">
        <Link to={"/nadry" + location.hash}>
          <span className="block max-w-[140px] sm:max-w-[90px] w-[32vw] sm:w-[18vw] min-w-[80px] h-auto ">
            <Logo dark={dark} />
          </span>
        </Link>
        <div className="flex-1 min-w-0 w-full max-w-[30rem]">
          <SerchBar
            foncusOnMount={false}
            isDarkMode={dark}
            query={query}
            setQuery={setQuery}
          />
        </div>
      </div>

      <QueryTags resultCount={resultCount} />

      <ul className="mt-2">
        {paginatedResults.map((item: resultItemType, idx: number) => (
          <ResultItem item={item} isLast={idx < paginatedResults.length - 1} />
        ))}
      </ul>

      <PaginationConrols totalPages={totalPages} />
      <RelatedSearches setQuery={(newQuery: string) => setQuery(newQuery)} />
    </div>
  );
}
