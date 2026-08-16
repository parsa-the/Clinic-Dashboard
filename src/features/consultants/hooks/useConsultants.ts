import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getConsultants } from "../api/consultants.api";

export const useConsultants = (search = "", serviceId = "") =>
  useQuery({
    queryKey: queryKeys.consultants(search, serviceId),
    queryFn: () => getConsultants(search, serviceId),
  });
