import { useTheme } from "../../context/ThemeContext";
import Label from "../../ui/Label";
import { getTextStyle } from "../../utils/styleUtils";

export default function QueryTags({
  resultCount,
  tags,
  searchTime,
}: {
  resultCount: number;
  tags: string[];
  searchTime: number;
}) {
  const { isDark } = useTheme();

  return (
    <div>
      <div className={`mb-3 text-sm ${getTextStyle(isDark, true)}`}>
        {resultCount > 0 ? (
          <span>
            About <strong>{resultCount.toLocaleString()}</strong> results (
            {searchTime.toFixed(3)} seconds)
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
