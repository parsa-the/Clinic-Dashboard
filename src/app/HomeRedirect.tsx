import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/auth.store";

export const HomeRedirect = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Navigate
      to={user.role === "consultant" ? "/consultant/dashboard" : "/dashboard"}
      replace
    />
  );
};
