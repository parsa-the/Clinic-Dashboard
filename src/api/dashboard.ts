import toast from "react-hot-toast";
import type { DashboardData } from "../types/index";

export const getDashboard = async (): Promise<DashboardData> => {
  const res = await fetch("/api/dashboard");
  if (!res.ok) {
    toast.error("  ارتباط با سرور برقرار نشد ! ");
  }
  return res.json();
};
