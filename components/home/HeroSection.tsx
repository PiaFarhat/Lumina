"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Car, ConciergeBell, Sparkles } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/lumina-data";
import { RequestKind } from "../forms/RequestModal";

export function HeroSection({ onRequest }: { onRequest: (kind: RequestKind) => void }) {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-14 pt-28 sm:pb-20 sm:pt-40 lg:min-h-screen lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#D8D4CC] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#789285]">
            <Sparkles className="h-4 w-4" aria-hidden />
            Private Community Portal
          </p>
          <h1 className="mt-7 font-heading text-4xl font-semibold leading-[1.08] tracking-normal text-[#2C3E50] sm:text-5xl lg:text-7xl">
            A clearer way to live together.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6E6E6E]">
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
        <div className="relative min-h-[560px] sm:min-h-[610px]">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-8 h-[430px] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-[#2C3E50]/12 sm:inset-x-6 sm:h-[460px] sm:rounded-[3rem]"
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
            <div className="absolute bottom-5 left-5 max-w-[360px] rounded-[1.5rem] border border-white/28 bg-white/88 p-4 shadow-xl shadow-[#2C3E50]/12 backdrop-blur-md sm:max-w-[420px]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#789285]">Villa 18</p>
              <p className="mt-2 font-heading text-xl font-semibold text-[#2C3E50] sm:text-2xl">Private garden residence</p>
              <p className="mt-2 hidden text-sm leading-6 text-[#6E6E6E] sm:block">Architecture, landscape, and service flow in one resident view.</p>
            </div>
          </motion.div>
          {[
            { label: "Visitor Parking", value: "18 Available", icon: Car, className: "left-2 top-0 sm:left-0" },
            { label: "Concierge", value: "Available Now", icon: ConciergeBell, className: "right-2 top-28 sm:right-0 sm:top-32" },
            { label: "Community Event", value: "Friday 7 PM", icon: CalendarDays, className: "right-4 top-[410px] sm:right-6 sm:top-[430px]" },
          ].map((widget, index) => {
            const Icon = widget.icon;
            return (
              <motion.div
                key={widget.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.12 }}
                className={`absolute ${widget.className} max-w-[210px] rounded-[1.25rem] border border-[#D8D4CC] bg-white p-3 shadow-xl shadow-[#2C3E50]/10 sm:max-w-none sm:rounded-[1.5rem] sm:p-5`}
              >
                <Icon className="mb-4 h-5 w-5 text-[#8FA89B]" aria-hidden />
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[#7A92A3] sm:text-xs">{widget.label}</p>
                <p className="mt-2 font-heading text-lg font-semibold text-[#2C3E50] sm:text-xl">{widget.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
