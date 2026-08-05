"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";

type AnnouncementErrorProps = {
  error: Error;
  reset: () => void;
};

export default function AnnouncementError({ reset }: AnnouncementErrorProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F4F1EA] px-4 py-10 text-[#2C3E50]">
      <section className="w-full max-w-xl rounded-[2rem] border border-[#D8D4CC] bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Unable to load</p>
        <h1 className="mt-5 font-heading text-3xl font-semibold">The announcement is temporarily unavailable.</h1>
        <p className="mt-4 text-sm leading-6 text-[#6E6E6E]">
          Please retry the request or return to the community announcement list.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2C3E50] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/25"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Retry
          </button>
          <Link
            href="/#announcements"
            className="inline-flex items-center justify-center rounded-full border border-[#D8D4CC] bg-white px-5 py-3 text-sm font-semibold text-[#2C3E50] transition hover:-translate-y-0.5 hover:border-[#8FA89B] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/25"
          >
            Back to announcements
          </Link>
        </div>
      </section>
    </main>
  );
}
