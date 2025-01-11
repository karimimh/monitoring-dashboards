export type Server = {
  name: string;
  ip: string;
  port: string;
  config: string;
  type: "SNMP" | "PULL" | "PUSH";
};
