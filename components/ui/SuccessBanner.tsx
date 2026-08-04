import { CircleCheck } from "lucide-react";

export function SuccessBanner({ message }: { message: string }) {
  return (
    <div role="status" className="flex items-center gap-3 rounded-2xl border border-[#8FA89B]/40 bg-[#8FA89B]/12 px-4 py-3 text-sm font-medium text-[#2C3E50]">
      <CircleCheck className="h-5 w-5 text-[#789285]" aria-hidden />
      {message}
    </div>
  );
}
