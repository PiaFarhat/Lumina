import { Announcement, announcements as localAnnouncements, images } from "@/lib/lumina-data";
import { JsonPlaceholderComment, JsonPlaceholderPost } from "@/types/api";
import { getJson, JsonPlaceholderError } from "./client";

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const authors = [
  "Lumina Community Office",
  "Resident Experience Team",
  "Security Desk",
  "Clubhouse Concierge",
];

const commentDates = ["Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 14"];

const imageByCategory: Record<string, { image: string; imageAlt: string }> = {
  Community: {
    image: images.compoundRhythm,
    imageAlt: "Lumina residential compound rhythm with landscaped walking paths and villas",
  },
  Events: {
    image: images.clubhouse,
    imageAlt: "Lumina clubhouse pool terrace prepared for a resident evening event",
  },
  Security: {
    image: images.reception,
    imageAlt: "Lumina entrance reception and security arrival area",
  },
};

export type AnnouncementMetadata = {
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  author: string;
};

export type LuminaComment = {
  id: number;
  announcementId: number;
  authorLabel: string;
  secondaryIdentity: string;
  text: string;
  date: string;
  initials: string;
};

export function getAnnouncementMetadata(index: number): AnnouncementMetadata {
  const localMeta = localAnnouncements[index % localAnnouncements.length];
  const imageMeta = imageByCategory[localMeta?.category ?? ""] ?? imageByCategory.Community;

  return {
    category: localMeta?.category ?? "Community",
    date: localMeta?.date ?? "Upcoming",
    image: imageMeta.image,
    imageAlt: imageMeta.imageAlt,
    featured: index === 0,
    author: authors[index % authors.length],
  };
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function mapPostToAnnouncement(post: JsonPlaceholderPost, index: number): Announcement {
  const metadata = getAnnouncementMetadata(index);

  return {
    id: post.id,
    userId: post.userId,
    title: sentenceCase(post.title),
    category: metadata.category,
    date: metadata.date,
    description: sentenceCase(post.body),
  };
}

export function mapCommentToLuminaComment(comment: JsonPlaceholderComment, index: number): LuminaComment {
  return {
    id: comment.id,
    announcementId: comment.postId,
    authorLabel: sentenceCase(comment.name),
    secondaryIdentity: comment.email,
    text: sentenceCase(comment.body),
    date: commentDates[index % commentDates.length],
    initials: initialsFromName(comment.name),
  };
}

export async function getAnnouncements(signal?: AbortSignal): Promise<Announcement[]> {
  const posts = await getJson<JsonPlaceholderPost[]>("/posts", signal);
  return posts.slice(0, 6).map(mapPostToAnnouncement);
}

export async function getPostById(id: number): Promise<JsonPlaceholderPost | null> {
  try {
    const post = await getJson<JsonPlaceholderPost>(`/posts/${id}`);

    if (!post.id || !post.title || !post.body) {
      return null;
    }

    return post;
  } catch (error) {
    if (error instanceof JsonPlaceholderError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getCommentsByPostId(postId: number): Promise<LuminaComment[]> {
  const comments = await getJson<JsonPlaceholderComment[]>(`/posts/${postId}/comments`);
  return comments.map(mapCommentToLuminaComment);
}
