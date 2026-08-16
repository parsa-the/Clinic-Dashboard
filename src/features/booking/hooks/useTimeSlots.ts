import { useQuery } from "@tanstack/react-query";
import { getTimeSlots } from "../api/booking.api";
import { queryKeys } from "@/lib/queryKeys";

export const useTimeSlots = (consultantId: string, date: string) =>
  useQuery({
    queryKey: queryKeys.slots(consultantId, date),
    queryFn: () => getTimeSlots(consultantId, date),
    enabled: Boolean(consultantId && date),
  });
