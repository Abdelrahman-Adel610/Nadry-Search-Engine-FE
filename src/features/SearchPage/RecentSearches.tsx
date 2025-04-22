import { useTheme } from "../../context/ThemeContext";
import { recentSearches } from "../../data/data";
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

  return (
    <div className={`rounded-xl ${getCardStyle(isDark)}`}>
      <div className={getSidebarHeaderStyle(isDark)}>
        <h3 className={`font-semibold ${getTextStyle(isDark)}`}>
          Recent Searches
        </h3>
      </div>

      <div className="p-4">
        <ul className="space-y-1">
          {recentSearches.map((item, idx) => (
            <li key={idx}>
              <button
                className={getSidebarItemStyle(isDark)}
                onClick={() => onSearchClick(item)}
              >
                <span className="text-sm mr-2">🕒</span>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={`p-4 border-t text-center ${getBorderStyle(isDark)}`}>
        <button
          className={`text-xs hover:underline cursor-pointer ${getLinkStyle(
            isDark
          )}`}
        >
          Clear History
        </button>
      </div>
    </div>
  );
}
