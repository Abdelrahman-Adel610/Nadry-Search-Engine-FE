import AppLayout from "./AppLayout";
import Home from "./features/home/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SearchPage from "./features/SearchPage/SearchPage";

function App() {
  let theme = localStorage.getItem("theme");
  theme = theme
    ? theme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          index: true,
          element: <Navigate to={`/nadry#${theme}`} />,
        },
        {
          path: "/nadry",
          element: <Home />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
