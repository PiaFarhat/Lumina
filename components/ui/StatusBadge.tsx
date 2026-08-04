type StatusBadgeProps = {
  status: string;
};

const statusClass: Record<string, string> = {
  Submitted: "border-[#D8D4CC] bg-white text-[#6E6E6E]",
  Scheduled: "border-[#C8A97E]/50 bg-[#C8A97E]/12 text-[#8c6b3f]",
  "In Progress": "border-[#8FA89B]/50 bg-[#8FA89B]/12 text-[#5b7368]",
  Completed: "border-[#2C3E50]/20 bg-[#2C3E50]/8 text-[#2C3E50]",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[status] ?? statusClass.Submitted}`}>
      {status}
    </span>
  );
}
