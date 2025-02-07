import type { Route } from "./+types/posts.new";
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
import { TextareaContent } from "~/components/ui/textarea-content";
import { data, Link, redirect, useFetcher, useNavigate } from "react-router";
import { parseFormData, type FileUpload } from "@mjackson/form-data-parser";
import { fileStorage, getStorageKey } from "~/carousel-storage.server";
import { prisma } from "~/utils/db.server";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { nanoid } from "nanoid";
import { getSession } from "~/utils/session";

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }
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
  const badge = formData.get("badge") as string;
  const title = String(formData.get("title"));
  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const subtitle = formData.get("subtitle") as string;
  const image = String(fileUpload.name);
  const content = formData.get("content") as string;
  const categories = formData.get("category") as string;
  const split_category = categories
    .toUpperCase()
    .split(",")
    .map((category) => category.trim());

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

  if (title.length > 255) {
    errors.content = "Judul lebih dari 255 karakter";
  }

  if (subtitle.length < 12) {
    errors.subtitle = "Deskripsi Judul kurang dari 12 karakter";
  }

  if (subtitle.length > 255) {
    errors.content = "Deskripsi lebih dari 255 karakter";
  }

  if (content.length < 50) {
    errors.content = "Content kurang dari 50 karakter";
  }

  if (content.length > 16777215) {
    errors.content = "Content lebih dari 50 karakter";
  }

  if (fileUpload.size === 0) {
    errors.image = "Image tidak boleh kosong";
  }

  if (categories.length < 2) {
    errors.category = "Kategori kurang dari 2 karakter";
  }
  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  try {
    const createCategory = await prisma.post.create({
      data: {
        badge,
        title,
        slug,
        author,
        subtitle,
        image,
        content,
        categories: {
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
    });
    return redirect(`/posts/${createCategory.slug}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // console.log(e);
      // console.log(fileUpload);

      if (e.code === "P2002" && e.meta?.target === "Post_image_key") {
        errors.image = "Image already exist";
        // await fileStorage.remove(getStorageKey(fileUpload.name as string));
        // const fileInput = document.getElementById("image");
        // if (fileInput) {
        //   (fileInput as HTMLInputElement).value = "";
        // }
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

export default function NewPost(_: Route.ComponentProps) {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;
  const navigate = useNavigate();
  const imageId = nanoid();
  const [token, setToken] = useState("");

  return (
    <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg h-full">
      <fetcher.Form method="post" encType="multipart/form-data">
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
                <Input id="badge" name="badge" placeholder="Badge postingan" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Judul postingan"
                  required
                />
                {errors?.title ? (
                  <em className="text-red-500">{errors.title}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subtitle">Deskripsi Judul</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  placeholder="Deskripsikan judul postingan"
                  required
                />
                {errors?.subtitle ? (
                  <em className="text-red-500">{errors.subtitle}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image Slider</Label>
                <Input
                  accept="image/*"
                  id="image"
                  type="file"
                  name="image"
                  required
                />
                {errors?.image ? (
                  <em className="text-red-500">{errors.image}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="contoh : judul-postingan (tanpa spasi)"
                  required
                />
                {errors?.slug ? (
                  <em className="text-red-500">{errors.slug}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="author">Penulis</Label>
                <Input id="author" name="author" placeholder="Penulis" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content" className="flex justify-between mr-10">
                  Content (Format Markdown)
                  <Link
                    to={`/gallery/${token}`}
                    target="_blank"
                    className="flex text-slate-950 text-xs bg-slate-300 px-2 py-1 rounded-full hover:bg-slate-400 hover:text-slate-950 "
                    onClick={() => {
                      setToken(imageId);
                    }}
                  >
                    <span>📸 Upload Gambar untuk Konten</span>
                  </Link>
                </Label>
                <TextareaContent />
                {errors?.content ? (
                  <em className="text-red-500">{errors.content}</em>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">
                  Kategori :{" "}
                  <span className="text-sm text-muted-foreground">
                    pisahkan dengan , (koma)
                  </span>
                </Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Kategori : pisahkan dengan , (koma)"
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
              onClick={() => navigate("/posts")}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Simpan</Button>
          </CardFooter>
        </Card>
      </fetcher.Form>
    </div>
  );
}
