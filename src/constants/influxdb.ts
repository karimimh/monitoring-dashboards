// InfluxDB settings, read from NEXT_PUBLIC_* environment variables
// (see .env.example). Next.js inlines NEXT_PUBLIC_* values into the browser
// bundle at build time, so anything set here is visible to every user of the
// UI. Use a low-privilege development token only, never a production one.

// Organization ID sent with dashboard and notification requests.
export const INFLUXDB_ORG_ID = process.env.NEXT_PUBLIC_INFLUXDB_ORG_ID || "";

// Authorization header for the direct InfluxDB v2 API calls (see INFLUXDB_URL).
export const INFLUXDB_AUTH_HEADER = `Token ${
  process.env.NEXT_PUBLIC_INFLUXDB_TOKEN || ""
}`;
