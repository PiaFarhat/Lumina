import type { JsonPlaceholderPhoto } from "@/types/api";
import { apiFetch } from "./client";

export function getPhotosByAlbumId(albumId: number, signal?: AbortSignal): Promise<JsonPlaceholderPhoto[]> {
  return apiFetch<JsonPlaceholderPhoto[]>(`/albums/${albumId}/photos`, signal);
}
