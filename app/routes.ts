import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/masjid-rsai.tsx"),
  route("carousel/:id", "api/image-carousel.tsx"),
  route("welcome", "routes/welcome.tsx"),
  layout("layouts/layout.tsx", [
    route("posts", "routes/posts.tsx"),
    route("post/:slug", "routes/post.tsx"),
    route("infaq", "routes/infaq.tsx"),
    route("jadwal-sholat", "routes/jadwal-sholat.tsx"),
    route("posts/new", "routes/posts.new.tsx"),
  ]),
  route("user/:id", "pages/user-profile.tsx", [
    route("avatar", "api/upload-avatar.tsx"),
  ]),
] satisfies RouteConfig;
