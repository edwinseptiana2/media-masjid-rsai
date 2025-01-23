// import { getPosts, getTags } from "~/models/post.server";
import type { Route } from "./+types/posts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Link } from "react-router";

export async function loader(params: URLSearchParams) {
  return {
    params,
  };
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const { params } = loaderData;
  return (
    <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg h-svh">
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={"/"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Posts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
