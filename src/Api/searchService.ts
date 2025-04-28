import { SearchResult } from "../types/types";
import apiClient from "./client";

export const searchService = {
  /**
   * Perform a search query
   */
  search: async (
    query: string,
    page: number = 1,
    tab: string = "all",
    sort: string = "relevance",
    limit: number
  ): Promise<SearchResult> => {
    try {
      const response = await apiClient.get("/search", {
        params: { query, page, tab, sort, limit },
      });

      return response.data;
    } catch (error) {
      console.error("Search API error:", error);
      throw error;
    }
  },
};

export default searchService;
