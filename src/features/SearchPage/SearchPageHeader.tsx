import { getHeaderStyle, getPrimaryButtonStyle } from "../../utils/styleUtils";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import { SearchPageHeaderProps } from "../../types/types";
import { useState, useEffect } from "react"; // Import useEffect
import { useSearchParams } from "react-router-dom";
import useAddSug from "../../Hooks/useAddSug";
import { addRecentSearch } from "../../utils/localStorageUtils";
// Import the utility

export default function SearchPageHeader({
  isDarkMode,
  performSearch,
}: SearchPageHeaderProps) {
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("query")?.toLowerCase() || "";
  const [displayQuery, setDisplayQuery] = useState(currentQuery);
  const { mutate: addSug } = useAddSug();

  // Update displayQuery if the URL search param changes externally
  useEffect(() => {
    setDisplayQuery(currentQuery);
  }, [currentQuery]);

  return (
    <header className="sticky top-0 z-50 w-full py-2 sm:py-3 sm:px-0 px-4">
      <div
        className={`container max-w-6xl mx-auto px-1 sm:px-4 rounded-3xl md:py-2 md:my-2 md:shadow-sm sm:pb-0 pb-3 ${getHeaderStyle(
          isDarkMode
        )}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <div className="flex justify-center sm:justify-start">
            <Logo
              size="small"
              animated={false}
              linkTo={"/nadry" + location.hash}
            />
          </div>
          <div className="flex-grow max-w-3xl mx-auto sm:mx-0 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmedQuery = displayQuery.trim();
                if (!trimmedQuery) return; // Prevent empty search
                addRecentSearch(trimmedQuery); // Add to recent searches
                performSearch(trimmedQuery); // Use the trimmed query
                addSug(trimmedQuery);
              }}
              className="flex items-center gap-2"
            >
              <div className="flex-grow">
                <SearchBar
                  foncusOnMount={false}
                  query={displayQuery}
                  setQuery={setDisplayQuery}
                />
              </div>
              <button
                type="submit"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${getPrimaryButtonStyle(
                  isDarkMode
                )}`}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
