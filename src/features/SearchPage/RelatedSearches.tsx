import { relatedSearches } from "../../data/data";
import { useTheme } from "../../context/ThemeContext";
import {
  getCardStyle,
  getBorderStyle,
  getTextStyle,
  getLinkStyle,
  getSidebarHeaderStyle,
  getSidebarItemStyle,
} from "../../utils/styleUtils";

export default function RelatedSearches({
  setQuery,
}: {
  setQuery: (newQuery: string) => void;
}) {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl ${getCardStyle(isDark)}`}>
      <div className={getSidebarHeaderStyle(isDark)}>
        <h2
          className={`flex items-center gap-2 font-semibold ${getTextStyle(
            isDark
          )}`}
        >
          <span className="text-lg">🔍</span> Related Searches
        </h2>
      </div>

      <div className="p-4">
        <ul className="space-y-1">
          {relatedSearches.map((item, idx) => (
            <li key={idx}>
              <button
                className={getSidebarItemStyle(isDark)}
                onClick={() => setQuery(item)}
              >
                <span className="flex items-center gap-2">
                  <span className={getLinkStyle(isDark)}>→</span>
                  {item}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={`p-4 border-t ${getBorderStyle(isDark)}`}>
        <div className={`text-sm ${getTextStyle(isDark, true)}`}>
          Try these related topics to expand your search
        </div>
      </div>
    </div>
  );
}
