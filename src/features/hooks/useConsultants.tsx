import { useQuery } from "@tanstack/react-query";
import { getConsultants } from "../../api/consultants";

export const useConsultants = () => {
  return useQuery({
    queryKey: ["consultants"],
    queryFn: getConsultants,
  });
};