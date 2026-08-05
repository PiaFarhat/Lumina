import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AnnouncementNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F4F1EA] px-4 py-10 text-[#2C3E50]">
      <section className="w-full max-w-xl rounded-[2rem] border border-[#D8D4CC] bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Announcement unavailable</p>
        <h1 className="mt-5 font-heading text-3xl font-semibold">This announcement could not be found.</h1>
        <p className="mt-4 text-sm leading-6 text-[#6E6E6E]">
          It may have been removed from the community feed or the link may be incorrect.
        </p>
        <Link
          href="/#announcements"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2C3E50] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/25"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to announcements
        </Link>
      </section>
    </main>
  );
}
