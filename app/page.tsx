import { HomeExperience } from "@/components/home/HomeExperience";
import { getAlbums } from "@/lib/api/albums";
import { getResidents } from "@/lib/api/residents";
import { getTodos } from "@/lib/api/todos";
import { fallbackGalleryAlbums } from "@/lib/data/gallery-metadata";
import { fallbackMaintenanceRequests, residents as localResidents } from "@/lib/lumina-data";
import { transformAlbumsToGalleryAlbums } from "@/lib/transformers/gallery";
import { transformTodosToMaintenanceRequests } from "@/lib/transformers/maintenance";

export default async function Home() {
  const [residentsResult, todosResult, albumsResult] = await Promise.allSettled([
    getResidents(),
    getTodos(),
    getAlbums(),
  ]);

  const residents = residentsResult.status === "fulfilled" ? residentsResult.value : localResidents;
  const maintenanceRequests =
    todosResult.status === "fulfilled"
      ? transformTodosToMaintenanceRequests(todosResult.value, residents).slice(0, 6)
      : fallbackMaintenanceRequests;
  const galleryAlbums =
    albumsResult.status === "fulfilled"
      ? transformAlbumsToGalleryAlbums(albumsResult.value)
      : fallbackGalleryAlbums;

  return (
    <HomeExperience
      maintenanceRequests={maintenanceRequests}
      maintenanceSource={todosResult.status === "fulfilled" ? "api" : "fallback"}
      galleryAlbums={galleryAlbums}
      gallerySource={albumsResult.status === "fulfilled" ? "api" : "fallback"}
    />
  );
}
