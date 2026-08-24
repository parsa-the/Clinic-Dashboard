import type { Appointment } from "@/types";
import { addDays } from "date-fns";
import { getIranToday, toClinicDate } from "@/utils/date";

const iranToday = getIranToday();
const appointmentDate = (dayOffset: number) =>
  toClinicDate(addDays(iranToday, dayOffset));

export const appointments: Appointment[] = [
  {
    id: "1",
    consultantId: "1",
    patientId: "user-1",
    serviceId: "service-1",
    service: "مشاوره روانشناسی فردی",
    date: appointmentDate(1),
    startTime: "09:00",
    duration: 45,
    price: 400000,
    status: "تایید شده",
    trackingCode: "AR-1001",
  },
  {
    id: "2",
    consultantId: "2",
    patientId: "user-1",
    serviceId: "service-2",
    service: "مشاوره کودک و نوجوان",
    date: appointmentDate(2),
    startTime: "10:00",
    duration: 60,
    price: 450000,
    status: "در انتظار",
    trackingCode: "AR-1002",
  },
  {
    id: "3",
    consultantId: "3",
    patientId: "user-1",
    serviceId: "service-1",
    service: "مشاوره روانشناسی فردی",
    date: appointmentDate(-6),
    startTime: "11:00",
    duration: 45,
    price: 400000,
    status: "تکمیل شده",
    trackingCode: "AR-0991",
  },
  {
    id: "4",
    consultantId: "4",
    patientId: "user-1",
    serviceId: "service-3",
    service: "مشاوره خانواده",
    date: appointmentDate(-5),
    startTime: "14:30",
    duration: 60,
    price: 500000,
    status: "لغو شده",
    trackingCode: "AR-0995",
  },
  {
    id: "5",
    consultantId: "2",
    patientId: "user-2",
    serviceId: "service-1",
    service: "مشاوره روانشناسی فردی",
    date: appointmentDate(0),
    startTime: "12:00",
    duration: 45,
    price: 400000,
    status: "تایید شده",
    trackingCode: "AR-1005",
  },
];

export const isUpcomingAppointment = (appointment: Appointment) =>
  appointment.status === "تایید شده" || appointment.status === "در انتظار";
