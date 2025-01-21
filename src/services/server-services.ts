import { SERVER_CREATE_URL, SERVER_LIST_URL } from "@/constants/urls";
import { Server } from "@/types/server";
import { httpClient } from "./http-client";

export const getAllServers = async () => {
  const URL = `${SERVER_LIST_URL}`;
  const response = await httpClient.get(URL);
  return response.data;
};

export const createServer = async (server: Server) => {
  const { config, ip, port, type } = server;
  const serverTypeEndpointMap = {
    SNMP: `${SERVER_CREATE_URL}/snmp`,
    PULL: `${SERVER_CREATE_URL}/prometheus`,
    PUSH: `${SERVER_CREATE_URL}/influxdb_v2_listener`,
  };
  const URL = serverTypeEndpointMap[type];

  const serverTypePayloadMap = {
    SNMP: {
      data: {
        "inputs.snmp": {
          agents: [`"udp://${ip}:${port}"`],
          ...JSON.parse(config),
        },
      },
    },
    PULL: {
      data: {
        "inputs.prometheus": {
          urls: [`"${ip}:${port}"`],
        },
      },
    },
    PUSH: {
      data: {},
    },
  };

  const payload = serverTypePayloadMap[type];

  try {
    void httpClient.post(URL, payload);
    return "";
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const deleteServer = async (id: string) => {
  const URL = `${SERVER_CREATE_URL}/${id}`;

  const response = await httpClient.delete(URL);
  return response.data;
};
