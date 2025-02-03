import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  data,
  Form,
  Link,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router";
import { parseFormData, type FileUpload } from "@mjackson/form-data-parser";
import { fileStorage, getStorageKey } from "~/carousel-storage.server";
import { Prisma } from "@prisma/client";
import invariant from "tiny-invariant";
import type { Route } from "./+types/posts.edit";
import { useState } from "react";
import { prisma } from "~/utils/db.server";

export async function loader({ params }: Route.LoaderArgs) {
  invariant(params.slug, "Expected a slug");

  const post = prisma.post.findUnique({
    where: { slug: params.slug },
    include: { categories: true },
  });

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return post;
}

export async function action({ request }: Route.ActionArgs) {
  async function uploadHandler(fileUpload: FileUpload) {
    const fileName = fileUpload.name;

    if (
      fileUpload.fieldName === "image" &&
      fileUpload.type.startsWith("image/")
    ) {
      let storageKey = getStorageKey(fileUpload.name as string);
      // console.log(fileUpload.name);

      // FileUpload objects are not meant to stick around for very long (they are
      // streaming data from the request.body); store them as soon as possible.
      await fileStorage.set(storageKey, fileUpload);

      // Return a File for the FormData object. This is a LazyFile that knows how
      // to access the file's content if needed (using e.g. file.stream()) but
      // waits until it is requested to actually read anything.
      return fileStorage.get(storageKey);
    }
  }

  const formData = await parseFormData(request, uploadHandler);

  const fileUpload = formData.get("image") as FileUpload;
  const oldImage = formData.get("oldImage") as string;
  const badge = formData.get("badge") as string;
  const title = String(formData.get("title"));
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const subtitle = formData.get("subtitle") as string;
  const content = formData.get("content") as string;
  const categories = formData.get("category") as string;
  const split_category = categories
    .toUpperCase()
    .split(",")
    .map((category) => category.trim());

  let data_image: string;

  if (fileUpload) {
    data_image = String(fileUpload.name as string);
  } else {
    data_image = oldImage;
  }

  // console.log(fileUpload);

  const errors: {
    title?: string;
    badge?: string;
    category?: string;
    image?: string;
    content?: string;
    slug?: string;
    author?: string;
    subtitle?: string;
    categories?: string;
    file?: string;
  } = {};

  if (title.length < 12) {
    errors.title = "Judul kurang dari 12 karakter";
  }

  if (subtitle.length < 12) {
    errors.subtitle = "Deskripsi Judul kurang dari 12 karakter";
  }

  if (content.length < 50) {
    errors.content = "Content kurang dari 50 karakter";
  }

  // if (fileUpload.size === 0) {
  //   errors.image = "Image tidak boleh kosong";
  // }

  if (categories.length < 5) {
    errors.category = "Kategori kurang dari 5 karakter";
  }
  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const updateCategory = await prisma.post.update({
      where: { slug },
      data: {
        badge,
        title,
        slug,
        author,
        subtitle,
        image: data_image,
        content,
        categories: {
          deleteMany: {},
          create: split_category.map((cat) => ({
            assignedBy: author,
            assignedAt: new Date(),
            category: {
              connectOrCreate: {
                where: {
                  name: cat,
                },
                create: {
                  name: cat,
                },
              },
            },
          })),
        },
      },
      include: { categories: true },
    });
    return redirect(`/posts/${updateCategory.slug}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002" && e.meta?.target === "Post_image_key") {
        errors.image = "Image already exist";
        return data({ errors }, { status: 500 });
      }

      if (e.code === "P2002" && e.meta?.target === "Post_slug_key") {
        errors.slug = "Slug already exist";
        return data({ errors }, { status: 500 });
      }
    }
    console.log(e);
  }
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function EditPost({ loaderData }: Route.ComponentProps) {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;
  const navigate = useNavigate();
  const post = loaderData;

  const [urlToken, setUrlToken] = useState("");

  return (
    <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg h-full">
      <Form key={post?.id} method="post" encType="multipart/form-data">
        <Card className="max-w-7xl">
          <CardHeader>
            <CardTitle>Create Posts/Article</CardTitle>
            <CardDescription>
              Create a new blog post or article.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  name="badge"
                  placeholder="Badge postingan"
                  defaultValue={post?.badge || ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={post?.title || ""}
                  placeholder="Judul postingan"
                  required
                />
                {errors?.title ? (
                  <em className="text-red-500">{errors.title}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="contoh : judul-postingan (tanpa spasi)"
                  defaultValue={post?.slug || ""}
                  required
                />
                {errors?.slug ? (
                  <em className="text-red-500">{errors.slug}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Penulis"
                  defaultValue={post?.author || ""}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subtitle">Deskripsi Judul</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  placeholder="Deskripsikan judul postingan"
                  defaultValue={post?.subtitle || ""}
                  required
                />
                {errors?.subtitle ? (
                  <em className="text-red-500">{errors.subtitle}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image Slider</Label>
                <img
                  src={`/carousel/${post?.image}`}
                  alt=""
                  className="object-cover object-center w-48  rounded-md"
                />
                <input
                  type="hidden"
                  name="oldImage"
                  value={post?.image || ""}
                />
                <Input accept="image/*" id="image" type="file" name="image" />
                {errors?.image ? (
                  <em className="text-red-500">{errors.image}</em>
                ) : null}
              </div>
              <div className="flex flex-col justify-between ">
                <Label htmlFor="content" className="flex justify-between mr-10">
                  Content (Format Markdown)
                  <Link
                    className="flex text-slate-950 text-xs bg-slate-300 px-2 py-1 rounded-full hover:bg-slate-400 hover:text-slate-950 "
                    to={`/gallery/${urlToken}`}
                    onClick={() =>
                      setUrlToken(Math.random().toString(36).substring(2, 9))
                    }
                    target="_blank"
                  >
                    <span>📸 Upload Gambar untuk Konten</span>
                  </Link>
                </Label>
                <textarea
                  defaultValue={post?.content}
                  id="content"
                  name="content"
                  rows={15}
                  aria-describedby="characters-left-textarea"
                  className="overflow-auto p-2 mt-3  bg-white border border-zinc-200 rounded-md active:border-zinc-200 hover:border-zinc-300 focus:outline-none focus:border-2 focus:border-zinc-600 focus:ring-0"
                />
                {errors?.content ? (
                  <em className="text-red-500">{errors.content}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Kategori : pisahkan dengan , (koma)"
                  defaultValue={post?.categories
                    .map((c) => c.categoryName)
                    .join(", ")}
                />
                {errors?.category ? (
                  <em className="text-red-500">{errors.category}</em>
                ) : null}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 mt-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              type="button"
            >
              Cancel
            </Button>

            <Button type="submit">Simpan</Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
