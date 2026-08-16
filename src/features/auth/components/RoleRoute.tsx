import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../model/auth.store";
import type { UserRole } from "@/types";

const RoleRoute = ({ role }: { role: UserRole }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return (
      <Navigate
        to={user.role === "consultant" ? "/consultant/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleRoute;
