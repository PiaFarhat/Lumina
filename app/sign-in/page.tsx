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

const arrivalSignals = [
  { label: "Gate desk", value: "Ready", icon: ShieldCheck },
  { label: "Resident services", value: "Online", icon: ConciergeBell },
  { label: "Community updates", value: "Live", icon: Bell },
];

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
        form:
          error instanceof Error && error.message === "INVALID_CREDENTIALS"
            ? "The username or email is incorrect."
            : "We could not sign you in right now. Please try again.",
      });
    }
  }

  return (
    <main className="sign-in-page min-h-dvh bg-[#F4F1EA] p-3 text-[#2C3E50] sm:p-4">
      <div className="sign-in-frame relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-2xl shadow-[#2C3E50]/10">
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

        <div className="sign-in-grid relative grid gap-4 p-3 sm:p-4 md:h-full md:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.74fr)] md:items-center md:gap-4 md:p-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.58fr)] lg:gap-8 lg:p-8">
          <section className="sign-in-hero flex min-h-0 flex-col justify-between py-1 text-[#2C3E50] md:py-2 lg:py-4">
            <div className="sign-in-brand flex w-fit items-center gap-3 rounded-full border border-white/70 bg-white/68 px-3 py-2 shadow-lg shadow-[#2C3E50]/8 backdrop-blur-xl">
              <LuminaMark size="md" />
              <div>
                <p className="font-heading text-lg font-semibold sm:text-xl">Lumina</p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#789285]">
                  Resident Arrival
                </p>
              </div>
            </div>

            <div className="sign-in-hero-copy max-w-2xl">
              <motion.p
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.36 }}
                className="sign-in-kicker text-xs font-semibold uppercase tracking-[0.26em] text-[#789285]"
              >
                Private compound access
              </motion.p>
              <motion.h1
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="sign-in-title mt-3 max-w-xl font-heading text-[clamp(2.75rem,9vw,4.5rem)] font-semibold leading-[1.02] text-[#2C3E50] md:text-[clamp(3rem,5.2vw,4.8rem)]"
              >
                Welcome home
              </motion.h1>
              <motion.p
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="sign-in-hero-text mt-3 max-w-xl text-sm leading-6 text-[#4D5C66] md:mt-4 md:text-[0.95rem] md:leading-7 lg:text-base lg:leading-8"
              >
                Resident access opens the community feed, service desk, visitor parking, and private
                profile areas in one calm portal.
              </motion.p>
            </div>

            <div className="sign-in-status hidden gap-3 md:grid md:grid-cols-3 lg:max-w-3xl">
              {arrivalSignals.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + index * 0.05, duration: 0.34 }}
                    className="rounded-[1.1rem] border border-white/68 bg-white/66 p-3 shadow-lg shadow-[#2C3E50]/8 backdrop-blur-xl lg:rounded-[1.25rem] lg:p-4"
                  >
                    <Icon className="h-5 w-5 text-[#789285]" aria-hidden />
                    <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#7A92A3] lg:mt-5 lg:text-xs lg:tracking-[0.18em]">
                      {item.label}
                    </p>
                    <p className="mt-1 font-heading text-lg font-semibold text-[#2C3E50] lg:text-xl">
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="sign-in-panel flex items-center justify-center py-1 md:min-h-0 md:py-0">
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="sign-in-card w-full max-w-md rounded-[1.5rem] border border-[#D8D4CC] bg-white/90 p-4 shadow-2xl shadow-[#2C3E50]/16 backdrop-blur-xl sm:p-5 md:rounded-[1.65rem] md:p-5 lg:max-h-full lg:rounded-[1.75rem] lg:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#789285]">
                    Arrival Pass
                  </p>
                  <h2 className="mt-2 font-heading text-[1.9rem] font-semibold leading-tight md:text-[2.15rem]">
                    Resident access
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#6E6E6E]">
                    Use your registered resident username and email to continue.
                  </p>
                </div>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#F4F1EA] text-[#789285] md:h-11 md:w-11">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                </div>
              </div>

              <form className="mt-6 grid gap-4 md:mt-7" onSubmit={handleSubmit} noValidate>
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
                  {errors.username ? (
                    <span id="username-error" role="alert" className="text-sm text-red-700">
                      {errors.username}
                    </span>
                  ) : null}
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
                  {errors.email ? (
                    <span id="email-error" role="alert" className="text-sm text-red-700">
                      {errors.email}
                    </span>
                  ) : null}
                </label>

                {errors.form ? (
                  <p
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {errors.form}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="btn-primary min-h-11 w-full disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "loading" ? "Verifying resident access..." : "Enter Portal"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </form>

              <div className="sign-in-access-meta mt-5 rounded-[1.1rem] border border-[#D8D4CC] bg-[#F4F1EA]/84 p-3 md:mt-6 md:rounded-[1.25rem] md:p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#789285]">
                  Access includes
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2 md:mt-3">
                  {["Requests", "Announcements", "Parking", "Profile"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#D8D4CC] bg-white px-3 py-1 text-xs font-semibold text-[#4D5C66]"
                    >
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
