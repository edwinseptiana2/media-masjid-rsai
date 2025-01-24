import { LocalFileStorage } from "@mjackson/file-storage/local";

export const fileStorage = new LocalFileStorage("./uploads/galleries");

export function getStorageKey(galeryId: string) {
  return `gallery-${galeryId}-show`;
}
