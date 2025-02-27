import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/masjid-rsai.tsx"),
  layout("layouts/layout.tsx", [
    route("posts", "routes/posts.tsx"),
    route("posts/new", "routes/posts.new.tsx"),
    route("posts/:slug", "routes/post.tsx"),
    route("posts/:slug/edit", "routes/posts.edit.tsx"),
    route("posts/:slug/destroy", "routes/posts.destroy.tsx"),
    route("jadwal-sholat", "routes/jadwal-sholat.tsx"),
    route("infaq", "routes/infaq.tsx"),
    route("test", "routes/test-coding.tsx"),
  ]),
  route("login", "routes/login.tsx"),
  route("carousel/:id", "api/image-carousel.tsx"),
  route("gallery/:galeryId", "pages/upload-gallery.tsx"),
  route("gallery-show/:galeryId", "api/gallery-show.tsx"),
] satisfies RouteConfig;
