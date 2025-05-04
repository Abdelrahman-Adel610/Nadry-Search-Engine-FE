const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5; // Limit the number of recent searches stored

/**
 * Retrieves recent searches from localStorage.
 */
export const getRecentSearches = (): string[] => {
  try {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      const parsedSearches = JSON.parse(storedSearches);
      // Ensure it's an array of strings
      if (
        Array.isArray(parsedSearches) &&
        parsedSearches.every((item) => typeof item === "string")
      ) {
        return parsedSearches;
      }
    }
  } catch (error) {
    console.error("Error reading recent searches from localStorage:", error);
    // Optionally clear corrupted data
    // localStorage.removeItem(RECENT_SEARCHES_KEY);
  }
  return []; // Return empty array if no data, data is corrupted, or not an array of strings
};

/**
 * Adds a new search query to localStorage, maintaining the limit.
 * Avoids adding duplicates and trims whitespace.
 */
export const addRecentSearch = (query: string): void => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return; // Don't add empty searches

  try {
    const searches = getRecentSearches();
    // Remove existing entry if it exists to move it to the top
    const filteredSearches = searches.filter((s) => s !== trimmedQuery);
    // Add the new query to the beginning
    const updatedSearches = [trimmedQuery, ...filteredSearches];
    // Limit the number of searches
    const limitedSearches = updatedSearches.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("Error adding recent search to localStorage:", error);
  }
};

/**
 * Clears all recent searches from localStorage.
 */
export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error("Error clearing recent searches from localStorage:", error);
  }
};
