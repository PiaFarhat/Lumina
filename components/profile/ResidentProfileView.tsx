import { ArrowLeft, Building2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { JsonPlaceholderUser } from "@/types/api";
import type { Announcement, GalleryAlbum, MaintenanceRequest, Resident } from "@/lib/lumina-data";
import { images } from "@/lib/lumina-data";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ResidentProfileViewProps = {
  user: JsonPlaceholderUser;
  resident: Resident;
  posts: Announcement[];
  requests: MaintenanceRequest[];
  albums: GalleryAlbum[];
  backHref?: string;
  backLabel?: string;
};

export function ResidentProfileView({
  user,
  resident,
  posts,
  requests,
  albums,
  backHref = "/#residents",
  backLabel = "Back to residents",
}: ResidentProfileViewProps) {
  return (
    <main className="min-h-screen bg-[#F4F1EA] px-4 py-8 text-[#2C3E50] sm:py-10">
      <div className="mx-auto max-w-7xl">
        <Link href={backHref} className="inline-flex items-center gap-2 rounded-full border border-[#D8D4CC] bg-white px-4 py-2 text-sm font-semibold transition hover:border-[#8FA89B] hover:text-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/25">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {backLabel}
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-sm">
          <div className="relative min-h-80 overflow-hidden bg-[#2C3E50] sm:min-h-[420px]">
            <Image src={images.villa} alt="Lumina private villa residence with landscaped garden" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,62,80,0.88),rgba(44,62,80,0.25))]" />
            <div className="relative flex min-h-80 max-w-3xl flex-col justify-end p-6 text-white sm:min-h-[420px] sm:p-10">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[#C8A97E] font-heading text-2xl font-semibold">
                {resident.initials}
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.24em] text-[#C8A97E]">Resident #{user.id}</p>
              <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">{user.name}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">{user.company.catchPhrase}</p>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-4">
            <InfoTile icon={Building2} label="Villa" value={resident.villa} />
            <InfoTile icon={Mail} label="Email" value={user.email} />
            <InfoTile icon={Phone} label="Phone" value={user.phone} />
            <InfoTile icon={MapPin} label="City" value={user.address.city} />
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Contact Details</p>
            <div className="mt-6 grid gap-4 text-sm text-[#4D5C66]">
              <DetailRow label="Username" value={user.username} />
              <DetailRow label="Company" value={user.company.name} />
              <DetailRow label="Website" value={user.website} />
              <DetailRow label="Address" value={`${user.address.suite}, ${user.address.street}, ${user.address.city} ${user.address.zipcode}`} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Announcements</p>
            <div className="mt-6 grid gap-4">
              {posts.slice(0, 3).map((post) => (
                <article key={post.id ?? post.title} className="rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA] p-5">
                  <p className="text-xs font-semibold text-[#789285]">{post.category}</p>
                  <h2 className="mt-3 font-heading text-xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#6E6E6E]">{post.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Maintenance Activity</p>
            <div className="mt-6 grid gap-4">
              {requests.slice(0, 4).map((request) => (
                <article key={request.id} className="rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="font-heading text-lg font-semibold">{request.title}</h2>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-3 text-sm text-[#6E6E6E]">{request.reference} · {request.createdAt}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Community Albums</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {albums.slice(0, 4).map((album) => (
                <article key={album.id} className="overflow-hidden rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA]">
                  <div className="relative aspect-[4/3]">
                    <Image src={album.coverImage} alt={album.alt} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-[#789285]">{album.category}</p>
                    <h2 className="mt-2 font-heading text-lg font-semibold">{album.title}</h2>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA] p-5">
      <Icon className="h-5 w-5 text-[#789285]" aria-hidden />
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A92A3]">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-3 border-b border-[#D8D4CC] pb-3 last:border-b-0">
      <span className="font-semibold text-[#2C3E50]">{label}</span>
      <span className="break-words text-right text-[#6E6E6E]">{value}</span>
    </div>
  );
}
