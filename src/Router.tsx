import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFoundPage from "./pages/NotFoundPage";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/Dashboard";
import ProtectRoutes from "./components/dashboard/ProtectRoutes";
export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    element: <ProtectRoutes />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
