import { SearchResult } from "../types/types";
import { MAX_NUMBER_OF_SUGGESTIONS } from "../utils/Consts";
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
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Search API error:", error);
      throw error;
    }
  },
  suggest: async (query: string) => {
    try {
      const response = await apiClient.get("/suggestions", {
        params: {
          query: query.trim(),
          limit: MAX_NUMBER_OF_SUGGESTIONS,
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Search API error:", error);
      throw error;
    }
  },
  addTosugs: async (query: string) => {
    try {
      console.log(query + "SSSSSSSSSSSSSSSSSSSSS");
      const response = await apiClient.post("/save-search", { query });
      console.log(response.data.success);
      return response.data.success;
    } catch (error) {
      console.error("Search API error:", error);
      throw error;
    }
  },
};
export default searchService;
