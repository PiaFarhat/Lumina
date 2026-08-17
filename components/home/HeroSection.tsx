"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Car, ConciergeBell, Sparkles } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/lumina-data";
import { RequestKind } from "../forms/RequestModal";

export function HeroSection({ onRequest }: { onRequest: (kind: RequestKind) => void }) {
  const reduceMotion = !!useReducedMotion();
  const heroWidgets: Array<{
    label: string;
    value: string;
    icon: typeof Car;
    className: string;
  }> = [
    {
      label: "Visitor Parking",
      value: "18 Available",
      icon: Car,
      className: "left-2 top-0 sm:left-0",
    },
    {
      label: "Concierge",
      value: "Available Now",
      icon: ConciergeBell,
      className: "right-2 top-[clamp(6.75rem,12vw,8rem)] sm:right-0",
    },
    {
      label: "Community Event",
      value: "Friday 7 PM",
      icon: CalendarDays,
      className: "right-4 top-[clamp(20rem,39vw,27rem)] sm:right-6",
    },
  ];

  return (
    <section
      id="home"
      className="lumina-hero relative overflow-hidden bg-[var(--background)] px-4 pb-12 pt-[calc(var(--lumina-header-safe-offset)+0.25rem)] text-[var(--foreground)] sm:pb-16 sm:pt-[calc(var(--lumina-header-safe-offset)+1.25rem)] lg:pb-18 lg:pt-[calc(var(--lumina-header-safe-offset)+0.75rem)] xl:pb-20"
    >
      <div className="mx-auto grid w-full max-w-[min(96vw,var(--lumina-page-max))] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            <Sparkles className="h-4 w-4" aria-hidden />
            Private Community Portal
          </p>
          <h1 className="mt-7 font-heading text-4xl font-semibold leading-[1.08] tracking-normal text-[var(--foreground)] sm:text-5xl lg:text-7xl">
            A clearer way to live together.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Lumina brings villa services, community notices, guest access, parking, and concierge care into one calm residential experience.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onRequest("maintenance")} className="btn-primary">
              Request a Service
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <a href="#overview" className="btn-secondary justify-center">
              Explore Community
            </a>
          </div>
        </motion.div>
        <div className="relative min-h-[clamp(430px,58vw,560px)] sm:min-h-[clamp(470px,52vw,600px)] lg:min-h-[clamp(430px,38vw,560px)]">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, scale: 1, y: [0, -2, 0] }
            }
            transition={
              reduceMotion
                ? { duration: 0.9, ease: "easeOut" }
                : {
                  opacity: { duration: 0.9, ease: "easeOut" },
                  scale: { duration: 0.9, ease: "easeOut" },
                  y: { duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.2 },
                }
            }
            className="absolute inset-x-0 top-5 h-[clamp(330px,38vw,420px)] overflow-hidden rounded-[2rem] border border-[color:color-mix(in_srgb,var(--surface)_72%,transparent)] bg-[color:color-mix(in_srgb,var(--surface)_92%,transparent)] shadow-2xl shadow-[#2C3E50]/12 will-change-transform sm:inset-x-6 sm:top-6 sm:h-[clamp(360px,34vw,450px)] sm:rounded-[3rem]"
          >
            <Image
              src={images.villa}
              alt="Modern Lumina villa exterior with landscaped garden and private driveway"
              fill
              priority
              loading="eager"
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,62,80,0.04),rgba(44,62,80,0.38))]" />
            <div className="absolute bottom-5 left-5 max-w-[360px] rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--surface)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--surface)_88%,transparent)] p-4 shadow-xl shadow-[#2C3E50]/12 backdrop-blur-md sm:max-w-[420px]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">Villa 18</p>
              <p className="mt-2 font-heading text-xl font-semibold text-[var(--foreground)] sm:text-2xl">Private garden residence</p>
              <p className="mt-2 hidden text-sm leading-6 text-[var(--muted)] sm:block">Architecture, landscape, and service flow in one resident view.</p>
            </div>
          </motion.div>
          {heroWidgets.map((widget, index) => {
            const Icon = widget.icon;
            return (
              <motion.div
                key={widget.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.25 + index * 0.12, duration: 0.55, ease: "easeOut" }}
                className={`absolute z-10 ${widget.className} max-w-[210px] rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xl shadow-[#2C3E50]/10 will-change-transform sm:max-w-none sm:rounded-[1.5rem] sm:p-5`}
              >
                <motion.div
                  animate={reduceMotion ? { y: 0 } : { y: [0, -0.75, 0] }}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : {
                          duration: 10.5 + index * 0.8,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                          delay: 1 + index * 0.18,
                        }
                  }
                >
                  <Icon className="mb-4 h-5 w-5 text-[var(--accent)]" aria-hidden />
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted-strong)] sm:text-xs">{widget.label}</p>
                  <p className="mt-2 font-heading text-lg font-semibold text-[var(--foreground)] sm:text-xl">{widget.value}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
