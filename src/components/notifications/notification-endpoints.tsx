"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import DropdownButton from "../ui/dropdown-button";

interface NotificationEndpointsProps {
  data: {
    id: string;
    name: string;
    status: string;
    latestCompleted: string;
  }[];
}

const NotificationEndpoints = ({ data }: NotificationEndpointsProps) => {
  return (
    <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data?.map((endpoint) => (
        <div
          key={endpoint.id}
          className="flex w-full items-center justify-between p-4 bg-white rounded-md shadow-md border"
        >
          {endpoint.name}
          <DropdownButton
            items={[
              {
                icon: Trash,
                onClick: async () => {
                  await axios.delete(
                    `http://ir.snnf.me:8086/api/v2/notificationEndpoints/${endpoint.id}`,
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

export default NotificationEndpoints;
