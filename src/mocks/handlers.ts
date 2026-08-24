import { http, HttpResponse } from "msw";
import type {
  Appointment,
  AppointmentFilter,
  ConsultantAvailability,
} from "@/types";
import { APPOINTMENT_TIMES } from "@/types/appointmentTimes";
import { consultants } from "./consultants";
import { getDashboardData } from "./dashboard";
import { appointments, isUpcomingAppointment } from "./appointments";
import { consultantServiceMap, services } from "./services";
import {
  consultantAvailability,
  setConsultantAvailability,
} from "./availability";

const hasActiveAppointment = (
  consultantId: string,
  date: string,
  time: string,
  excludedAppointmentId?: string,
) =>
  appointments.some(
    (appointment) =>
      appointment.id !== excludedAppointmentId &&
      appointment.consultantId === consultantId &&
      appointment.date === date &&
      appointment.startTime === time &&
      appointment.status !== "لغو شده",
  );

const getManagedAvailabilitySlots = (
  date: string,
  excludedAppointmentId?: string,
) => {
  const blockedSlots =
    consultantAvailability.blockedDates.find((item) => item.date === date)
      ?.blockedSlots ?? [];

  return APPOINTMENT_TIMES.map((time) => ({
    time,
    status: blockedSlots.includes(time)
      ? ("blocked" as const)
      : hasActiveAppointment(
            consultantAvailability.consultantId,
            date,
            time,
            excludedAppointmentId,
          )
        ? ("booked" as const)
        : ("available" as const),
  }));
};

const getDemoSlots = (date: string) => {
  const seed = [...date].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return APPOINTMENT_TIMES.map((time, index) => ({
    time,
    status:
      (index + seed) % 7 === 0
        ? ("blocked" as const)
        : (index + seed) % 4 === 0
          ? ("booked" as const)
          : ("available" as const),
  }));
};

const getConsultantSlots = (
  consultantId: string,
  date: string,
  excludedAppointmentId?: string,
) =>
  consultantId === consultantAvailability.consultantId
    ? getManagedAvailabilitySlots(date, excludedAppointmentId)
    : getDemoSlots(date);

export const handlers = [
  http.get("/api/dashboard", () => HttpResponse.json(getDashboardData())),

  http.get("/api/services", () => HttpResponse.json(services)),

  http.get("/api/consultants", ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get("search") ?? "").trim().toLowerCase();
    const serviceId = url.searchParams.get("serviceId") ?? "";

    const result = consultants.filter((consultant) => {
      const matchesSearch =
        !search ||
        consultant.name.toLowerCase().includes(search) ||
        consultant.specialty.toLowerCase().includes(search);
      const matchesService =
        !serviceId ||
        (consultantServiceMap[consultant.id] ?? []).includes(serviceId);
      return matchesSearch && matchesService;
    });

    return HttpResponse.json(result);
  }),

  http.get("/api/appointments", ({ request }) => {
    const url = new URL(request.url);
    const filter = (url.searchParams.get("filter") ??
      "all") as AppointmentFilter;
    const userAppointments = appointments.filter(
      (item) => item.patientId === "user-1",
    );

    if (filter === "upcoming") {
      return HttpResponse.json(userAppointments.filter(isUpcomingAppointment));
    }

    if (filter === "past") {
      return HttpResponse.json(
        userAppointments.filter((item) => !isUpcomingAppointment(item)),
      );
    }

    return HttpResponse.json(userAppointments);
  }),

  http.patch("/api/appointments/:id", async ({ params, request }) => {
    const appointment = appointments.find(
      (item) => item.id === String(params.id),
    );

    if (!appointment) {
      return HttpResponse.json(
        { message: "Appointment not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as Partial<
      Pick<Appointment, "status" | "date" | "startTime">
    >;

    const nextDate = body.date ?? appointment.date;
    const nextTime = body.startTime ?? appointment.startTime;
    const isRescheduling =
      body.date !== undefined || body.startTime !== undefined;

    if (isRescheduling) {
      const requestedSlot = getConsultantSlots(
        appointment.consultantId,
        nextDate,
        appointment.id,
      ).find((slot) => slot.time === nextTime);

      if (requestedSlot?.status !== "available") {
        return HttpResponse.json(
          { message: "زمان انتخاب‌شده قابل رزرو نیست" },
          { status: 409 },
        );
      }
    }

    if (body.status) appointment.status = body.status;
    if (body.date) appointment.date = body.date;
    if (body.startTime) appointment.startTime = body.startTime;

    return HttpResponse.json(appointment);
  }),

  http.get("/api/consultants/:id/slots", ({ params, request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get("date") ?? "";
    const consultantId = String(params.id);
    if (!consultants.some((item) => item.id === consultantId)) {
      return HttpResponse.json(
        { message: "Consultant not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(getConsultantSlots(consultantId, date));
  }),

  http.post("/api/bookings", async ({ request }) => {
    const body = (await request.json()) as {
      serviceId: string;
      consultantId: string;
      date: string;
      time: string;
    };

    const service = services.find((item) => item.id === body.serviceId);
    const consultant = consultants.find(
      (item) => item.id === body.consultantId,
    );

    if (!service || !consultant) {
      return HttpResponse.json(
        { message: "اطلاعات رزرو نامعتبر است" },
        { status: 400 },
      );
    }

    const availableSlots = getConsultantSlots(consultant.id, body.date);
    const requestedSlot = availableSlots.find(
      (slot) => slot.time === body.time,
    );

    if (requestedSlot?.status !== "available") {
      return HttpResponse.json(
        { message: "زمان انتخاب‌شده دیگر قابل رزرو نیست" },
        { status: 409 },
      );
    }

    const trackingCode = `AR-${Math.floor(100000 + Math.random() * 900000)}`;
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      consultantId: consultant.id,
      patientId: "user-1",
      serviceId: service.id,
      service: service.name,
      date: body.date,
      startTime: body.time,
      duration: service.duration,
      price: service.price,
      status: "در انتظار",
      trackingCode,
    };

    appointments.unshift(appointment);

    return HttpResponse.json({ appointment, trackingCode }, { status: 201 });
  }),

  http.get("/api/consultant/appointments", ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get("date") ?? "";
    const consultantAppointments = appointments.filter(
      (item) => item.consultantId === "2",
    );

    return HttpResponse.json(
      date
        ? consultantAppointments.filter((item) => item.date === date)
        : consultantAppointments,
    );
  }),

  http.get("/api/consultant/availability", () => {
    return HttpResponse.json(consultantAvailability);
  }),

  http.put("/api/consultant/availability", async ({ request }) => {
    const body = (await request.json()) as ConsultantAvailability;
    setConsultantAvailability(body);
    return HttpResponse.json(body);
  }),
];
