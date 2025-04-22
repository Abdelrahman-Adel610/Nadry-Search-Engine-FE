import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Label from "../../ui/Label";
import { getTextStyle } from "../../utils/styleUtils";

const searchTime = (Math.random() * 0.2 + 0.05).toFixed(3);

export default function QueryTags({ resultCount }: { resultCount: number }) {
  const [searchParams] = useSearchParams();
  const { isDark } = useTheme();
  const searchQuery = searchParams.get("query");
  const tags = searchQuery
    ? Array.from(
        new Set(
          searchQuery
            .split(/\s+/)
            .map((w) => w.trim())
            .filter(Boolean)
        )
      )
    : [];
  return (
    <div>
      <div className={`mb-3 text-sm ${getTextStyle(isDark, true)}`}>
        {resultCount > 0 ? (
          <span>
            About <strong>{resultCount.toLocaleString()}</strong> results (
            {searchTime} seconds)
          </span>
        ) : (
          <span>No results found</span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <Label key={tag} variant="tag" size="medium">
              {tag}
            </Label>
          ))}
        </div>
      )}
    </div>
  );
}
