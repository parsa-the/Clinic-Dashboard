import { api } from "@/lib/api";
import type { Consultant } from "@/types";

export const getConsultants = (search = "", serviceId = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (serviceId) params.set("serviceId", serviceId);

  const query = params.toString();
  return api<Consultant[]>(`/api/consultants${query ? `?${query}` : ""}`);
};
