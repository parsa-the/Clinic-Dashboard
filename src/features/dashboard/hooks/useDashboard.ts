import {useQuery} from "@tanstack/react-query"
import { getDashboard } from "../api/getDashboard"

export const dashboardQueryKey = ["dashboard"] as const;

export const useDashboard =()=>{
    return useQuery({
        queryKey: dashboardQueryKey,
        queryFn:getDashboard
    })
}
