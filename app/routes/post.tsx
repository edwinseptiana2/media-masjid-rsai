import { getAnotherPost, getPost } from "~/models/post.server";
import type { Route } from "./+types/post";
import { marked } from "marked";
import invariant from "tiny-invariant";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  invariant(params.slug, "Expected a slug");
  const post = await getPost(params.slug);
  invariant(post, "Post not found");
  const content = marked(post.content);

  const anotherPost = await getAnotherPost(post.categories[0].categoryName);
  // console.log(anotherPost.length);

  return { post, content, anotherPost };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post, content, anotherPost } = loaderData;
  // console.log(anotherPost.length);
  // console.log(post);
  return (
    <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg h-full">
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
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center justify-center mt-5">
        <img
          src={`/carousel/${post.image}`}
          alt=""
          className=" object-cover object-center w-full h-64 rounded-md"
        />
      </div>
      <div
        className="flex flex-col mt-8 prose prose-slate mx-auto lg:prose-lg max-[767px]:prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex mt-8">
        <p className="text-md text-muted-foreground">Penulis: {post.author}</p>
      </div>
      <hr className="mt-8" />
      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-lg font-semibold mt-6">Artikel Lainnya</h2>
        <div className="grid grid-cols-2 gap-6 h-92">
          {anotherPost.length > 1 ? (
            anotherPost.map(
              (category) =>
                category.id !== post.id && (
                  <div
                    className="w-full border-2 border-gray-200 rounded-md shadow-lg"
                    key={category.id}
                  >
                    <Link to={`/posts/${category.slug}`} key={category.id}>
                      <img
                        src={`/carousel/${category.image}`}
                        alt=""
                        className="object-cover object-center w-full h-48 rounded-t-md"
                      />
                      <div className="p-4">
                        <h3 className="text-base font-semibold mt-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 text-wrap line-clamp-3">
                          {category.subtitle}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
            )
          ) : (
            <p className="text-md text-muted-foreground">
              Mohon maaf, artikel lainnya tidak tersedia.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
