import type { JsonPlaceholderAlbum, JsonPlaceholderPhoto } from "@/types/api";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/lumina-data";
import { albumMetadata, localGalleryImages } from "@/lib/data/gallery-metadata";

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getLocalImage(photoId: number) {
  return localGalleryImages[(photoId - 1) % localGalleryImages.length];
}

export function transformAlbumToGalleryAlbum(album: JsonPlaceholderAlbum): GalleryAlbum {
  const metadata = albumMetadata[album.id] ?? albumMetadata[((album.id - 1) % Object.keys(albumMetadata).length) + 1];

  return {
    id: album.id,
    residentId: album.userId,
    title: metadata.title,
    category: metadata.category,
    description: metadata.description,
    coverImage: metadata.coverImage,
    photoCount: 8,
    location: metadata.location,
    height: metadata.height,
    alt: metadata.alt,
  };
}

export function transformAlbumsToGalleryAlbums(albums: JsonPlaceholderAlbum[]): GalleryAlbum[] {
  return albums.slice(0, 6).map(transformAlbumToGalleryAlbum);
}

export function transformPhotoToGalleryPhoto(photo: JsonPlaceholderPhoto, category: string): GalleryPhoto {
  const title = sentenceCase(photo.title);

  return {
    id: photo.id,
    albumId: photo.albumId,
    title,
    image: getLocalImage(photo.id),
    alt: `${category} photo for Lumina gallery: ${title}`,
    category,
  };
}

export function transformPhotosToGalleryPhotos(
  photos: JsonPlaceholderPhoto[],
  album: GalleryAlbum,
): GalleryPhoto[] {
  return photos.slice(0, 8).map((photo) => transformPhotoToGalleryPhoto(photo, album.category));
}
