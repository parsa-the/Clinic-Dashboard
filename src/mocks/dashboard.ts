import type { DashboardData } from "@/types";
import { appointments, isUpcomingAppointment } from "./appointments";
import { consultants } from "./consultants";

export const getDashboardData = (): DashboardData => ({
  stats: {
    completedAppointments: appointments.filter(
      (item) => item.patientId === "user-1" && item.status === "تکمیل شده",
    ).length,
    upcomingAppointments: appointments.filter(
      (item) => item.patientId === "user-1" && isUpcomingAppointment(item),
    ).length,
    cancelledAppointments: appointments.filter(
      (item) => item.patientId === "user-1" && item.status === "لغو شده",
    ).length,
    totalScore: 4.8,
  },
  upcomingAppointments: appointments.filter(
    (item) => item.patientId === "user-1" && isUpcomingAppointment(item),
  ),
  recommendedConsultants: consultants.slice(0, 3),
});

export const dashboardData = getDashboardData();
