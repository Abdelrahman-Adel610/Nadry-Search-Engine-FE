import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useNavigate,
} from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SearchPageHeader from "./SearchPage/SearchPageHeader";
import Logo from "../ui/Logo";
import {
  getTextStyle,
  getLinkStyle,
  getPrimaryButtonStyle,
  getSecondaryButtonStyle,
  getCardStyle,
} from "../utils/styleUtils";

export default function SearchError() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Handle different types of errors
  const errorTitle =
    isRouteErrorResponse(error) && error.status === 404
      ? "Page Not Found"
      : "Search Error";

  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText || `Error ${error.status}`
    : error instanceof Error
    ? error.message
    : "An unexpected error occurred";

  const handleSearch = (newQuery: string) => {
    navigate(`/search?query=${encodeURIComponent(newQuery)}`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[var(--nadry-bg-dark)]" : "bg-[var(--nadry-bg-light)]"
      }`}
    >
      <SearchPageHeader isDarkMode={isDark} performSearch={handleSearch} />

      <main className="container max-w-6xl mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div
          className={`max-w-lg w-full p-6 sm:p-10 rounded-2xl text-center ${getCardStyle(
            isDark
          )}`}
        >
          <div className="mb-6">
            <Logo size="medium" animated={false} />
          </div>

          <div className={`text-center mb-8 ${getTextStyle(isDark)}`}>
            <h1 className="text-3xl font-bold mb-4">{errorTitle}</h1>
            <p className={`text-lg mb-6 ${getTextStyle(isDark, true)}`}>
              {errorMessage}
            </p>

            <div
              className={`p-6 rounded-lg mb-6 text-left ${
                isDark
                  ? "bg-[var(--nadry-bg-dark)]"
                  : "bg-[var(--nadry-bg-light-accent)]"
              }`}
            >
              <h3 className={`font-semibold mb-3 ${getLinkStyle(isDark)}`}>
                Troubleshooting Tips:
              </h3>
              <ul className={`space-y-2 ${getTextStyle(isDark, true)}`}>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Try refreshing the page</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Check if the URL is correct</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Try a different search query</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className={`px-6 py-2.5 rounded-full transition-all ${getPrimaryButtonStyle(
                isDark
              )}`}
            >
              Try Again
            </button>
            <Link
              to="/nadry"
              className={`px-6 py-2.5 rounded-full border transition-all ${getSecondaryButtonStyle(
                isDark
              )}`}
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
