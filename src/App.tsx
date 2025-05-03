import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./features/home/Home";
import SearchPage from "./features/SearchPage/SearchPage";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import searchService from "./Api/searchService";
import { RESULTS_PER_PAGE } from "./utils/Consts";
import { SearchResult } from "./types/types";
import SearchError from "./features/SearchError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Root loader that preserves hash when redirecting
const rootLoader = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    const hash = url.hash || "";
    return redirect(`/nadry${hash}`);
  }
  return null;
};

// Create router with modern data API approach
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    ),
    loader: rootLoader,
    children: [
      {
        path: "nadry",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get("query") || "";
          const page = parseInt(url.searchParams.get("page") || "1");
          const tab = url.searchParams.get("tab") || "all";
          const sort = url.searchParams.get("sort") || "relevance";
          const queryClient = new QueryClient();
          const {
            data,
            totalPages,
            tokens,
            searchTimeSec,
            totalResults,
          }: {
            data: SearchResult;
            totalPages: number;
            tokens: string[];
            searchTimeSec: number;
            totalResults: number;
          } = await queryClient.fetchQuery({
            queryKey: ["search", query, page, tab, sort],
            queryFn: () =>
              searchService.search(query, page, tab, sort, RESULTS_PER_PAGE),
          });
          console.log(data, totalPages);

          return { data, totalPages, tokens, searchTimeSec, totalResults };
        },
        errorElement: <SearchError />,
      },
      {
        path: "*",
        element: <SearchError />,
      },
    ],
  },
  {
    path: "*",
    element: <SearchError />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
