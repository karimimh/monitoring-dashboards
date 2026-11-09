# monitoring-dashboards

A Persian (right-to-left) web front end for infrastructure monitoring. It covers three areas:

- Grafana-inspired dashboards built on InfluxQL time-series queries
- data-source management backed by Telegraf input plugins
- InfluxDB threshold alerts with Telegram or Bale notifications

It is built with Next.js 15, React 19, TypeScript, TanStack Query, Recharts and shadcn/ui.

This repository holds only the UI. It talks to a separate backend API, which isn't included here, and in a few places directly to the InfluxDB v2 HTTP API (see [Architecture](#architecture)).

## Features

### Authentication

- The app has register (username, email, password) and login screens.
- The token returned by the backend is stored in `localStorage` and sent as the `Authorization` header on API requests.
- Pages under the `(home)` route group redirect to `/login` when there is no token, and `/logout` clears the session.

### Dashboards

- You can list, create, open and delete dashboards, and save a dashboard's panels and variables back to the backend.
- **Panels** show InfluxQL query results as Recharts area charts. Each panel can hold several queries and has a min / max / mean summary table. Panels can be added, edited and removed.
- **Time range.** A Persian (Jalali) date-time range picker sets the time window. Changing it rewrites the `time >= …ms and time <= …ms` condition in each panel query. If a query has no time condition yet, one is added, together with `GROUP BY time(1m) fill(null)` when the query has no `GROUP BY`.
- **Variables** are defined by InfluxQL queries, for example `SHOW TAG VALUES FROM system WITH KEY = host`. Their values are substituted into panel queries wherever a `$name$` placeholder appears.
- **Structured query builder** (in progress). It offers `SELECT <field> FROM <measurement> WHERE <tag> = <value>` dropdowns, filled from `SHOW MEASUREMENTS`, `SHOW FIELD KEYS`, `SHOW TAG KEYS` and `SHOW TAG VALUES`.

### Servers (data sources)

- The page lists the registered inputs.
- You can add three kinds of input. The request payloads mirror the matching Telegraf input plugins:
  - **SNMP**: agent address plus extra JSON config (`inputs.snmp`)
  - **Pull**: a Prometheus scrape target (`inputs.prometheus`)
  - **Push**: an InfluxDB v2 listener (`influxdb_v2_listener`)

### Notifications

The notifications page has three tabs:

- **Alerts.** Threshold checks with a query, a schedule interval, an above/below condition and a level (`CRIT`, `WARN`, `INFO`, `ANY`).
- **Endpoints.** A Telegram or Bale channel, registered as an InfluxDB HTTP notification endpoint that calls back into the backend.
- **Rules.** Rules that fire when a check's status equals a value or changes from one value to another. Each rule is bound to an endpoint.

Each tab lists its items and can delete them.

### UI

- The interface is fully in Persian and right-to-left.
- It has a collapsible sidebar and uses shadcn/ui (Radix UI) components styled with Tailwind CSS.

## Architecture

```
Next.js App Router (client components)
  (auth)/login · register · logout          (home)/dashboards · servers · notifications
                 │                                         │
                 └──────────── hooks/  (TanStack Query: useQuery / useQueries / useMutation)
                                  │
                         services/  (axios client, zod validation of query results)
                                  │
             ┌────────────────────┴─────────────────────┐
   Backend API  (NEXT_PUBLIC_API_BASE_URL)        InfluxDB v2 API  (NEXT_PUBLIC_INFLUXDB_URL)
   /login, /register                              DELETE /api/v2/checks/:id
   /api/v1/query?db=metrics   (InfluxQL)          DELETE /api/v2/notificationEndpoints/:id
   /api/v1/dashboards                             DELETE /api/v2/notificationRules/:id
   /api/v1/input(s)           (Telegraf inputs)
   /api/v1/checks, notificationEndpoints, notificationRules, addnotification
```

- **Data flow.** Pages and components never call the network themselves. They use hooks in `src/hooks`, which wrap service functions in `src/services`, so caching, refetching and request de-duplication come from TanStack Query.
- **Validation.** InfluxQL responses (`results[].series[].values`) are checked with zod schemas (`src/schemas`) before they are turned into chart series.
- **URLs.** All backend URLs come from `src/constants/urls.ts`. InfluxDB org/token settings live in `src/constants/influxdb.ts`.

## Tech stack

- **Framework:** Next.js 15 (App Router, Turbopack dev server), React 19, TypeScript (strict)
- **Data:** TanStack Query 5, axios, qs, zod
- **UI:** Tailwind CSS 3, shadcn/ui on Radix UI primitives, lucide-react icons, Recharts 2
- **Dates:** react-multi-date-picker and react-date-object (Persian calendar and locale)
- **Tooling:** ESLint 9 (`eslint-config-next`)

## Repository layout

```
.
├── src/
│   ├── app/
│   │   ├── (auth)/          # login, register, logout
│   │   ├── (home)/          # dashboards, servers, notifications (+ shared header/sidebar layout)
│   │   ├── layout.tsx       # root layout, QueryClientProvider
│   │   └── globals.css      # Tailwind layers, theme variables, @font-face
│   ├── components/
│   │   ├── dashboards/      # dashboard picker, header (time range, save), dashboard view
│   │   ├── panels/          # panel cards, series chart, panel/variable forms, query builder
│   │   ├── servers/         # server form and list
│   │   ├── notifications/   # alert/endpoint/rule lists and forms
│   │   └── ui/              # shadcn/ui components and a Persian date-time picker
│   ├── hooks/               # TanStack Query hooks per domain
│   ├── services/            # API calls (axios)
│   ├── schemas/             # zod schemas for API responses
│   ├── constants/           # URLs, InfluxDB settings, panel defaults
│   ├── types/               # shared TypeScript types
│   └── utils/
├── public/fonts/            # Yekan Bakh web font (see "Third-party assets")
├── PLAN.md                  # design notes for variables and the structured query builder
├── .env.example
└── next.config.ts           # redirects / to /dashboards
```

## Getting started

### Requirements

- Node.js 18.18+ (20+ recommended) and npm
- A running instance of the companion backend API to sign in and load data. Without it, the app only shows the login and register screens.

### Run locally

```bash
npm ci
cp .env.example .env.local   # then edit as needed
npm run dev                  # http://localhost:3004 (Turbopack)
```

### Production build

```bash
npm run build
npm start                    # serves on http://localhost:3000 by default
npm run lint
```

## Configuration

All settings are optional environment variables, documented in [`.env.example`](.env.example):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8081` | Base URL of the backend API |
| `NEXT_PUBLIC_INFLUXDB_URL` | `http://localhost:8086` | InfluxDB v2 API, used by the notification delete actions |
| `NEXT_PUBLIC_INFLUXDB_ORG_ID` | *(empty)* | InfluxDB organization ID sent with dashboard and notification requests |
| `NEXT_PUBLIC_INFLUXDB_TOKEN` | *(empty)* | Token for the direct InfluxDB calls, sent as `Token <value>` |

`NEXT_PUBLIC_*` values are inlined into the client bundle when you run `npm run build`. Changing them requires a rebuild, and anyone who can load the UI can read them, so use only a low-privilege development token. Panel and variable queries always run against the `metrics` database.

## Third-party assets

`public/fonts/YekanBakhFaNum-Regular.woff` is the Yekan Bakh FaNum typeface © Fontiran ([fontiran.com](https://fontiran.com)). It is a commercial font that needs a license from Fontiran, and it is not covered by any license of this repository. If you reuse the project, use your own licensed copy or swap in another font in `src/app/globals.css` and `tailwind.config.ts`.

## Project status

This is a work-in-progress prototype, last updated in April 2025. The dashboard, server, notification and authentication flows are implemented against the backend API. Known gaps:

- **Query builder.** The structured query builder replaced the raw query editor in the panel form, but it doesn't write the built query back into the panel yet.
- **Variable values.** Variables substitute their first value. Choosing a different value from the variable picker isn't applied to queries correctly yet.
- **Servers.** They can be added and listed, but not edited or removed from the UI.
- **Telegram/Bale endpoints.** The endpoint form doesn't collect a chat ID yet; a placeholder value is sent.
- **Direct InfluxDB calls.** Notification deletes go straight from the browser to InfluxDB. They should move behind the backend so no token reaches the client.
- **Tests.** There are no automated tests.
