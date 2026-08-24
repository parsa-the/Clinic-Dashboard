import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import RoleRoute from "@/features/auth/components/RoleRoute";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ConsultantsPage from "@/features/consultants/pages/ConsultantsPage";
import BookingPage from "@/features/booking/pages/BookingPage";
import BookingResultPage from "@/features/booking/pages/BookingResultPage";
import MyAppointmentsPage from "@/features/appointments/pages/MyAppointmentsPage";
import ConsultantDashboardPage from "@/features/consultant-panel/pages/ConsultantDashboardPage";
import ConsultantCalendarPage from "@/features/consultant-panel/pages/ConsultantCalendarPage";
import AvailabilityPage from "@/features/consultant-panel/pages/AvailabilityPage";
import UserLayout from "./layouts/UserLayout";
import ConsultantLayout from "./layouts/ConsultantLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import { HomeRedirect } from "./HomeRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute role="user" />,
        children: [
          {
            element: <UserLayout />,
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
              { path: "/appointments", element: <MyAppointmentsPage /> },
              { path: "/consultants", element: <ConsultantsPage /> },
              {
                path: "/consultant-page",
                element: <Navigate to="/consultants" replace />,
              },
              { path: "/booking", element: <BookingPage /> },
              { path: "/booking/result/:id", element: <BookingResultPage /> },
            ],
          },
        ],
      },
      {
        element: <RoleRoute role="consultant" />,
        children: [
          {
            element: <ConsultantLayout />,
            children: [
              {
                path: "/consultant",
                element: <Navigate to="/consultant/dashboard" replace />,
              },
              {
                path: "/consultant/dashboard",
                element: <ConsultantDashboardPage />,
              },
              {
                path: "/consultant/calendar",
                element: <ConsultantCalendarPage />,
              },
              {
                path: "/consultant/availability",
                element: <AvailabilityPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
