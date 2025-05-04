import { useSearchParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import searchService from "../../Api/searchService";
import { RESULTS_PER_PAGE } from "../../utils/Consts";
import { noResultsSuggestions, sponsoredResults } from "../../data/data";
import { useState, useEffect } from "react";
import QueryTags from "./QueryTags";
import ResultItem from "./ResultItem";
import RelatedSearches from "./RelatedSearches";
import RecentSearches from "./RecentSearches";
import SponsoredResults from "./SponsoredResults";
import SearchPageFooter from "./SearchPageFooter";
import SearchHelpBox from "./SearchHelpBox";
import SearchPageHeader from "./SearchPageHeader";
import FeaturedResult from "./FeaturedResult";
import FilterBar from "./FilterBar";
import ResultsTabs from "./ResultsTabs";
import NoResults from "./NoResults";
import LoadingSkeleton from "./LoadingSkeleton";
import PaginationConrols from "./PaginationConrols";
import { SearchResponse } from "../../types/types";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const queryParam = searchParams.get("query")?.toLowerCase() || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const tabParam = searchParams.get("tab") || "all";
  const sortParam = searchParams.get("sort") || "relevance";

  const [, setSearchQuery] = useState(queryParam);

  const [activeTab, setActiveTab] = useState(tabParam);
  const [sortOrder, setSortOrder] = useState(sortParam);

  const dark = location.hash === "#dark";

  const {
    data: queryResult,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["search", queryParam, pageParam, tabParam, sortParam],
    queryFn: () =>
      searchService.search(
        queryParam,
        pageParam,
        tabParam,
        sortParam,
        RESULTS_PER_PAGE
      ),
    enabled: !!queryParam,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data = [],
    totalPages = 0,
    tokens = [],
    searchTimeSec = 0,
    totalResults = [],
  }: SearchResponse = queryResult || {};

  useEffect(() => {
    setSearchQuery(queryParam);
    setActiveTab(tabParam);
    setSortOrder(sortParam);
  }, [queryParam, tabParam, sortParam]);

  console.log(data, tokens);

  const filtered = Array.isArray(data) ? data : [];

  if (sortOrder === "date") {
    filtered.sort(() => Math.random() - 0.5);
  }

  const tabFiltered =
    activeTab === "all"
      ? filtered
      : filtered.filter((item) => {
          if (activeTab === "docs")
            return (
              item.url.includes("docs") || item.url.includes("documentation")
            );
          if (activeTab === "github") return item.url.includes("github");
          if (activeTab === "tools")
            return (
              item.url.includes("tools") || item.description.includes("tool")
            );
          return true;
        });

  const resultCount = tabFiltered.length;
  const featuredResult = resultCount > 0 ? tabFiltered[0] : null;

  const performSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || queryParam === trimmedQuery) return;

    setSearchParams({
      query: trimmedQuery,
      page: "1",
      tab: "all",
      sort: "relevance",
    });
  };

  const handleTabChange = (tab: string) => {
    searchParams.set("tab", tab);
    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
  };

  const handleSortChange = (sort: string) => {
    searchParams.set("sort", sort);
    setSearchParams(searchParams, { replace: true });
  };

  if (isError) {
    console.error("Search query error:", error);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden ">
      <SearchPageHeader isDarkMode={dark} performSearch={performSearch} />
      <main className="container max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-6 flex-grow mt-2">
        <div className="overflow-x-auto hide-scrollbar -mx-2 px-2">
          <ResultsTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isDarkMode={dark}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
          <div className="w-full md:w-8/12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <QueryTags
                resultCount={totalResults}
                tags={tokens}
                searchTime={searchTimeSec}
              />
              <FilterBar
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : resultCount === 0 && !isError ? (
              <NoResults
                query={queryParam}
                isDarkMode={dark}
                suggestions={noResultsSuggestions}
                onSuggestionClick={performSearch}
              />
            ) : isError ? (
              <div className="text-red-500 text-center py-10">
                Error loading results. Please try again.
              </div>
            ) : (
              <div className="mt-4 mb-10">
                {featuredResult && pageParam === 1 && activeTab === "all" && (
                  <FeaturedResult result={featuredResult} />
                )}
                {tabFiltered.map((item, idx) => (
                  <ResultItem item={item} key={idx} />
                ))}
                <SponsoredResults
                  sponsoredResults={sponsoredResults}
                  isDarkMode={dark}
                />
                <PaginationConrols totalPages={totalPages} />
              </div>
            )}
          </div>

          <div className="w-full md:w-4/12 mt-8 md:mt-0">
            <div className="sticky top-24 space-y-6">
              <RelatedSearches setQuery={performSearch} />
              <RecentSearches onSearchClick={performSearch} />
              <SearchHelpBox isDarkMode={dark} />
            </div>
          </div>
        </div>
      </main>
      <SearchPageFooter isDarkMode={dark} />
    </div>
  );
}
