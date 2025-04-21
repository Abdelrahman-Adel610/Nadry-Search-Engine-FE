import { useLocation, useSearchParams } from "react-router-dom";

export default function PaginationConrols({
  totalPages,
}: {
  totalPages: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const dark = useLocation().hash === "#dark";
  return (
    <div>
      {totalPages > 1 && (
        <nav
          aria-label="Search results pages"
          className="mt-12  flex justify-center"
        >
          <ul
            className={`inline-flex items-center gap-1 rounded-xl shadow border px-2 py-1
              ${
                dark
                  ? "bg-[var(--nadry-bg-dark-accent)] border-[var(--nadry-border-dark)]"
                  : "bg-white border-orange-200"
              }
            `}
          >
            <li>
              <button
                className={`px-3 py-2 rounded-lg font-medium transition
                  ${
                    currentPage === 1
                      ? dark
                        ? "text-gray-500 cursor-not-allowed bg-[var(--nadry-bg-dark)] border border-[var(--nadry-border-dark)]"
                        : "text-gray-300 cursor-not-allowed bg-orange-50 border border-orange-100"
                      : dark
                      ? "hover:bg-[var(--nadry-bg-dark)] hover:text-[var(--nadry-orange)] text-[var(--nadry-orange)] border border-transparent"
                      : "hover:bg-orange-100 hover:text-orange-700 text-orange-600 border border-transparent"
                  }
                `}
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
                  className={`px-3 py-2 rounded-lg font-medium transition
                    ${
                      currentPage === i + 1
                        ? dark
                          ? "bg-[var(--nadry-orange)] text-[var(--nadry-bg-dark)] border border-[var(--nadry-orange)] shadow"
                          : "bg-orange-500 text-white border border-orange-500 shadow"
                        : dark
                        ? "text-[var(--nadry-orange)] hover:bg-[var(--nadry-bg-dark)] hover:text-[var(--nadry-orange)] border border-transparent"
                        : "text-orange-600 hover:bg-orange-100 hover:text-orange-700 border border-transparent"
                    }
                  `}
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
                className={`px-3 py-2 rounded-lg font-medium transition
                  ${
                    currentPage === totalPages
                      ? dark
                        ? "text-gray-500 cursor-not-allowed bg-[var(--nadry-bg-dark)] border border-[var(--nadry-border-dark)]"
                        : "text-gray-300 cursor-not-allowed bg-orange-50 border border-orange-100"
                      : dark
                      ? "hover:bg-[var(--nadry-bg-dark)] hover:text-[var(--nadry-orange)] text-[var(--nadry-orange)] border border-transparent"
                      : "hover:bg-orange-100 hover:text-orange-700 text-orange-600 border border-transparent"
                  }
                `}
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
