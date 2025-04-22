import { useTheme } from "../../context/ThemeContext";
import { ResultItemProbs } from "../../types/types";
import { useState } from "react";
import Label from "../../ui/Label";
import {
  getContainerStyle,
  getIconBgStyle,
  getLinkStyle,
  getTextStyle,
  getSecondaryButtonStyle,
  getVisitButtonStyle,
} from "../../utils/styleUtils";
import { getDomain, getIcon } from "../../utils/resultsUtils";

export default function ResultItem({
  item: { url, description, title },
  isSponsored = false,
}: ResultItemProbs) {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`mb-6 rounded-lg transition-all duration-300 ${getContainerStyle(
        isDark,
        false,
        isSponsored
      )} p-2 sm:p-3 md:p-${isDark ? "4" : "5"} ${
        isHovered ? "transform translate-x-0.5 scale-[1.01]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div
          className={`flex-shrink-0 mt-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${getIconBgStyle(
            isDark,
            isSponsored
          )}`}
        >
          <span
            className={`text-sm sm:text-lg md:text-xl ${getLinkStyle(isDark)}`}
            role="img"
            aria-label="website"
          >
            {getIcon(url)}
          </span>
        </div>

        <div className="flex-grow min-w-0 overflow-hidden">
          {isSponsored && (
            <Label variant="sponsored" size="small" className="mb-1 sm:mb-2">
              Sponsored
            </Label>
          )}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block font-semibold text-sm sm:text-base md:text-lg mb-1 hover:underline break-words ${getLinkStyle(
              isDark
            )}`}
          >
            {title}
          </a>

          <div
            className={`text-xs mb-1 sm:mb-2 flex flex-wrap items-center text-[var(--nadry-accent)]`}
          >
            <span className="truncate max-w-[150px] sm:max-w-none">
              {getDomain(url)}
            </span>
            <span className="mx-1 sm:mx-2 opacity-50 flex-shrink-0">•</span>
            <span className={`flex-shrink-0 ${getTextStyle(isDark, true)}`}>
              {Math.floor(Math.random() * 11) + 1} min read
            </span>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed line-clamp-2 break-words ${getTextStyle(
              isDark
            )}`}
          >
            {description}
          </p>

          <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap gap-1 sm:gap-2 md:gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs px-2 sm:px-3 py-1 rounded-full hover:bg-opacity-90 transition-colors cursor-pointer ${getVisitButtonStyle(
                isDark
              )}`}
            >
              <span className="flex items-center gap-1">
                <span>Visit</span>
                <span className="text-xs">↗</span>
              </span>
            </a>
            <button
              className={`text-xs hover:underline cursor-pointer ${getTextStyle(
                isDark,
                true
              )}`}
            >
              Similar
            </button>
            <button
              className={`text-xs px-2 sm:px-3 py-1 rounded-full ml-auto cursor-pointer ${getSecondaryButtonStyle(
                isDark
              )}`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
