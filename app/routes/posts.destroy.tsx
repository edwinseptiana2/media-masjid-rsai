import { redirect } from "react-router";
import type { Route } from "./+types/posts.destroy";
import { deletePost } from "~/models/post.server";

export async function action({ params }: Route.ActionArgs) {
  await deletePost(params.slug);
  return redirect("/posts");
}
