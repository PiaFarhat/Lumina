"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, ConciergeBell, ShieldCheck, Sparkles } from "lucide-react";
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
    <main className="min-h-screen overflow-hidden bg-[#F4F1EA] p-4 text-[#2C3E50]">
      <div className="relative mx-auto min-h-[calc(100vh-32px)] max-w-7xl overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-2xl shadow-[#2C3E50]/10">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.02 }}
          animate={reduceMotion ? {} : { scale: 1.06 }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0"
        >
          <Image
            src={images.reception}
            alt="Lumina private entrance with landscaped arrival and security reception"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,241,234,0.96),rgba(244,241,234,0.76)_42%,rgba(44,62,80,0.26)),linear-gradient(180deg,rgba(44,62,80,0.08),rgba(44,62,80,0.58))]" />

        <div className="relative grid min-h-[calc(100vh-32px)] gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.58fr)] lg:p-8">
          <section className="flex min-h-[320px] flex-col justify-between py-4 text-[#2C3E50] lg:min-h-full lg:py-8">
            <div className="flex w-fit items-center gap-3 rounded-full border border-white/70 bg-white/68 px-3 py-2 shadow-lg shadow-[#2C3E50]/8 backdrop-blur-xl">
              <LuminaMark size="md" />
              <div>
                <p className="font-heading text-xl font-semibold">Lumina</p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#789285]">Resident Arrival</p>
              </div>
            </div>

            <div className="max-w-2xl">
              <motion.p
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.36 }}
                className="text-xs font-semibold uppercase tracking-[0.26em] text-[#789285]"
              >
                Private compound access
              </motion.p>
              <motion.h1
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-xl font-heading text-5xl font-semibold leading-[1.02] text-[#2C3E50] sm:text-6xl"
              >
                Welcome home
              </motion.h1>
              <motion.p
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-xl text-base leading-8 text-[#4D5C66]"
              >
                Resident access opens the community feed, service desk, visitor parking, and private profile areas in one calm portal.
              </motion.p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
              {[
                { label: "Gate desk", value: "Ready", icon: ShieldCheck },
                { label: "Resident services", value: "Online", icon: ConciergeBell },
                { label: "Community updates", value: "Live", icon: Bell },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + index * 0.05, duration: 0.34 }}
                    className="rounded-[1.25rem] border border-white/68 bg-white/66 p-4 shadow-lg shadow-[#2C3E50]/8 backdrop-blur-xl"
                  >
                    <Icon className="h-5 w-5 text-[#789285]" aria-hidden />
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A92A3]">{item.label}</p>
                    <p className="mt-1 font-heading text-xl font-semibold text-[#2C3E50]">{item.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="flex items-center justify-center py-4 lg:py-0">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-[1.75rem] border border-[#D8D4CC] bg-white/90 p-5 shadow-2xl shadow-[#2C3E50]/16 backdrop-blur-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#789285]">Arrival Pass</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold">Resident access</h2>
                <p className="mt-3 text-sm leading-6 text-[#6E6E6E]">Use your registered resident username and email to continue.</p>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#F4F1EA] text-[#789285]">
                <Sparkles className="h-5 w-5" aria-hidden />
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
                {status === "loading" ? "Verifying resident access..." : "Enter Portal"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
            <div className="mt-6 rounded-[1.25rem] border border-[#D8D4CC] bg-[#F4F1EA]/84 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#789285]">Access includes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Requests", "Announcements", "Parking", "Profile"].map((item) => (
                  <span key={item} className="rounded-full border border-[#D8D4CC] bg-white px-3 py-1 text-xs font-semibold text-[#4D5C66]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        </div>
      </div>
    </main>
  );
}
