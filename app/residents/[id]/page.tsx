import { notFound } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ResidentProfileView } from "@/components/profile/ResidentProfileView";
import { getAlbumsByUserId } from "@/lib/api/albums";
import { getPostsByUserId, mapPostToAnnouncement } from "@/lib/api/announcements";
import { getUserById, mapUserToResident } from "@/lib/api/residents";
import { getTodosByUserId } from "@/lib/api/todos";
import { transformAlbumsToGalleryAlbums } from "@/lib/transformers/gallery";
import { transformTodosToMaintenanceRequests } from "@/lib/transformers/maintenance";

type ResidentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function parseResidentId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export default async function ResidentPage({ params }: ResidentPageProps) {
  const { id } = await params;
  const residentId = parseResidentId(id);

  if (!residentId) {
    notFound();
  }

  const result = await Promise.all([
      getUserById(residentId),
      getPostsByUserId(residentId),
      getTodosByUserId(residentId),
      getAlbumsByUserId(residentId),
    ]).catch(() => null);

  if (!result) {
    notFound();
  }

  const [user, posts, todos, albums] = result;
  const resident = mapUserToResident(user, user.id - 1);

  if (!user.id) {
    notFound();
  }

  return (
    <AuthGuard>
      <ResidentProfileView
        user={user}
        resident={resident}
        posts={posts.slice(0, 4).map((post, index) => mapPostToAnnouncement(post, index))}
        requests={transformTodosToMaintenanceRequests(todos, [resident])}
        albums={transformAlbumsToGalleryAlbums(albums)}
      />
    </AuthGuard>
  );
}
