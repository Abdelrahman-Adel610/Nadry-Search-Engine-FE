import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  getRecentSearches,
  clearRecentSearches,
} from "../../utils/localStorageUtils";
import {
  getCardStyle,
  getTextStyle,
  getSidebarHeaderStyle,
  getSidebarItemStyle,
  getLinkStyle,
  getBorderStyle,
} from "../../utils/styleUtils";

type RecentSearchesProps = {
  onSearchClick: (query: string) => void;
};

export default function RecentSearches({ onSearchClick }: RecentSearchesProps) {
  const { isDark } = useTheme();
  const [searches, setSearches] = useState<string[]>([]);

  // Function to load searches, can be called on mount and after search
  const loadSearches = () => {
    setSearches(getRecentSearches());
  };

  useEffect(() => {
    loadSearches(); // Load searches on component mount

    // Optional: Listen for storage changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "recentSearches") {
        loadSearches();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClearHistory = () => {
    clearRecentSearches();
    setSearches([]); // Update state to reflect the change immediately
  };

  const handleRecentSearchClick = (query: string) => {
    // The search action itself (triggered by onSearchClick) will add it again via SearchPageHeader/Search
    onSearchClick(query);
  };

  return (
    <div className={`rounded-xl ${getCardStyle(isDark)}`}>
      <div className={getSidebarHeaderStyle(isDark)}>
        <h3 className={`font-semibold ${getTextStyle(isDark)}`}>
          Recent Searches
        </h3>
      </div>

      <div className="p-4">
        {searches.length > 0 ? (
          <ul className="space-y-1">
            {searches.map((item, idx) => (
              <li key={idx}>
                <button
                  className={getSidebarItemStyle(isDark)}
                  onClick={() => handleRecentSearchClick(item)}
                >
                  <span className="text-sm mr-2">🕒</span>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-sm ${getTextStyle(isDark, true)}`}>
            No recent searches.
          </p>
        )}
      </div>

      {searches.length > 0 && (
        <div className={`p-4 border-t text-center ${getBorderStyle(isDark)}`}>
          <button
            onClick={handleClearHistory}
            className={`text-xs hover:underline cursor-pointer ${getLinkStyle(
              isDark
            )}`}
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
