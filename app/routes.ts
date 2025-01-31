import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/masjid-rsai.tsx"),
  route("carousel/:id", "api/image-carousel.tsx"),
  layout("layouts/layout.tsx", [
    route("posts", "routes/posts.tsx"),
    route("posts/:slug", "routes/post.tsx"),
    route("posts/:slug/edit", "routes/posts.edit.tsx"),
    route("infaq", "routes/infaq.tsx"),
    route("jadwal-sholat", "routes/jadwal-sholat.tsx"),
    route("posts/new", "routes/posts.new.tsx"),
  ]),
  route("gallery/:galeryId", "pages/upload-gallery.tsx"),
  route("gallery-show/:galeryId", "api/gallery-show.tsx"),
] satisfies RouteConfig;
