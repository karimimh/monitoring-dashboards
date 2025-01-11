"use client";

import { useCreateDashboard } from "@/hooks/use-dashboard";
import { Dashboard } from "@/types/dashboard";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import DashboardForm from "./dashboard-form";
import DropdownButton from "../ui/dropdown-button";
import { deleteDashboard } from "@/services/dashboard-services";
import { Skeleton } from "../ui/skeleton";

interface ChooseDashboardProps {
  onDashboardSelect: (db: Dashboard) => void;
  allDashboards: any;
  onDashboardDelete: () => void;
}

const ChooseDashboard = ({
  allDashboards,
  onDashboardSelect,
  onDashboardDelete,
}: ChooseDashboardProps) => {
  const { mutate: createDashboard } = useCreateDashboard();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-full h-full flex items-center flex-wrap gap-4 p-4"
      dir="rtl"
    >
      {allDashboards ? (
        <>
          {allDashboards.map((db) => (
            <div
              key={db.id}
              className="relative flex w-80 h-64 bg-white rounded-md items-center gap-2 justify-center p-4 border cursor-pointer text-lg hover:text-blue-600"
              onClick={() => {
                onDashboardSelect(db);
              }}
            >
              {db.name}
              <DropdownButton
                className="absolute top-4 left-4"
                items={[
                  {
                    title: "حذف",
                    onClick: (e) => {
                      e.stopPropagation();
                      deleteDashboard(db.id);
                      onDashboardDelete();
                    },
                    icon: TrashIcon,
                    className: "text-red-600",
                  },
                ]}
                side="bottom"
              />
            </div>
          ))}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div
                className="flex w-80 h-64 text-blue-600 rounded-md items-center bg-white gap-2 justify-center p-4 border cursor-pointer text-lg hover:text-blue-800"
                onClick={() => setIsOpen(true)}
              >
                <PlusIcon className="size-6" />
                داشبورد جدید
              </div>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
              <DialogTitle className="w-full text-center">
                افزودن داشبورد
              </DialogTitle>
              <DashboardForm
                onSubmit={(db) => {
                  setIsOpen(false);
                  createDashboard(db);
                  onDashboardSelect(db);
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Skeleton className="w-80 h-64" />
      )}
    </div>
  );
};

export default ChooseDashboard;
