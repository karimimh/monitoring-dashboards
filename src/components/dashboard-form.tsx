"use client";

import { Dashboard } from "@/types/dashboard";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface DashboardFormProps {
  onSubmit: (db: Dashboard) => void;
}

const DashboardForm = ({ onSubmit }: DashboardFormProps) => {
  const [dashboardName, setDashboardName] = useState<string>("");

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="font-bold">نام داشبورد</div>
        <Input
          value={dashboardName}
          onChange={(e) => setDashboardName(e.target.value)}
        />

        <Button
          className="w-36 mt-2"
          disabled={!dashboardName}
          onClick={() => {
            onSubmit({
              name: dashboardName,
              id: Math.floor(Math.random() * 1000),
              panels: [],
              variables: [],
            });
          }}
        >
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default DashboardForm;
