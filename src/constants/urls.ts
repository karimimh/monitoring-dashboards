// Base URL of the monitoring backend API. Override it with
// NEXT_PUBLIC_API_BASE_URL (see .env.example).
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081";

// InfluxDB v2 HTTP API. The notification lists call it directly to delete
// checks, endpoints and rules. Override it with NEXT_PUBLIC_INFLUXDB_URL.
export const INFLUXDB_URL =
  process.env.NEXT_PUBLIC_INFLUXDB_URL || "http://localhost:8086";

export const REGISTER_URL = `${BASE_URL}/register`;
export const LOGIN_URL = `${BASE_URL}/login`;

export const DATABASE_QUERY_URL = `${BASE_URL}/api/v1/query`;
export const DASHBOARD_URL = `${BASE_URL}/api/v1/dashboards`;

export const NOTIFICATION_ENDPOINTS_URL = `${BASE_URL}/api/v1/notificationEndpoints`;
export const NOTIFICATION_ENDPOINTS_URL_2 = `${BASE_URL}/api/v1/addnotification`;
export const NOTIFICATION_RULES_URL = `${BASE_URL}/api/v1/notificationRules`;
export const NOTIFICATION_CHECKS_URL = `${BASE_URL}/api/v1/checks`;

export const SERVER_CREATE_URL = `${BASE_URL}/api/v1/input`;
export const SERVER_LIST_URL = `${BASE_URL}/api/v1/inputs`;
