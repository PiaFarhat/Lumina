import type { JsonPlaceholderAlbum } from "@/types/api";
import { apiFetch } from "./client";

export function getAlbums(signal?: AbortSignal): Promise<JsonPlaceholderAlbum[]> {
  return apiFetch<JsonPlaceholderAlbum[]>("/albums", signal);
}
