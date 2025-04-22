import { useTheme } from "../../context/ThemeContext";
import { FeaturedResultProps } from "../../types/types";
import Label from "../../ui/Label";
import {
  getContainerStyle,
  getPrimaryButtonStyle,
  getSecondaryButtonStyle,
  getTextStyle,
  getLinkStyle,
} from "../../utils/styleUtils";

export default function FeaturedResult({ result }: FeaturedResultProps) {
  const { isDark } = useTheme();
  // Extract domain name for display
  const domain = new URL(result.url).hostname.replace("www.", "");

  return (
    <div
      className={`mb-6 sm:mb-8 p-3 sm:p-4 md:p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${getContainerStyle(
        isDark,
        true
      )}`}
    >
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Label variant="featured" size="small">
          Featured Result
        </Label>
      </div>

      <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 break-words">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:underline ${getLinkStyle(isDark)}`}
        >
          {result.title}
        </a>
      </h2>

      <div className={`text-xs mb-2 sm:mb-3 ${getTextStyle(isDark, true)}`}>
        {domain}
      </div>

      <p
        className={`mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-3 ${getTextStyle(
          isDark
        )}`}
      >
        {result.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${getPrimaryButtonStyle(
            isDark
          )}`}
        >
          Visit Site
        </a>

        <button
          className={`text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all border ${getSecondaryButtonStyle(
            isDark
          )}`}
        >
          More details
        </button>
      </div>
    </div>
  );
}
