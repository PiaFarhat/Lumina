"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { LuminaMark } from "@/components/ui/LuminaMark";
import { images } from "@/lib/lumina-data";

type SignInStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SignInPage() {
  const { isAuthenticated, isLoading, signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SignInStatus>("idle");
  const [errors, setErrors] = useState<{ username?: string; email?: string; form?: string }>({});
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const nextPath = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const params = new URLSearchParams(window.location.search);
    return params.get("next") || "/";
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const nextErrors: typeof errors = {};
    if (!username.trim()) nextErrors.username = "Username is required.";
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (nextErrors.username || nextErrors.email) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    try {
      setErrors({});
      setStatus("loading");
      await signIn(username, email);
      setStatus("success");
      router.replace(nextPath);
    } catch (error) {
      setStatus("error");
      setErrors({
        form: error instanceof Error && error.message === "INVALID_CREDENTIALS"
          ? "The username or email is incorrect."
          : "We could not sign you in right now. Please try again.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F1EA] p-4 text-[#2C3E50]">
      <div className="relative mx-auto grid min-h-[calc(100vh-32px)] max-w-7xl overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-2xl shadow-[#2C3E50]/10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-72 overflow-hidden lg:min-h-full">
          <Image
            src={images.villa}
            alt="Lumina villa exterior surrounded by landscaped private gardens"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,62,80,0.08),rgba(44,62,80,0.74))]" />
          <div className="absolute bottom-0 max-w-xl p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C8A97E]">Resident Access</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">Welcome home</h1>
            <p className="mt-4 text-sm leading-7 text-white/76">Enter the private Lumina portal for community updates, requests, and resident services.</p>
          </div>
        </div>

        <section className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-[1.75rem] border border-[#D8D4CC] bg-white/92 p-6 shadow-xl shadow-[#2C3E50]/10 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <LuminaMark size="md" />
              <div>
                <p className="font-heading text-2xl font-semibold">Lumina</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Private Community Portal</p>
              </div>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
              <label className="grid gap-2 text-sm font-medium">
                Username
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  name="username"
                  className="field"
                  autoComplete="username"
                  aria-invalid={Boolean(errors.username)}
                  aria-describedby={errors.username ? "username-error" : undefined}
                  placeholder="Resident username"
                />
                {errors.username ? <span id="username-error" role="alert" className="text-sm text-red-700">{errors.username}</span> : null}
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  type="email"
                  className="field"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="resident@email.com"
                />
                {errors.email ? <span id="email-error" role="alert" className="text-sm text-red-700">{errors.email}</span> : null}
              </label>

              {errors.form ? (
                <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errors.form}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="btn-primary min-h-12 w-full disabled:cursor-wait disabled:opacity-70"
              >
                {status === "loading" ? "Signing in..." : "Sign In"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
