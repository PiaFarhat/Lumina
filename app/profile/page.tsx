"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/components/auth/AuthProvider";
import { ResidentProfileView } from "@/components/profile/ResidentProfileView";
import { getAlbumsByUserId } from "@/lib/api/albums";
import { getPostsByUserId, mapPostToAnnouncement } from "@/lib/api/announcements";
import { getUserById, mapUserToResident } from "@/lib/api/residents";
import { getTodosByUserId } from "@/lib/api/todos";
import type { JsonPlaceholderUser } from "@/types/api";
import type { Announcement, GalleryAlbum, MaintenanceRequest, Resident } from "@/lib/lumina-data";
import { transformAlbumsToGalleryAlbums } from "@/lib/transformers/gallery";
import { transformTodosToMaintenanceRequests } from "@/lib/transformers/maintenance";

type ProfileData = {
  user: JsonPlaceholderUser;
  resident: Resident;
  posts: Announcement[];
  requests: MaintenanceRequest[];
  albums: GalleryAlbum[];
};

export default function ProfilePage() {
  const { resident: authenticatedResident } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authenticatedResident) return;

    const controller = new AbortController();
    const userId = authenticatedResident.id;

    async function loadProfile() {
      try {
        setError("");
        const [user, posts, todos, albums] = await Promise.all([
          getUserById(userId, controller.signal),
          getPostsByUserId(userId),
          getTodosByUserId(userId, controller.signal),
          getAlbumsByUserId(userId, controller.signal),
        ]);
        const resident = mapUserToResident(user, user.id - 1);
        const residentList = [resident];

        setProfileData({
          user,
          resident,
          posts: posts.slice(0, 4).map((post, index) => mapPostToAnnouncement(post, index)),
          requests: transformTodosToMaintenanceRequests(todos, residentList),
          albums: transformAlbumsToGalleryAlbums(albums),
        });
      } catch {
        setError("We could not load your profile right now.");
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, [authenticatedResident]);

  return (
    <AuthGuard>
      {profileData ? (
        <ResidentProfileView {...profileData} backHref="/" backLabel="Back to portal" />
      ) : (
        <main className="grid min-h-screen place-items-center bg-[#F4F1EA] px-4 text-[#2C3E50]">
          <div className="rounded-[2rem] border border-[#D8D4CC] bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-[#789285]">{error || "Loading resident profile..."}</p>
          </div>
        </main>
      )}
    </AuthGuard>
  );
}
