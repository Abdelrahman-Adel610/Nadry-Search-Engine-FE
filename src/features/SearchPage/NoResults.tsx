import { useTheme } from "../../context/ThemeContext";
import { NoResultsProps } from "../../types/types";
import {
  getCardStyle,
  getTextStyle,
  getLinkStyle,
  getSuggestionButtonStyle,
} from "../../utils/styleUtils";

export default function NoResults({
  query,
  suggestions,
  onSuggestionClick,
}: NoResultsProps) {
  const { isDark } = useTheme();

  return (
    <div className="py-10 text-center">
      <div className={`text-6xl mb-6 ${isDark ? "opacity-80" : ""}`}>🔍</div>

      <h2 className={`text-xl font-bold mb-3 ${getTextStyle(isDark)}`}>
        No results found for "{query}"
      </h2>

      <p className={`mb-6 max-w-md mx-auto ${getTextStyle(isDark, true)}`}>
        We couldn't find any matches for your search. Try different keywords or
        check out these suggestions:
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(suggestion)}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer ${getSuggestionButtonStyle(
              isDark
            )}`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div
        className={`max-w-md mx-auto p-4 rounded-lg border ${getCardStyle(
          isDark
        )}`}
      >
        <h3 className={`font-medium mb-2 ${getLinkStyle(isDark)}`}>
          Search Tips:
        </h3>
        <ul
          className={`text-sm text-left space-y-1.5 ${getTextStyle(
            isDark,
            true
          )}`}
        >
          <li>• Check your spelling</li>
          <li>• Try more general keywords</li>
          <li>• Try different keywords</li>
          <li>• Try fewer keywords</li>
        </ul>
      </div>
    </div>
  );
}
