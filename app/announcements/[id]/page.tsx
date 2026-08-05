import { ArrowLeft, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAnnouncementMetadata,
  getCommentsByPostId,
  getPostById,
  mapPostToAnnouncement,
} from "@/lib/api/announcements";
import { EmptyState } from "@/components/ui/EmptyState";

type AnnouncementPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function parsePostId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export default async function AnnouncementDetailPage({ params }: AnnouncementPageProps) {
  const { id } = await params;
  const postId = parsePostId(id);

  if (!postId) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  const metadataIndex = Math.max(0, post.id - 1);
  const announcement = mapPostToAnnouncement(post, metadataIndex);
  const metadata = getAnnouncementMetadata(metadataIndex);
  const comments = await getCommentsByPostId(post.id);

  return (
    <main className="min-h-screen bg-[#F4F1EA] px-4 py-8 text-[#2C3E50] sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#announcements"
          className="inline-flex items-center gap-2 rounded-full border border-[#D8D4CC] bg-white px-4 py-2 text-sm font-semibold text-[#2C3E50] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8FA89B] hover:text-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/25"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to announcements
        </Link>

        <article className="mt-6 overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-sm">
          <div className="relative min-h-[320px] overflow-hidden bg-[#2C3E50] sm:min-h-[460px]">
            <Image
              src={metadata.image}
              alt={metadata.imageAlt}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,62,80,0.9),rgba(44,62,80,0.38),rgba(44,62,80,0.08))]" />
            <div className="relative flex min-h-[320px] max-w-3xl flex-col justify-end px-5 py-8 text-white sm:min-h-[460px] sm:px-10 sm:py-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
                  {announcement.category}
                </span>
                {metadata.featured ? (
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/82">
                    Featured
                  </span>
                ) : null}
              </div>
              <h1 className="mt-8 max-w-3xl font-heading text-3xl font-semibold leading-tight sm:text-5xl">
                {announcement.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/76">
                <span>{announcement.date}</span>
                <span>{metadata.author}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-10">
            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-[#4D5C66]">{announcement.description}</p>
              <div className="mt-8 space-y-5 text-base leading-8 text-[#6E6E6E]">
                {post.body.split("\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}</p>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Resident response</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-heading text-3xl font-semibold">{comments.length}</p>
                  <p className="mt-1 text-sm text-[#6E6E6E]">Comments</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#789285]">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </div>
              </div>
            </aside>
          </div>
        </article>

        <section className="mt-8 rounded-[2rem] border border-[#D8D4CC] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Comments</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[#2C3E50]">Resident notes</h2>
            </div>
            <p className="text-sm text-[#6E6E6E]">{comments.length} total</p>
          </div>

          {comments.length ? (
            <div className="mt-7 grid gap-4">
              {comments.map((comment) => (
                <article key={comment.id} className="rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA] p-5">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2C3E50] text-sm font-semibold text-white">
                      {comment.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-semibold text-[#2C3E50]">{comment.authorLabel}</h3>
                        <span className="text-xs text-[#7A92A3]">{comment.date}</span>
                      </div>
                      <p className="mt-1 break-words text-sm text-[#6E6E6E]">{comment.secondaryIdentity}</p>
                      <p className="mt-4 text-sm leading-7 text-[#4D5C66]">{comment.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-7">
              <EmptyState title="No resident comments yet." />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
