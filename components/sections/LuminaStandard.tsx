"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CarFront,
  Droplets,
  Footprints,
  Home,
  KeyRound,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trees,
  Wifi,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const easeOut = [0.22, 1, 0.36, 1] as const;
const HEADER_SAFE_OFFSET = 120;
const QUIET_PERIOD_MS = 120;
const WHEEL_TRIGGER_DELTA = 56;

type SlideConfig = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  cta?: {
    label: string;
    href: string;
  };
};

type NetworkNode = {
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  tone: string;
};

type ServiceTile = {
  label: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  className: string;
};

const slides: SlideConfig[] = [
  {
    eyebrow: "CONNECTED LIVING",
    title: "Protected without feeling restricted.",
    description:
      "Thoughtful technology and discreet security keep Lumina connected, monitored and easy to move through - from your front door to the community gate.",
    highlights: ["24/7 Security", "Smart Access", "Community Wi-Fi"],
  },
  {
    eyebrow: "CONSCIOUS LIVING",
    title: "A lighter footprint. A better place to live.",
    description:
      "Landscaped spaces, energy-conscious systems and thoughtful resource use make sustainability part of everyday life.",
    highlights: ["Green Corridors", "Clean Energy", "Walkable Community"],
  },
  {
    eyebrow: "RESIDENT SERVICES",
    title: "Everyday needs, handled simply.",
    description:
      "From reserving visitor parking to requesting maintenance or contacting concierge, essential resident services stay close at hand.",
    highlights: ["Concierge", "Parking", "Maintenance"],
    cta: {
      label: "Explore resident services",
      href: "#services",
    },
  },
];

const desktopNodes: NetworkNode[] = [
  { label: "Wi-Fi", icon: Wifi, x: 24, y: 14, tone: "bg-[#EEF3F5] text-[#2C3E50]" },
  { label: "Security", icon: ShieldCheck, x: 12, y: 36, tone: "bg-[#EEF3F1] text-[#2C3E50]" },
  { label: "Smart Lighting", icon: Lightbulb, x: 87, y: 27, tone: "bg-white text-[#2C3E50]" },
  { label: "Smart Access", icon: KeyRound, x: 18, y: 74, tone: "bg-[#F5F0E6] text-[#2C3E50]" },
  { label: "Concierge", icon: Bell, x: 82, y: 69, tone: "bg-[#EDF3F5] text-[#2C3E50]" },
  { label: "Visitor Access", icon: CarFront, x: 48, y: 88, tone: "bg-[#EEF3F1] text-[#2C3E50]" },
];

const mobileNodes: NetworkNode[] = [
  { label: "Wi-Fi", icon: Wifi, x: 30, y: 18, tone: "bg-[#EEF3F5] text-[#2C3E50]" },
  { label: "Security", icon: ShieldCheck, x: 18, y: 40, tone: "bg-[#EEF3F1] text-[#2C3E50]" },
  { label: "Lighting", icon: Lightbulb, x: 80, y: 30, tone: "bg-white text-[#2C3E50]" },
  { label: "Access", icon: KeyRound, x: 28, y: 75, tone: "bg-[#F5F0E6] text-[#2C3E50]" },
  { label: "Visitor", icon: CarFront, x: 75, y: 72, tone: "bg-[#EEF3F1] text-[#2C3E50]" },
];

const serviceTiles: ServiceTile[] = [
  {
    label: "Concierge",
    icon: Bell,
    image: "/img/reception.png",
    alt: "Lumina reception entrance and concierge arrival",
    className:
      "left-[6%] top-[8%] h-[34%] w-[41%] md:left-[8%] md:top-[10%] md:h-[33%] md:w-[38%]",
  },
  {
    label: "Visitor Parking",
    icon: CarFront,
    image: "/img/parking drive way.png",
    alt: "Lumina visitor parking and driveway approach",
    className:
      "right-[6%] top-[16%] h-[29%] w-[39%] md:right-[8%] md:top-[16%] md:h-[28%] md:w-[35%]",
  },
  {
    label: "Maintenance",
    icon: Wrench,
    image: "/img/exterior villa.png",
    alt: "Lumina villa exterior used for resident maintenance coordination",
    className:
      "left-[10%] bottom-[12%] h-[26%] w-[36%] md:left-[12%] md:bottom-[11%] md:h-[25%] md:w-[31%]",
  },
  {
    label: "Community Events",
    icon: CalendarDays,
    image: "/img/the rythm of the compound.png",
    alt: "Lumina community spaces prepared for shared events and gatherings",
    className:
      "right-[6%] bottom-[9%] h-[31%] w-[42%] md:right-[9%] md:bottom-[8%] md:h-[30%] md:w-[38%]",
  },
];

function getCopyMotion(
  delay: number,
  active: boolean,
  reduceMotion: boolean,
  distance = 14,
) {
  if (reduceMotion) {
    return {
      opacity: active ? 1 : 0.22,
      y: 0,
      transition: { duration: 0.18 },
    };
  }

  return {
    opacity: active ? 1 : 0.22,
    y: active ? 0 : distance,
    transition: {
      duration: 0.62,
      delay: active ? delay : 0,
      ease: easeOut,
    },
  };
}

function getChipMotion(index: number, active: boolean, reduceMotion: boolean) {
  if (reduceMotion) {
    return {
      opacity: active ? 1 : 0.22,
      y: 0,
      transition: { duration: 0.18 },
    };
  }

  return {
    opacity: active ? 1 : 0.22,
    y: active ? 0 : 10,
    transition: {
      duration: 0.48,
      delay: active ? 0.22 + index * 0.06 : 0,
      ease: easeOut,
    },
  };
}

function SlideCopy({
  slide,
  active,
  reduceMotion,
}: {
  slide: SlideConfig;
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="order-2 flex h-full min-h-0 flex-col justify-start md:order-2 md:justify-center">
      <motion.p
        animate={getCopyMotion(0, active, reduceMotion, 10)}
        className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8FA89B] sm:text-xs"
      >
        {slide.eyebrow}
      </motion.p>
      <motion.h3
        animate={getCopyMotion(0.08, active, reduceMotion)}
        className="mt-3 max-w-[13ch] font-heading font-semibold leading-[1.01] text-[#2C3E50] text-[clamp(1.85rem,3vw,3.85rem)] lg:max-w-[14ch]"
      >
        {slide.title}
      </motion.h3>
      <motion.p
        animate={getCopyMotion(0.16, active, reduceMotion)}
        className="mt-4 max-w-[40rem] text-[0.94rem] leading-6 text-[#6E6E6E] sm:mt-5 sm:text-[1rem] sm:leading-7 lg:max-w-[36rem] lg:text-[1.06rem] lg:leading-8 xl:max-w-[40rem]"
      >
        {slide.description}
      </motion.p>
      <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
        {slide.highlights.map((item, index) => (
          <motion.span
            key={item}
            animate={getChipMotion(index, active, reduceMotion)}
            className="rounded-full border border-[#D8D4CC] bg-[#FBFAF6]/84 px-4 py-2.5 text-sm font-semibold text-[#2C3E50]"
          >
            {item}
          </motion.span>
        ))}
      </div>
      {slide.cta ? (
        <motion.div animate={getCopyMotion(0.3, active, reduceMotion)} className="mt-6 sm:mt-8">
          <a href={slide.cta.href} className="btn-secondary inline-flex items-center gap-2">
            {slide.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>
      ) : null}
    </div>
  );
}

function ConnectedLivingVisual({
  active,
  compact,
  reduceMotion,
}: {
  active: boolean;
  compact: boolean;
  reduceMotion: boolean;
}) {
  const nodes = compact ? mobileNodes : desktopNodes;
  const pulseTargets = nodes.filter((node) =>
    ["Security", "Wi-Fi", "Smart Access", "Access"].includes(node.label),
  );

  return (
    <div className="order-1 flex h-full min-h-[248px] w-full min-w-0 items-center justify-center sm:min-h-[280px] md:order-1 md:min-h-0">
      <div className="relative h-full min-h-[248px] w-full max-w-[760px] overflow-hidden rounded-[1.8rem] border border-[#D8D4CC] bg-[linear-gradient(180deg,rgba(252,251,247,0.94),rgba(244,241,234,0.98))] shadow-sm shadow-[#2C3E50]/8 sm:min-h-[280px] sm:rounded-[2rem] md:min-h-0 md:max-h-[560px] lg:max-w-[820px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(143,168,155,0.16),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(122,146,163,0.14),transparent_24%),radial-gradient(circle_at_52%_88%,rgba(200,169,126,0.12),transparent_20%)]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
          <motion.path
            d="M18 34C25 24 36 18 48 17"
            fill="none"
            stroke="#C7D4DA"
            strokeWidth="0.35"
            strokeLinecap="round"
            animate={reduceMotion ? { opacity: 0.9, pathLength: 1 } : { opacity: active ? 0.9 : 0.16, pathLength: active ? 1 : 0.2 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
          />
          <motion.path
            d="M57 16C70 17 80 24 86 33"
            fill="none"
            stroke="#B8CBBE"
            strokeWidth="0.35"
            strokeLinecap="round"
            animate={reduceMotion ? { opacity: 0.9, pathLength: 1 } : { opacity: active ? 0.85 : 0.16, pathLength: active ? 1 : 0.2 }}
            transition={{ duration: 0.8, delay: 0.18, ease: easeOut }}
          />
          <motion.path
            d="M18 72C26 80 38 85 50 85C63 85 74 80 82 70"
            fill="none"
            stroke="#D6C2A3"
            strokeWidth="0.32"
            strokeLinecap="round"
            animate={reduceMotion ? { opacity: 0.8, pathLength: 1 } : { opacity: active ? 0.78 : 0.16, pathLength: active ? 1 : 0.2 }}
            transition={{ duration: 0.86, delay: 0.24, ease: easeOut }}
          />
          {nodes.map((node, index) => (
            <motion.line
              key={node.label}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke={index === nodes.length - 1 ? "#D6C2A3" : index % 2 === 0 ? "#C3D3D9" : "#BFCFC6"}
              strokeWidth="0.36"
              strokeLinecap="round"
              animate={
                reduceMotion
                  ? { opacity: 0.9, pathLength: 1 }
                  : { opacity: active ? 0.9 : 0, pathLength: active ? 1 : 0 }
              }
              transition={{
                duration: 0.66,
                delay: reduceMotion ? 0 : 0.18 + index * 0.05,
                ease: easeOut,
              }}
            />
          ))}
          {pulseTargets.slice(0, compact ? 2 : 3).map((node, index) => (
            <motion.circle
              key={`${node.label}-pulse`}
              r="0.9"
              fill={index === 0 ? "#7A92A3" : index === 1 ? "#8FA89B" : "#C8A97E"}
              animate={
                reduceMotion || !active
                  ? { opacity: 0 }
                  : {
                      opacity: [0, 0.95, 0.95, 0],
                      cx: [50, (50 + node.x) / 1.45, node.x],
                      cy: [50, (50 + node.y) / 1.45, node.y],
                    }
              }
              transition={{
                duration: 6.4 + index * 0.8,
                delay: index * 1.1,
                repeat: reduceMotion || !active ? 0 : Infinity,
                repeatDelay: 1.8,
                ease: "linear",
              }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-10 h-[28%] w-[28%] min-h-[108px] min-w-[108px] max-h-[176px] max-w-[176px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4D8D0] bg-[#FCFBF7] shadow-[0_18px_38px_rgba(44,62,80,0.10)] lg:min-h-[126px] lg:min-w-[126px]"
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: active ? 1 : 0.35, scale: active ? 1 : 0.95 }
          }
          transition={{ duration: 0.64, ease: easeOut }}
        >
          <div className="flex h-full flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(122,146,163,0.08),transparent_46%)] px-3 text-center">
            <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#2C3E50] text-white sm:h-14 sm:w-14">
              <Home className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              <div className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#8FA89B] text-white shadow-sm">
                <ShieldCheck className="h-3 w-3" aria-hidden />
              </div>
            </div>
            <p className="mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#7A92A3]">
              LUMINA
            </p>
            <p className="mt-1 font-heading text-sm font-semibold text-[#2C3E50] sm:text-base">
              Residence
            </p>
          </div>
        </motion.div>

        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.label}
              className="absolute"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={
                reduceMotion
                  ? { opacity: active ? 1 : 0.6, x: 0, y: 0, scale: 1 }
                  : {
                      opacity: active ? 1 : 0,
                      x: active ? 0 : (50 - node.x) * 0.26,
                      y: active ? 0 : (50 - node.y) * 0.26,
                      scale: active ? 1 : 0.94,
                    }
              }
              transition={{
                duration: 0.62,
                delay: reduceMotion ? 0 : 0.28 + index * 0.05,
                ease: easeOut,
              }}
            >
              <div
                className={`-translate-x-1/2 -translate-y-1/2 rounded-[1.15rem] border border-[#D8D4CC] ${node.tone} min-w-[76px] px-2.5 py-2 text-center shadow-sm shadow-[#2C3E50]/6 sm:min-w-[88px] sm:px-3 sm:py-2.5 lg:min-w-[104px] lg:px-3.5 lg:py-3`}
              >
                <Icon className="mx-auto h-4 w-4 text-[#2C3E50]" aria-hidden />
                <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#5D7381] sm:text-[0.62rem]">
                  {node.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function EcoPlanVisual({
  active,
  compact,
  reduceMotion,
}: {
  active: boolean;
  compact: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="order-1 flex h-full min-h-[248px] w-full min-w-0 items-center justify-center sm:min-h-[280px] md:order-1 md:min-h-0">
      <div className="relative h-full min-h-[248px] w-full max-w-[760px] overflow-hidden rounded-[1.8rem] border border-[#D8D4CC] bg-[linear-gradient(180deg,rgba(251,250,245,0.94),rgba(244,241,234,0.98))] shadow-sm shadow-[#2C3E50]/8 sm:min-h-[280px] sm:rounded-[2rem] md:min-h-0 md:max-h-[560px] lg:max-w-[820px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(143,168,155,0.16),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(200,169,126,0.13),transparent_22%),radial-gradient(circle_at_74%_76%,rgba(122,146,163,0.12),transparent_22%)]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
          {[
            "M13 33C24 25 36 25 47 31C57 36 68 37 83 30",
            "M11 42C23 35 37 35 48 40C58 45 70 45 84 38",
            "M18 58C28 50 40 49 52 55C63 61 72 61 82 55",
            "M22 68C34 61 45 61 58 66C69 70 77 70 84 64",
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke={index < 2 ? "#C3D4C7" : "#CAD6DC"}
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeOpacity="0.62"
              animate={
                reduceMotion
                  ? { opacity: 1, pathLength: 1 }
                  : { opacity: active ? 1 : 0.14, pathLength: active ? 1 : 0 }
              }
              transition={{
                duration: 0.74,
                delay: reduceMotion ? 0 : 0.12 + index * 0.08,
                ease: easeOut,
              }}
            />
          ))}
          <motion.path
            d="M24 36C35 31 44 32 54 39C62 45 68 54 73 63C76 68 80 72 85 73"
            fill="none"
            stroke="#789285"
            strokeWidth="0.82"
            strokeLinecap="round"
            strokeDasharray="2 2.4"
            animate={
              reduceMotion
                ? { opacity: 0.9, pathLength: 1 }
                : { opacity: active ? 0.9 : 0.18, pathLength: active ? 1 : 0.2 }
            }
            transition={{ duration: 0.94, delay: 0.28, ease: easeOut }}
          />
          <motion.circle
            r="1"
            fill="#789285"
            animate={
              reduceMotion || !active
                ? { opacity: 0 }
                : {
                    opacity: [0, 0.9, 0.9, 0],
                    cx: [24, 45, 65, 85],
                    cy: [36, 35, 53, 73],
                  }
            }
            transition={{
              duration: 7.2,
              ease: "linear",
              repeat: reduceMotion || !active ? 0 : Infinity,
              repeatDelay: 1.2,
            }}
          />
        </svg>

        <motion.div
          className="absolute left-[6%] top-[10%] h-[40%] w-[54%] rounded-[42%_58%_55%_45%/48%_42%_58%_52%] border border-[#CFE0D6] bg-[#E8F0E8]/92"
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: active ? 1 : 0.22, scale: active ? 1 : 0.95, y: active ? 0 : 14 }
          }
          transition={{ duration: 0.72, ease: easeOut }}
        >
          <div className="absolute left-[14%] top-[17%] flex items-center gap-2 rounded-full bg-white/78 px-3 py-2 text-[#789285]">
            <Trees className="h-4 w-4" aria-hidden />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em]">GREEN SPACE</span>
          </div>
          {!compact ? (
            <p className="absolute left-[15%] top-[31%] text-xs text-[#6E6E6E]">Landscaped corridors</p>
          ) : null}
        </motion.div>

        <motion.div
          className="absolute right-[6%] top-[16%] h-[28%] w-[35%] rounded-[50%_50%_38%_62%/45%_38%_62%_55%] border border-[#D9D6C8] bg-[#F5F0E6]/92"
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: active ? 1 : 0.22, scale: active ? 1 : 0.95, y: active ? 0 : 16 }
          }
          transition={{ duration: 0.72, delay: 0.08, ease: easeOut }}
        >
          <div className="absolute left-[15%] top-[18%] flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[#7A92A3]">
            <SunMedium className="h-4 w-4" aria-hidden />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em]">CLEAN ENERGY</span>
          </div>
          {!compact ? (
            <p className="absolute left-[16%] top-[36%] text-xs text-[#6E6E6E]">Efficient systems</p>
          ) : null}
        </motion.div>

        <motion.div
          className="absolute bottom-[10%] left-[18%] h-[31%] w-[56%] rounded-[56%_44%_50%_50%/44%_54%_46%_56%] border border-[#D2DEE4] bg-[#EEF3F5]/94"
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: active ? 1 : 0.22, scale: active ? 1 : 0.95, y: active ? 0 : 14 }
          }
          transition={{ duration: 0.72, delay: 0.16, ease: easeOut }}
        >
          <div className="absolute left-[14%] top-[18%] flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[#7A92A3]">
            <Droplets className="h-4 w-4" aria-hidden />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em]">WATER CARE</span>
          </div>
          {!compact ? (
            <p className="absolute left-[15%] top-[37%] text-xs text-[#6E6E6E]">Thoughtful use</p>
          ) : null}
        </motion.div>

        <motion.div
          className="absolute left-[58%] top-[58%] flex items-center gap-2 rounded-full border border-[#D8D4CC] bg-white/82 px-3 py-2 text-[#789285] shadow-sm"
          animate={
            reduceMotion
              ? { opacity: active ? 1 : 0.4, scale: 1 }
              : { opacity: active ? 1 : 0.18, scale: active ? 1 : 0.95 }
          }
          transition={{ duration: 0.56, delay: 0.22, ease: easeOut }}
        >
          <Footprints className="h-4 w-4" aria-hidden />
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em]">WALKABLE ROUTES</span>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceFlowVisual({
  active,
  compact,
  reduceMotion,
}: {
  active: boolean;
  compact: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="order-1 flex h-full min-h-[248px] w-full min-w-0 items-center justify-center sm:min-h-[280px] md:order-1 md:min-h-0">
      <div className="relative h-full min-h-[248px] w-full max-w-[760px] overflow-hidden rounded-[1.8rem] border border-[#D8D4CC] bg-[linear-gradient(180deg,rgba(251,250,246,0.94),rgba(244,241,234,0.98))] shadow-sm shadow-[#2C3E50]/8 sm:min-h-[280px] sm:rounded-[2rem] md:min-h-0 md:max-h-[560px] lg:max-w-[820px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(122,146,163,0.14),transparent_22%),radial-gradient(circle_at_82%_78%,rgba(200,169,126,0.13),transparent_22%)]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
          {[
            "M34 28C42 37 46 43 50 50",
            "M67 32C60 40 56 44 50 50",
            "M35 68C41 61 44 57 50 50",
            "M67 69C60 62 56 58 50 50",
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke={index === 3 ? "#C8A97E" : "#C2CDD4"}
              strokeWidth="0.42"
              strokeDasharray="2 2.2"
              strokeLinecap="round"
              animate={
                reduceMotion
                  ? { opacity: 0.88, pathLength: 1 }
                  : { opacity: active ? 0.88 : 0, pathLength: active ? 1 : 0 }
              }
              transition={{
                duration: 0.56,
                delay: reduceMotion ? 0 : 0.26 + index * 0.08,
                ease: easeOut,
              }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-[1] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8D4CC] bg-white/92 shadow-sm shadow-[#2C3E50]/8"
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: active ? 1 : 0.2, scale: active ? 1 : 0.9 }
          }
          transition={{ duration: 0.54, delay: 0.22, ease: easeOut }}
        >
          <div className="grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_top,rgba(122,146,163,0.08),transparent_44%)] text-[#2C3E50]">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
        </motion.div>

        {serviceTiles.map((tile, index) => {
          const Icon = tile.icon;
          const fromOffsets = [
            { x: -22, y: -16 },
            { x: 24, y: -16 },
            { x: -18, y: 18 },
            { x: 20, y: 18 },
          ][index];

          return (
            <motion.div
              key={tile.label}
              className={`absolute overflow-hidden rounded-[1.45rem] border border-white/44 shadow-[0_16px_36px_rgba(44,62,80,0.14)] ${tile.className}`}
              animate={
                reduceMotion
                  ? { opacity: 1, x: 0, y: 0 }
                  : {
                      opacity: active ? 1 : 0.18,
                      x: active ? 0 : fromOffsets.x,
                      y: active ? 0 : fromOffsets.y,
                    }
              }
              transition={{
                duration: 0.58,
                delay: reduceMotion ? 0 : 0.06 + index * 0.09,
                ease: easeOut,
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 26vw, 46vw"
                  className="object-cover transition duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(44,62,80,0.78))]" />
                <div className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/88 text-[#2C3E50] shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2.5 text-white sm:p-3 lg:p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                    Service
                  </p>
                  <p className={`${compact ? "text-sm" : "text-base"} mt-1.5 font-heading font-semibold leading-tight`}>
                    {tile.label}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SlideVisual({
  index,
  active,
  compact,
  reduceMotion,
}: {
  index: number;
  active: boolean;
  compact: boolean;
  reduceMotion: boolean;
}) {
  if (index === 0) {
    return (
      <ConnectedLivingVisual active={active} compact={compact} reduceMotion={reduceMotion} />
    );
  }

  if (index === 1) {
    return <EcoPlanVisual active={active} compact={compact} reduceMotion={reduceMotion} />;
  }

  return <ServiceFlowVisual active={active} compact={compact} reduceMotion={reduceMotion} />;
}

export function LuminaStandard() {
  const reduceMotion = !!useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndexRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const lastDirectionRef = useRef<1 | -1 | 0>(0);
  const isTransitioningRef = useRef(false);
  const wheelLockedRef = useRef(false);
  const transitionFinishedRef = useRef(true);
  const wheelQuietRef = useRef(true);
  const quietTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    swiperRef.current = swiper;
  }, [swiper]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const stage = stageRef.current;
    if (!stage) return;
    const stageEl = stage;

    function isStageEngaged() {
      const rect = stageEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const topAligned = rect.top <= HEADER_SAFE_OFFSET + 56;
      const bottomVisible = rect.bottom >= Math.min(viewportHeight * 0.7, HEADER_SAFE_OFFSET + 340);
      return topAligned && bottomVisible;
    }

    function tryUnlock() {
      if (transitionFinishedRef.current && wheelQuietRef.current) {
        wheelLockedRef.current = false;
        accumulatedDeltaRef.current = 0;
        lastDirectionRef.current = 0;
      }
    }

    function markWheelQuietLater() {
      if (quietTimerRef.current) {
        clearTimeout(quietTimerRef.current);
      }
      quietTimerRef.current = setTimeout(() => {
        wheelQuietRef.current = true;
        tryUnlock();
      }, QUIET_PERIOD_MS);
    }

    function onWheel(event: WheelEvent) {
      const currentSwiper = swiperRef.current;
      if (!currentSwiper) return;

      if (!isStageEngaged()) return;

      const deltaY = event.deltaY;
      if (Math.abs(deltaY) < 4) return;

      const direction = deltaY > 0 ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const atTopEdge = currentIndex === 0 && direction < 0;
      const atBottomEdge = currentIndex === slides.length - 1 && direction > 0;

      if (atTopEdge || atBottomEdge) return;

      event.preventDefault();

      wheelQuietRef.current = false;
      markWheelQuietLater();

      if (wheelLockedRef.current || isTransitioningRef.current || currentSwiper.animating) {
        return;
      }

      if (lastDirectionRef.current !== 0 && lastDirectionRef.current !== direction) {
        accumulatedDeltaRef.current = 0;
      }

      lastDirectionRef.current = direction;
      accumulatedDeltaRef.current += deltaY;

      if (Math.abs(accumulatedDeltaRef.current) < WHEEL_TRIGGER_DELTA) {
        return;
      }

      wheelLockedRef.current = true;
      transitionFinishedRef.current = false;
      accumulatedDeltaRef.current = 0;

      if (direction > 0) {
        currentSwiper.slideNext();
      } else {
        currentSwiper.slidePrev();
      }
    }

    stageEl.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stageEl.removeEventListener("wheel", onWheel);
      if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
    };
  }, [isDesktop]);

  const pagination = useMemo(() => slides.map((_, index) => index), []);

  return (
    <section
      id="lumina-standard"
      className="lumina-standard-section relative overflow-hidden bg-[#F8F5EE] px-4 pb-14 pt-[calc(var(--lumina-header-safe-offset)+0.5rem)] scroll-mt-[var(--lumina-header-safe-offset)] sm:pb-16 sm:pt-[calc(var(--lumina-header-safe-offset)+0.75rem)] lg:pb-18 lg:pt-[calc(var(--lumina-header-safe-offset)+0.25rem)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_14%,rgba(122,146,163,0.12),transparent_24%),radial-gradient(circle_at_20%_84%,rgba(143,168,155,0.08),transparent_22%)]" />
        <div className="absolute bottom-0 right-0 h-[48%] w-[62%] rounded-tl-[8rem] bg-[linear-gradient(180deg,rgba(220,229,232,0.12),rgba(220,229,232,0.28))]" />
      </div>

      <div className="relative mx-auto w-full max-w-[min(96vw,var(--lumina-page-max))]">
        <div className="mb-4 max-w-[52rem] md:mb-5 lg:mb-6 xl:max-w-[56rem]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8FA89B] sm:text-xs">
            THE LUMINA STANDARD
          </p>
          <h2 className="mt-3 max-w-[15ch] font-heading font-semibold leading-[1.02] text-[#2C3E50] text-[clamp(2.5rem,4vw,4.25rem)] lg:max-w-[13ch]">
            What the community is designed to support.
          </h2>
        </div>

        <div
          ref={stageRef}
          className="lumina-standard-stage relative mx-auto h-[clamp(500px,78vw,660px)] max-w-[430px] min-w-0 overflow-hidden pr-0 sm:h-[clamp(540px,74vw,700px)] sm:max-w-[520px] md:h-[clamp(560px,66vw,700px)] md:max-w-none md:pr-10 lg:h-[clamp(500px,48vw,640px)] lg:pr-12 xl:h-[clamp(540px,44vw,680px)]"
        >
          <Swiper
            modules={[A11y]}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
            onSlideChangeTransitionStart={() => {
              isTransitioningRef.current = true;
              transitionFinishedRef.current = false;
            }}
            onSlideChangeTransitionEnd={() => {
              isTransitioningRef.current = false;
              transitionFinishedRef.current = true;
              if (wheelQuietRef.current) {
                wheelLockedRef.current = false;
                accumulatedDeltaRef.current = 0;
                lastDirectionRef.current = 0;
              }
            }}
            direction="vertical"
            slidesPerView={1}
            speed={800}
            threshold={8}
            allowTouchMove
            preventInteractionOnTransition
            watchOverflow
            loop={false}
            className="h-full overflow-hidden [&_.swiper-slide]:!h-full [&_.swiper-wrapper]:h-full [&_.swiper-wrapper]:items-stretch"
          >
            {slides.map((slide, index) => {
              const active = activeIndex === index;
              const compact = !isDesktop;

              return (
                <SwiperSlide key={slide.title} className="!h-full">
                  <div className="grid h-full min-h-0 min-w-0 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-3 px-1 py-3 sm:grid-rows-[auto_minmax(0,1fr)] sm:gap-4 sm:px-2 sm:py-4 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:grid-rows-1 md:items-center md:gap-6 md:px-2 md:py-3 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:gap-7 lg:px-3 lg:py-4 xl:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] xl:gap-8 xl:px-4 xl:py-5">
                    <SlideCopy slide={slide} active={active} reduceMotion={reduceMotion} />
                    <SlideVisual
                      index={index}
                      active={active}
                      compact={compact}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:flex-col md:-translate-y-1/2 md:translate-x-0 md:gap-2.5"
            aria-label="Lumina standard slide pagination"
          >
            {pagination.map((index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => swiper?.slideTo(index)}
                  className="flex h-4 w-[34px] items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 md:h-[40px] md:w-4"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={active ? "true" : undefined}
                >
                  <motion.span
                    animate={{
                      width: isDesktop ? 5.5 : active ? 30 : 6,
                      height: isDesktop ? (active ? 30 : 6) : 5.5,
                      backgroundColor: active ? "#7A92A3" : "#D8D4CC",
                    }}
                    transition={{ duration: 0.34, ease: easeOut }}
                    className="block rounded-full"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
