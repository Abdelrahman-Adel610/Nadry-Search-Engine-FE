import { useTheme } from "../../context/ThemeContext";
import { ResultsTabsProps, Tab } from "../../types/types";
import { getBorderStyle, getTabStyle } from "../../utils/styleUtils";

const tabs: Tab[] = [
  { id: "all", label: "All", icon: "🔍" },
  { id: "docs", label: "Documentation", icon: "📄" },
  { id: "github", label: "GitHub", icon: "📂" },
  { id: "tools", label: "Tools", icon: "🔧" },
];

export default function ResultsTabs({
  activeTab,
  onTabChange,
}: ResultsTabsProps) {
  const { isDark } = useTheme();

  const handleTabChange = (tabId: string) => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    onTabChange(tabId);
  };

  return (
    <div
      className={`mb-4 sm:mb-6 border-b overflow-x-auto whitespace-nowrap hide-scrollbar ${getBorderStyle(
        isDark
      )}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors border-b-2 cursor-pointer ${getTabStyle(
                isDark,
                activeTab === tab.id
              )}`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <span className="text-xs sm:text-sm">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
