"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LuminaMark } from "../ui/LuminaMark";
import { useAuth } from "./AuthProvider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const next = pathname && pathname !== "/" ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/sign-in${next}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F4F1EA] px-4 text-[#2C3E50]">
        <div className="grid justify-items-center gap-4">
          <LuminaMark size="md" />
          <p className="text-sm font-semibold text-[#789285]">Opening Lumina</p>
        </div>
      </main>
    );
  }

  return children;
}
