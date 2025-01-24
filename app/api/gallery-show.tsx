import { fileStorage, getStorageKey } from "~/gallery-storage.server";
import type { Route } from "./+types/gallery-show";

export async function loader({ params }: Route.LoaderArgs) {
  const storageKey = getStorageKey(params.galeryId);
  const file = await fileStorage.get(storageKey);

  if (!file) {
    throw new Response("User avatar not found", {
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
