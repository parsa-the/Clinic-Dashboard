import { http, HttpResponse } from "msw";
import { dashboardData } from "./dashboard";
import type { Appointment } from "@/types";
import { consultants } from "./consultants";
export const handlers = [
  http.get("/api/dashboard", () => {
    const upcomingAppointments = dashboardData.upcomingAppointments.filter(
      (appointment) => appointment.status !== "لغو شده",
    );

    console.log(
      "GET DASHBOARD:",
      upcomingAppointments.map((appointment) => ({
        id: appointment.id,
        status: appointment.status,
      })),
    );

    return HttpResponse.json({
      ...dashboardData,
      upcomingAppointments,
    });
  }),
  http.patch("/api/appointments/:id", async ({ params, request }) => {
    const id = String(params.id);

    const body = (await request.json()) as {
      status: Appointment["status"];
    };

    console.log("PATCH ID:", id);
    console.log("PATCH BODY:", body);

    const appointment = dashboardData.upcomingAppointments.find(
      (item) => item.id === id,
    );

    console.log("FOUND APPOINTMENT:", appointment);

    if (!appointment) {
      return HttpResponse.json(
        { message: "Appointment not found" },
        { status: 404 },
      );
    }

    appointment.status = body.status;

    console.log("UPDATED APPOINTMENT:", appointment);

    return HttpResponse.json(appointment);
  }),
  http.get("/api/consultants", () => {
    return HttpResponse.json(consultants);
  }),
];
