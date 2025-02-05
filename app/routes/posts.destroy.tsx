import { redirect } from "react-router";
import type { Route } from "./+types/posts.destroy";
import { deletePost } from "~/models/post.server";
import { getSession } from "~/utils/session";

export async function action({ params, request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }
  await deletePost(params.slug);
  return redirect("/posts");
}
