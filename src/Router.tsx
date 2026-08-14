import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFoundPage from "./pages/NotFoundPage";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/user/Dashboard";
import ProtectRoutes from "./components/user-dashboard/ProtectRoutes";
import Consultant from "./pages/consultant/Consultant";
import ConsultantLayout from "./layouts/ConsultantLayout";
import ConsultantPage from "./pages/user/ConsultantPage";
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
          {
            path:"/consultant-page",
            element:<ConsultantPage/>
          }
        ],
      },
      {
        element: <ConsultantLayout />,
        children : [
          {
            path: "/consultant",
            element: <Consultant />,
          },
        ],
      },
    ],
  },
]);
