import { searchTips } from "../../data/data";
import { getTextStyle, getLinkStyle } from "../../utils/styleUtils";

export default function SearchHelpBox({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div
      className={`p-4 rounded-xl ${
        isDarkMode
          ? "bg-[var(--nadry-bg-dark)] border border-[var(--nadry-border-dark)]/40"
          : "bg-[var(--nadry-primary-lighter)]/50 border border-[var(--nadry-primary-lighter)]"
      }`}
    >
      <h3 className={`font-semibold mb-2 ${getLinkStyle(isDarkMode)}`}>
        Search Tips
      </h3>
      <ul className={`text-sm space-y-2 ${getTextStyle(isDarkMode, true)}`}>
        {searchTips.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span>•</span>
            <span>{item.tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
