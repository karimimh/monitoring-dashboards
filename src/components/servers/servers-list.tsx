"use client";

import DropdownButton from "@/components/ui/dropdown-button";
// list server (name and ip), delete, edit
// add server ( name, ip , port , config <text box >, dropdown for type < snmp, pull, push, wmi > )

import { Trash } from "lucide-react";

interface ServersListProps {
  data: any;
}

const ServersList = ({ data }: ServersListProps) => {
  return (
    <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data?.map((server) => (
        <div
          key={server.id}
          className="flex w-full items-center justify-between p-4 bg-white rounded-md shadow-md border"
          dir="rtl"
        >
          <div className="flex flex-col gap-2">
            <div className="font-bold">{server.name}</div>
            <div className="">
              {server.status === "active" ? "فعال" : server.status}
            </div>
            <div className="text-gray-400 text-sm">
              {server.latestCompleted}
            </div>
          </div>
          <DropdownButton
            items={[
              {
                icon: Trash,
                onClick: async () => {},
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

export default ServersList;
