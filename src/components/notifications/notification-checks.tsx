"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import DropdownButton from "../ui/dropdown-button";

interface NotificationChecksProps {
  data: {
    id: string;
    name: string;
    status: string;
    latestCompleted: string;
  }[];
}

const NotificationChecks = ({ data }: NotificationChecksProps) => {
  return (
    <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data?.map((check) => (
        <div
          key={check.id}
          className="flex w-full items-center justify-between p-4 bg-white rounded-md shadow-md border"
        >
          <div className="flex flex-col gap-2">
            <div className="font-bold">{check.name}</div>
            <div className="">
              {check.status === "active" ? "فعال" : check.status}
            </div>
            <div className="text-gray-400 text-sm">{check.latestCompleted}</div>
          </div>
          <DropdownButton
            items={[
              {
                icon: Trash,
                onClick: async () => {
                  await axios.delete(
                    `http://ir.snnf.me:8086/api/v2/checks/${check.id}`,
                    {
                      headers: {
                        Accept: "application/json",
                        Authorization: "Token testtest",
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                    }
                  );
                },
                title: "حذف",
                className: "text-red-600",
              },
            ]}
          />
        </div>
      )) ?? "در حال بارگیری..."}
    </div>
  );
};

export default NotificationChecks;
