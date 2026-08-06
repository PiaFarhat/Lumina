import Link from "next/link";

export default function ResidentNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F4F1EA] px-4 text-[#2C3E50]">
      <section className="w-full max-w-xl rounded-[2rem] border border-[#D8D4CC] bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Resident unavailable</p>
        <h1 className="mt-5 font-heading text-3xl font-semibold">This resident profile could not be found.</h1>
        <Link href="/#residents" className="mt-7 inline-flex rounded-full bg-[#2C3E50] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/25">
          Back to residents
        </Link>
      </section>
    </main>
  );
}
