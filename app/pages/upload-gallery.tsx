import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
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
      await fileStorage.set(storageKey, fileUpload);
      return fileStorage.get(storageKey);
    }
  }
  const formData = await parseFormData(request, uploadHandler);
}

export default function UploadGalery({ params }: Route.ComponentProps) {
  //when image not found or 404 hidden preview image

  return (
    <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg h-full mt-10">
      <h1 className="text-2xl  font-bold">Upload Galery test 📸</h1>
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
      <div id="copy-image" className="flex flex-col justify-center mt-5">
        <img
          id="image"
          src={`/gallery-show/${params.galeryId}`}
          alt="gallery photo"
          className="mt-1 w-3/4"
        />
        <p className="mt-8 font-bold text-sm text-red-500 italic">
          Pastikan sebelum <span className="text-zinc-950 p-2">Copy Url</span>{" "}
          gambar di atas sudah tampil terlebih dahulu.
        </p>
        <div className="items-start mt-2 flex-row flex">
          <Button
            variant={"outline"}
            type="button"
            className="flex mr-1 font-bold"
            onClick={() => {
              // copy to clipboard
              const copyText = document.getElementById(
                "url"
              ) as HTMLInputElement;
              copyText.select();
              copyText.setSelectionRange(0, 99999);
              try {
                // navigator.clipboard.writeText(copyText.value);
                navigator.clipboard.readText().then(() => {
                  navigator.clipboard.writeText(copyText.value);
                });
                alert(
                  "Link gambar berhasil disalin, silahkan di paste di Content Markdown : " +
                    copyText.value
                );
              } catch (err) {
                alert("Oops, unable to copy " + err);
              }
            }}
          >
            <CopyIcon className="h-5 w-5 mr-2" /> Copy Url
          </Button>

          <div className="flex items-center w-full ml-3 text-sm">
            {`<img src="/gallery-show/${params.galeryId}" alt="photo gallery" />`}
          </div>
          <input
            type="text"
            id="url"
            name="url"
            className="invisible font-bold bg-white w-full border-zinc-100 h-10 p-2 items-center rounded-md"
            defaultValue={`<img src="/gallery-show/${params.galeryId}" alt="photo gallery" />`}
          />
        </div>
      </div>
    </div>
  );
}
