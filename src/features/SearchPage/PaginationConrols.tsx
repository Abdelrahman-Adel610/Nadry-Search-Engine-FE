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

  // Function to handle page change
  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams, { replace: true });
    if (location.hash) {
      window.location.hash = location.hash; // Preserve hash
    }
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Determine the range of pages to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Max number of page buttons (excluding first, last, ellipsis)
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow + 2) {
      // Show all pages if total pages are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show the first page

      let startPage = Math.max(2, currentPage - halfMaxPages);
      let endPage = Math.min(totalPages - 1, currentPage + halfMaxPages);

      // Adjust range if near the beginning
      if (currentPage - halfMaxPages <= 2) {
        endPage = Math.min(totalPages - 1, maxPagesToShow + 1);
      }

      // Adjust range if near the end
      if (currentPage + halfMaxPages >= totalPages - 1) {
        startPage = Math.max(2, totalPages - maxPagesToShow);
      }

      if (startPage > 2) {
        pages.push("..."); // Ellipsis after first page
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("..."); // Ellipsis before last page
      }

      pages.push(totalPages); // Always show the last page
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

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
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>
            {pageNumbers.map((page, index) => (
              <li key={index}>
                {typeof page === "number" ? (
                  <button
                    className={`px-3 py-2 rounded-lg font-medium transition hover:cursor-pointer ${getPaginationButtonStyle(
                      isDark,
                      currentPage === page,
                      false
                    )}`}
                    onClick={() => handlePageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    disabled={currentPage === page}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    className={`px-3 py-2 font-medium ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {page} {/* Ellipsis */}
                  </span>
                )}
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
                onClick={() => handlePageChange(currentPage + 1)}
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
