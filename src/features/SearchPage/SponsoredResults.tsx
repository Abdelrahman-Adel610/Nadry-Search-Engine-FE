import { SponsoredResultsProps } from "../../types/types";
import { getBorderStyle } from "../../utils/styleUtils";
import ResultItem from "./ResultItem";

export default function SponsoredResults({
  sponsoredResults,
  isDarkMode,
}: SponsoredResultsProps) {
  if (sponsoredResults.length === 0) return null;

  return (
    <div className={`mt-8 pt-6 border-t ${getBorderStyle(isDarkMode)}`}>
      <h3
        className={`text-xs uppercase mb-4 font-medium ${
          isDarkMode ? "text-[var(--nadry-text-dark)]/60" : "text-gray-500"
        }`}
      >
        Sponsored Results
      </h3>
      {sponsoredResults.map((item, idx) => (
        <div key={`sponsored-${idx}`} className="mb-6">
          <ResultItem item={item} isSponsored={true} />
        </div>
      ))}
    </div>
  );
}
