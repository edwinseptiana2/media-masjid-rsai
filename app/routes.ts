import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("masjid-rsai", "routes/masjid-rsai.tsx"),
] satisfies RouteConfig;
