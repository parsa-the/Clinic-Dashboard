import type { DashboardData } from "@/types";

export const dashboardData: DashboardData = {
  stats: {
    completedAppointments: 7,
    upcomingAppointments: 2,
    cancelledAppointments: 1,
    totalScore: 4.8,
  },

  upcomingAppointments: [
    {
      id: "1",
      consultantId: "1",
      patientId: "user-1",
      service: "مشاوره فردی",
      date: "سه شنبه",
      startTime: "09:00",
      status: "تایید شده",
    },
    {
      id: "2",
      consultantId: "2",
      patientId: "user-1",
      service: "روانشناسی بالینی",
      date: "چهارشنبه",
      startTime: "10:00",
      status: "در انتظار",
    },
    {
      id: "3",
      consultantId: "3",
      patientId: "user-1",
      service: "روانپزشکی",
      date: "شنبه",
      startTime: "11:00",
      status: "تایید شده",
    },
    {
      id: "4",
      consultantId: "4",
      patientId: "user-1",
      service: "روانپزشکی",
      date: "یکشنبه",
      startTime: "11:00",
      status: "تایید شده",
    },
  ],
  recommendedConsultants: [], // add recommended consultants to satisfy DashboardData shape
};
