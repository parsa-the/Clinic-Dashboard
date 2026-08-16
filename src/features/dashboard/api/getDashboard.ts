import type { DashboardData } from "@/types";

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await fetch("/api/dashboard");

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
};
