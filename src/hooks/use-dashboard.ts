import {
  createDashboard,
  getAllDashboards,
  getDashboard,
} from "@/services/dashboard-services";
import { Dashboard } from "@/types/dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDashboard = (id?: string) => {
  return useQuery({
    queryKey: ["dashboard", id],
    queryFn: () => getDashboard(id ?? ""),
    enabled: !!id,
  });
};

export const useAllDashboards = () => {
  return useQuery({ queryKey: ["dashboards"], queryFn: getAllDashboards });
};

export const useCreateDashboard = () => {
  return useMutation({
    mutationKey: ["create-dashboard"],
    mutationFn: (dashboard: Dashboard) =>
      createDashboard(dashboard.name, dashboard.panels),
  });
};
