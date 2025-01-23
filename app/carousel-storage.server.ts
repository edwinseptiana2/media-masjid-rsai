import { LocalFileStorage } from "@mjackson/file-storage/local";

export const fileStorage = new LocalFileStorage("./uploads/carousel");

export function getStorageKey(sliderId: string) {
  return `carousel-${sliderId}`;
}
