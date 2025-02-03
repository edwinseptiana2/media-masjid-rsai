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
import {
  getCategories,
  getPosts,
  getPostsByCategory,
} from "~/models/post.server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q || q === "ALL") {
    const posts = await getPosts();
  }
  const posts = await getPostsByCategory(q || "");
  const categories = await getCategories();

  return { posts, categories, q };
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const { posts, categories, q } = loaderData;
  const str = q?.toLocaleLowerCase() || "";
  let result = str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex flex-wrap  mx-auto max-w-4xl bg-white p-6 rounded-lg pb-[50px]">
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
              <BreadcrumbLink>
                <Link to={"/posts"}>Posts</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {!result ? <span>Semua Kategori</span> : <span>{result}</span>}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-3xl font-semibold mt-9">
          Agenda dan Artikel Lainnya
        </h2>
        <div>
          <div className="flex flex-wrap  gap-4 items-center justify-center mt-7 mb-7">
            <div
              className="flex flex-grow-0 border-2 border-gray-200 rounded-full shadow-lg "
              key={"ALL"}
            >
              <Link to={`/posts?q=ALL`}>
                <div className="p-2 px-8">
                  <h3 className="text-base font-semibold">ALL</h3>
                </div>
              </Link>
            </div>
            {categories.map((category) => (
              <div
                className="flex flex-grow-0 border-2 border-gray-200 rounded-full shadow-lg "
                key={category.name}
              >
                <Link
                  to={`/posts?q=${category.name.toUpperCase()}`}
                  key={category.name}
                >
                  <div className="p-2 px-8">
                    <h3 className="text-base font-semibold">
                      {category.name.toUpperCase()}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 h-92">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                className="w-full border-2 border-gray-200 rounded-md shadow-lg"
                key={post.id}
              >
                <Link to={`/posts/${post.slug}`} key={post.id}>
                  <img
                    src={`/carousel/${post.image}`}
                    alt=""
                    className="object-cover object-center w-full h-48 rounded-t-md"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-semibold mt-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 text-wrap line-clamp-3">
                      {post.subtitle}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-md text-muted-foreground">
              Mohon maaf, data agenda dan artikel tidak tersedia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
