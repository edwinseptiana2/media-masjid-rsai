import { LocalFileStorage } from "@mjackson/file-storage/local";

export const fileStorage = new LocalFileStorage("./uploads/avatars");

export function getStorageKey(sliderId: string) {
  return `user-${sliderId}-avatar`;
}
