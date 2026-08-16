import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getServices } from "../api/services.api";

export const useServices = () =>
  useQuery({
    queryKey: queryKeys.services,
    queryFn: getServices,
  });
