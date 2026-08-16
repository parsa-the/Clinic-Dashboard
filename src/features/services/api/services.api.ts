import { api } from "@/lib/api";
import type { ClinicService } from "@/types";

export const getServices = () => api<ClinicService[]>("/api/services");
