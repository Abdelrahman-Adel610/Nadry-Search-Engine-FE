import { resultItemType } from "../types/types";
export const RESULTS_PER_PAGE = 10;

/**
 * Returns a paginated slice of results based on current page
 * @param results The full array of results to paginate
 * @param currentPage The current page number (1-based)
 * @returns A slice of results for the current page
 */
export function paginateResults(
  results: resultItemType[],
  currentPage: number
): resultItemType[] {
  return results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );
}

/**
 * Calculates the total number of pages needed
 * @param totalItems The total number of items to paginate
 * @returns The total number of pages
 */
export function calculateTotalPages(totalItems: number): number {
  return Math.max(1, Math.ceil(totalItems / RESULTS_PER_PAGE));
}
