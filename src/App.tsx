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
