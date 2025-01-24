import { FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { fileStorage, getStorageKey } from "~/gallery-storage.server";
import type { Route } from "./+types/upload-gallery";
import { Button } from "~/components/ui/button";
import { CopyIcon, UploadCloudIcon } from "lucide-react";

export async function action({ request, params }: Route.ActionArgs) {
  async function uploadHandler(fileUpload: FileUpload) {
    if (
      fileUpload.fieldName === "galleryName" &&
      fileUpload.type.startsWith("image/")
    ) {
      let storageKey = getStorageKey(params.galeryId);

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
}

export default function UploadGalery({
  actionData,
  params,
}: Route.ComponentProps) {
  console.log(params);
  return (
    <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg h-full mt-10">
      <h1 className="text-2xl  font-bold">Upload Galery 📸</h1>
      <form
        method="post"
        // The form's enctype must be set to "multipart/form-data" for file uploads
        encType="multipart/form-data"
        className="mt-5"
      >
        <input
          type="file"
          className="mr-3"
          name="galleryName"
          accept="image/*"
        />
        <Button
          variant={"ghost"}
          type="submit"
          className="mt-5 w-28 gap-3 font-bold bg-zinc-950 text-white/80"
        >
          <UploadCloudIcon className="h-5 w-5" /> Upload
        </Button>
      </form>
      <div className="flex flex-col justify-center mt-5">
        <img
          src={`/gallery-show/${params.galeryId}`}
          alt="gallery photo"
          className="mt-1 w-full"
        />
        <div className="items-start mt-5 flex-row flex">
          <Button
            variant={"outline"}
            type="button"
            className="flex mr-1 font-bold"
            onClick={() => {
              navigator.clipboard.writeText(
                document.getElementById("url")!.textContent!
              );
              alert(
                "Link gambar berhasil disalin, silahkan di paste di Content Markdown"
              );
            }}
          >
            <CopyIcon className="h-5 w-5 mr-2" /> Copy Url
          </Button>
          <div
            id="url"
            className="flex font-bold border border-zinc-200 h-10 p-2 items-center rounded-md"
          >
            {"<img src="}
            {'"'}
            {"/gallery-show/"}
            {params.galeryId}
            {'" '}
            {"alt="}
            {'"'}
            {params.galeryId}
            {'"'}
            {" />"}
          </div>
        </div>
      </div>
    </div>
  );
}
