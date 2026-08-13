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
      doctorName: "مهدی صادقی",
      service: "مشاوره فردی",
      date: "سه شنبه",
      ProfilePicture:"2.jpg",
      startTime: "09:00",
      status: "تایید شده",
    },
    {
      id: "2",
      doctorName: "نرگس محمدی ",
      service: "روانشناس بالینی ",
      date:"چهارشنبه" ,
      ProfilePicture:"3.jpg",
      startTime: "10:00",
      status: "در انتظار",
    },
    {
      id: "3",
      doctorName: "مریم احمدی",
      service: "روانپزشک",
      date: "شنبه",
      startTime: "11:00",
      ProfilePicture:"4.jpeg",
      status: "تایید شده",
    },
        {
      id: "4",
      doctorName: "سینا جلالی",
      service: "روانپزشک",
      ProfilePicture:"5.jpg",
      date: "یکشنبه",
      startTime: "11:00",
      status: "تایید شده",
    },
  ],
};
