import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#F4F1EA] px-4 py-8 text-[#2C3E50]">
      <div className="mx-auto max-w-7xl">
        <div className="h-24 rounded-[2rem] border border-[#D8D4CC] bg-white shadow-sm" />
        <section className="mt-12 rounded-[2rem] border border-[#D8D4CC] bg-white p-6">
          <LoadingSkeleton />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <article key={index} className="rounded-[2rem] border border-[#D8D4CC] bg-[#F4F1EA] p-6">
                <div className="flex items-start justify-between gap-4">
                  <LoadingSkeleton />
                  <div className="h-7 w-24 animate-pulse rounded-full bg-[#D8D4CC]" />
                </div>
                <div className="mt-10 h-5 w-3/4 animate-pulse rounded-full bg-[#D8D4CC]" />
                <div className="mt-5 h-4 w-full animate-pulse rounded-full bg-[#D8D4CC]" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-[#D8D4CC]" />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
