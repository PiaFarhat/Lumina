import type { JsonPlaceholderAlbum } from "@/types/api";
import { apiFetch } from "./client";

export function getAlbums(signal?: AbortSignal): Promise<JsonPlaceholderAlbum[]> {
  return apiFetch<JsonPlaceholderAlbum[]>("/albums", signal);
}

export function getAlbumsByUserId(userId: number, signal?: AbortSignal): Promise<JsonPlaceholderAlbum[]> {
  return apiFetch<JsonPlaceholderAlbum[]>(`/users/${userId}/albums`, signal);
}
