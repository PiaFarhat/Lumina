import { Inbox } from "lucide-react";

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[#D8D4CC] bg-white p-8 text-center text-[#6E6E6E]">
      <Inbox className="mx-auto mb-3 h-6 w-6 text-[#8FA89B]" aria-hidden />
      {title}
    </div>
  );
}
