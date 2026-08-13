import type { Consultant } from "@/types";

export const getConsultants = async (): Promise<Consultant[]> => {
  const response = await fetch("/api/consultants");

  if (!response.ok) {
    throw new Error("Failed to fetch consultants");
  }

  return response.json();
};