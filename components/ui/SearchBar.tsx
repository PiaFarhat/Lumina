"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search announcements</span>
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A92A3]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-[#D8D4CC] bg-white pl-11 pr-4 text-sm text-[#2C3E50] outline-none transition focus:border-[#8FA89B] focus:ring-4 focus:ring-[#8FA89B]/20"
      />
    </label>
  );
}
