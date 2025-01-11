import { createServer, getAllServers } from "@/services/server-services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllServers = () => {
  return useQuery({ queryKey: ["servers"], queryFn: getAllServers });
};

export const useCreateServer = () => {
  return useMutation({
    mutationKey: ["create-server"],
    mutationFn: createServer,
  });
};
