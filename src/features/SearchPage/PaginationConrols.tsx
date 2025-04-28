import { useLocation, useSearchParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getCardStyle, getPaginationButtonStyle } from "../../utils/styleUtils";

export default function PaginationConrols({
  totalPages,
}: {
  totalPages: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const location = useLocation();
  const { isDark } = useTheme();

  return (
    <div>
      {totalPages > 1 && (
        <nav
          aria-label="Search results pages"
          className="mt-12 flex justify-center"
        >
          <ul
            className={`inline-flex items-center gap-1 rounded-xl shadow border px-2 py-1 ${getCardStyle(
              isDark
            )}`}
          >
            <li>
              <button
                className={`px-3 py-2 rounded-lg font-medium transition ${getPaginationButtonStyle(
                  isDark,
                  false,
                  currentPage === 1
                )}`}
                disabled={currentPage === 1}
                aria-label="Previous page"
                onClick={() => {
                  searchParams.set("page", String(currentPage - 1));
                  setSearchParams(searchParams, { replace: true });
                  if (location.hash) {
                    window.location.hash = location.hash;
                  }
                }}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  className={`px-3 py-2 rounded-lg font-medium transition hover:cursor-pointer ${getPaginationButtonStyle(
                    isDark,
                    currentPage === i + 1,
                    false
                  )}`}
                  onClick={() => {
                    searchParams.set("page", String(i + 1));
                    setSearchParams(searchParams, { replace: true });
                    if (location.hash) {
                      window.location.hash = location.hash;
                    }
                  }}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  disabled={currentPage === i + 1}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-3 py-2 rounded-lg font-medium transition ${getPaginationButtonStyle(
                  isDark,
                  false,
                  currentPage === totalPages
                )}`}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                onClick={() => {
                  searchParams.set("page", String(currentPage + 1));
                  setSearchParams(searchParams, { replace: true });
                  if (location.hash) {
                    window.location.hash = location.hash;
                  }
                }}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
