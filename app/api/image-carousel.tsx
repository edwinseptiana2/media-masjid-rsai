import { fileStorage, getStorageKey } from "~/carousel-storage.server";
import type { Route } from "./+types/upload-avatar";

export async function loader({ params }: Route.LoaderArgs) {
  const storageKey = getStorageKey(params.id as string);
  const file = await fileStorage.get(storageKey);

  if (!file) {
    throw new Response("image carousel not found", {
      status: 404,
    });
  }

  return new Response(file.stream(), {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename=${file.name}`,
    },
  });
}
