import {
  useSearchParams,
  useLocation,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { noResultsSuggestions, sponsoredResults } from "../../data/data";
import { useState } from "react";
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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Keep two separate states - one for display in the search box, one for actual searching

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query")?.toLowerCase() || ""
  );

  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("relevance");

  const dark = location.hash === "#dark";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, totalPages } = useLoaderData();
  const isLoading = useNavigation().state === "loading";
  console.log(data);

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

  // Get featured result (first result)
  const featuredResult = resultCount > 0 ? tabFiltered[0] : null;


  const performSearch = (query: string) => {
    if (!query.trim() || searchQuery === query) return;
    // Update states
    setSearchQuery(query);
    setActiveTab("all");

    // Update URL parameters
    setSearchParams({ query: query, page: "1" });

    // Set loading state
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ page: "1" }, { replace: true });
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };

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
              <QueryTags resultCount={resultCount} />
              <FilterBar
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : resultCount === 0 ? (
              <NoResults
                query={searchQuery}
                isDarkMode={dark}
                suggestions={noResultsSuggestions}
                onSuggestionClick={performSearch}
              />
            ) : (
              <div className="mt-4 mb-10">
                {/* Featured Result */}
                {featuredResult && currentPage === 1 && activeTab === "all" && (
                  <FeaturedResult result={featuredResult} />
                )}
                {/* Regular Results */}
                {filtered.map((item, idx) => (
                  <ResultItem item={item} key={idx} />
                ))}
                {/* Sponsored Results */}
                <SponsoredResults
                  sponsoredResults={sponsoredResults}
                  isDarkMode={dark}
                />
                <PaginationConrols totalPages={totalPages} />
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="w-full md:w-4/12 mt-8 md:mt-0">
            <div className="sticky top-24 space-y-6">
              <RelatedSearches setQuery={performSearch} />

              <RecentSearches onSearchClick={performSearch} />

              {/* Help box */}
              <SearchHelpBox isDarkMode={dark} />
            </div>
          </div>
        </div>
      </main>
      <SearchPageFooter isDarkMode={dark} />
    </div>
  );
}
