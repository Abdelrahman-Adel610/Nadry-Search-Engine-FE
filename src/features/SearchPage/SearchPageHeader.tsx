import { getHeaderStyle, getPrimaryButtonStyle } from "../../utils/styleUtils";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import { SearchPageHeaderProps } from "../../types/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPageHeader({
  isDarkMode,
  performSearch,
}: SearchPageHeaderProps) {
  const [searchParams] = useSearchParams();
  const [displayQuery, setDisplayQuery] = useState(
    searchParams.get("query")?.toLowerCase() || ""
  );
  return (
    <header className="sticky top-0 z-50 w-full py-2 sm:py-3 sm:px-0 px-10">
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
          <div className="flex-grow max-w-2xl mx-auto sm:mx-0 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                performSearch(displayQuery);
              }}
            >
              <SearchBar
                foncusOnMount={false}
                query={displayQuery}
                setQuery={setDisplayQuery}
              />
            </form>
          </div>
          <button
            onClick={() => performSearch(displayQuery)}
            className={`hidden md:block ml-4 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer self-center mx-auto sm:mx-0 sm:self-auto ${getPrimaryButtonStyle(
              isDarkMode
            )}`}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
