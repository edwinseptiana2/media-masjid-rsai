import { FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { fileStorage, getStorageKey } from "~/avatar-storage.server";
import type { Route } from "./+types/user-profile";

export async function action({ request, params }: Route.ActionArgs) {
  async function uploadHandler(fileUpload: FileUpload) {
    if (
      fileUpload.fieldName === "avatar" &&
      fileUpload.type.startsWith("image/")
    ) {
      let storageKey = getStorageKey(params.id);

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

export default function UserPage({ actionData, params }: Route.ComponentProps) {
  return (
    <div>
      <h1>User {params.id}</h1>
      <form
        method="post"
        // The form's enctype must be set to "multipart/form-data" for file uploads
        encType="multipart/form-data"
      >
        <input type="file" name="avatar" accept="image/*" />
        <button type="submit">Submit</button>
      </form>

      <img src={`/user/${params.id}/avatar`} alt="user avatar" />
    </div>
  );
}
