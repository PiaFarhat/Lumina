import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function AnnouncementLoading() {
  return (
    <main className="min-h-screen bg-[#F4F1EA] px-4 py-8 text-[#2C3E50] sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-48 rounded-full border border-[#D8D4CC] bg-white" />
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-sm">
          <div className="min-h-[320px] bg-[#D8D4CC] sm:min-h-[460px]" />
          <div className="grid gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-10">
            <div>
              <LoadingSkeleton />
              <div className="mt-6 h-4 max-w-2xl animate-pulse rounded-full bg-[#D8D4CC]" />
              <div className="mt-4 h-4 max-w-xl animate-pulse rounded-full bg-[#D8D4CC]" />
              <div className="mt-4 h-4 max-w-lg animate-pulse rounded-full bg-[#D8D4CC]" />
            </div>
            <div className="h-36 rounded-[1.5rem] border border-[#D8D4CC] bg-[#F4F1EA]" />
          </div>
        </div>
      </div>
    </main>
  );
}
