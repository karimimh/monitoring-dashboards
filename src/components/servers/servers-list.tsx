"use client";

import { Skeleton } from "../ui/skeleton";

interface ServersListProps {
  data: any;
  isLoading: boolean;
}

const ServersList = ({ data, isLoading }: ServersListProps) => {
  return (
    <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {isLoading ? (
        <Skeleton className="w-96 h-64" />
      ) : (
        data?.map((server) => (
          <div
            key={server.id}
            className="flex w-full items-center justify-between p-4 bg-white rounded-md shadow-md border"
            dir="rtl"
          >
            <div className="flex flex-col gap-2">
              <div className="font-bold">{server.name}</div>
              <div className="text-gray-500 text-sm">
                {server.type === "influxdb_v2_listener"
                  ? "PUSH"
                  : server.type === "prometheus"
                  ? "PULL"
                  : "SNMP"}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ServersList;
