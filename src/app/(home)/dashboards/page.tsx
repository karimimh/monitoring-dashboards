"use client";

import ChooseDashboard from "@/components/dashboards/choose-dashboard";
import Dashboard from "@/components/dashboards/dashboard";
import { useAllDashboards } from "@/hooks/use-dashboard";
import { Dashboard as DashboardObject } from "@/types/dashboard";
import { useState } from "react";

export default function Home() {
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardObject>();
  const { data: allDashboards, refetch } = useAllDashboards();

  return selectedDashboard ? (
    <Dashboard selectedDashboard={selectedDashboard} />
  ) : (
    <ChooseDashboard
      allDashboards={allDashboards}
      onDashboardSelect={setSelectedDashboard}
      onDashboardDelete={() => refetch()}
    />
  );
}
