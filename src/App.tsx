import AppLayout from "./AppLayout";
import Home from "./features/home/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
