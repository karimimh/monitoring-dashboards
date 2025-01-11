import { SERVERS_URL } from "@/constants/urls";
import { httpClient } from "./http-client";
import { Server } from "@/types/server";

export const getAllServers = async () => {
  const URL = `${SERVERS_URL}`;
  const response = await httpClient.get(URL);
  return response.data;
};

export const createServer = async (server: Server) => {
  const URL = `${SERVERS_URL}`;

  const payload = {
    type: server.type,
    data: server,
  };

  const response = await httpClient.post(URL, payload);
  return response.data;
};
