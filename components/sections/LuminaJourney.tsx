"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/lumina-data";

const easeOut = [0.22, 1, 0.36, 1] as const;

type JourneyMilestone = {
  year: string;
  category: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
};

const milestones: JourneyMilestone[] = [
  {
    year: "2021",
    category: "THE VISION",
    label: "Vision",
    title: "A quieter way of living begins.",
    description:
      "Lumina started with a simple idea: create a private residential community where architecture, landscape and everyday services work together.",
    detail: "Planning / Architecture / Landscape",
    image: images.villa,
    imageAlt:
      "Lumina private residence exterior framed by landscaped planting and a calm arrival drive",
  },
  {
    year: "2022",
    category: "TAKING SHAPE",
    label: "Groundbreaking",
    title: "From concept to community.",
    description:
      "The first spaces began to take form, translating the original vision into residences, landscaped streets and shared destinations.",
    detail: "Residences / Infrastructure / Arrival",
    image: "/img/event-sections/arrival-gate.png",
    imageAlt: "Lumina arrival gate and entry architecture introducing the community",
  },
  {
    year: "2023",
    category: "PRIVATE RESIDENCES",
    label: "Residences",
    title: "Homes designed around everyday life.",
    description:
      "Private villas became the foundation of Lumina - balancing generous living spaces, privacy and a strong connection to the surrounding landscape.",
    detail: "Private Living / Architecture / Comfort",
    image: images.villa,
    imageAlt: "Modern Lumina villa exterior with landscaped frontage and sheltered parking",
  },
  {
    year: "2024",
    category: "SHARED SPACES",
    label: "Shared Spaces",
    title: "A place to meet, recharge and belong.",
    description:
      "Wellness, pool and community spaces expanded life beyond the villa, creating places for residents to slow down, connect and spend time together.",
    detail: "Wellness / Community / Recreation",
    image: images.clubhouse,
    imageAlt: "Lumina pool and clubhouse terrace prepared for resident wellness and gathering",
  },
  {
    year: "2025",
    category: "RESIDENT SERVICES",
    label: "Resident Services",
    title: "Everyday support becomes part of the experience.",
    description:
      "Concierge, visitor access, parking and maintenance services brought everyday resident needs into one considered community flow.",
    detail: "Concierge / Access / Maintenance",
    image: images.reception,
    imageAlt: "Lumina reception and concierge setting representing resident support services",
  },
  {
    year: "2026",
    category: "LUMINA TODAY",
    label: "Lumina Today",
    title: "A connected community, fully in motion.",
    description:
      "Today, Lumina brings together private living, shared spaces and resident services in one calm and connected environment.",
    detail: "Living / Services / Community",
    image: images.compoundRhythm,
    imageAlt: "Lumina landscaped community pathways and shared outdoor rhythm across the compound",
  },
];

export function LuminaJourney() {
  const MIN_PROGRESS_WIDTH = 12;
  const reduceMotion = !!useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [trackBounds, setTrackBounds] = useState({ left: 0, width: 0 });
  const [progress, setProgress] = useState({ left: 0, width: MIN_PROGRESS_WIDTH });
  const railViewportRef = useRef<HTMLDivElement | null>(null);
  const yearRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const activeMilestone = milestones[activeIndex];
  const direction = activeIndex >= previousIndex ? 1 : -1;

  useEffect(() => {
    const viewport = railViewportRef.current;
    const currentButton = yearRefs.current[activeIndex];
    if (!viewport || !currentButton) return;

    const targetLeft =
      currentButton.offsetLeft - (viewport.clientWidth - currentButton.offsetWidth) / 2;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const clampedLeft = Math.max(0, Math.min(targetLeft, maxScroll));

    viewport.scrollTo({
      left: clampedLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reduceMotion]);

  useEffect(() => {
    function updateProgress() {
      const lineElement = lineRef.current;
      const firstItem = yearRefs.current[0];
      const activeItem = yearRefs.current[activeIndex];
      const lastItem = yearRefs.current[milestones.length - 1];

      if (!lineElement || !firstItem || !activeItem || !lastItem) {
        return;
      }

      const lineRect = lineElement.getBoundingClientRect();
      const firstRect = firstItem.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();
      const firstCenter = firstRect.left + firstRect.width / 2 - lineRect.left;
      const activeCenter = activeRect.left + activeRect.width / 2 - lineRect.left;
      const lastCenter = lastRect.left + lastRect.width / 2 - lineRect.left;
      const trackWidth = Math.max(lastCenter - firstCenter, 0);

      setTrackBounds({
        left: firstCenter,
        width: trackWidth,
      });
      setProgress({
        left: firstCenter,
        width: Math.max(activeCenter - firstCenter, MIN_PROGRESS_WIDTH),
      });
    }

    const raf = window.requestAnimationFrame(updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateProgress);
    };
  }, [activeIndex]);

  function goToIndex(index: number) {
    if (index === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
  }

  function goPrevious() {
    if (activeIndex === 0) return;
    setPreviousIndex(activeIndex);
    setActiveIndex((current) => current - 1);
  }

  function goNext() {
    if (activeIndex === milestones.length - 1) return;
    setPreviousIndex(activeIndex);
    setActiveIndex((current) => current + 1);
  }

  return (
    <section className="relative overflow-x-hidden overflow-y-hidden bg-[var(--surface-muted)] px-4 pb-14 pt-[calc(var(--lumina-header-safe-offset)+0.75rem)] text-[var(--foreground)] scroll-mt-[var(--lumina-header-safe-offset)] sm:px-5 sm:pb-16 sm:pt-[calc(var(--lumina-header-safe-offset)+1rem)] lg:px-8 lg:pb-18 lg:pt-[calc(var(--lumina-header-safe-offset)+0.75rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[22%] right-0 hidden w-[42%] rounded-[56px] border border-[#7A92A3]/10 bg-[linear-gradient(145deg,rgba(122,146,163,0.075),rgba(143,168,155,0.035))] lg:block xl:w-[44%]"
        style={{
          clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 28%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[28%] hidden h-[46%] w-[34%] opacity-[0.04] lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(122,146,163,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(122,146,163,0.45) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[min(96vw,var(--lumina-page-max))]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[52rem]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-xs">
              OUR JOURNEY
            </p>
            <h2 className="mt-3 max-w-[13ch] font-heading text-[clamp(2rem,3.8vw,4.15rem)] font-semibold leading-[1.02] text-[var(--foreground)]">
              How Lumina came to life.
            </h2>
            <p className="mt-4 max-w-[42rem] text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.05rem]">
              From an architectural vision to a connected residential community, each milestone
              shaped the way Lumina is experienced today.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end lg:self-auto">
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeIndex === 0}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_85%,transparent)] text-[var(--foreground)] transition duration-200 hover:-translate-y-px hover:border-[var(--accent)] hover:bg-[var(--surface-soft)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-[var(--border)] disabled:hover:bg-[color:color-mix(in_srgb,var(--surface)_85%,transparent)]"
              aria-label="Previous milestone"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_85%,transparent)] text-[var(--foreground)] transition duration-200 hover:-translate-y-px hover:border-[var(--accent)] hover:bg-[var(--surface-soft)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-[var(--border)] disabled:hover:bg-[color:color-mix(in_srgb,var(--surface)_85%,transparent)]"
              aria-label="Next milestone"
            >
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-x-hidden sm:mt-9 lg:mt-10">
          <div
            ref={railViewportRef}
            className="relative w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain [contain:layout_paint] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={lineRef}
              className="relative block w-max min-w-full pb-1"
            >
              <motion.div
                className="pointer-events-none absolute bottom-0 h-px bg-[var(--border)]"
                initial={false}
                animate={{ left: trackBounds.left, width: trackBounds.width }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
              />
              <motion.div
                className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-[var(--muted-strong)]"
                initial={false}
                animate={{ left: progress.left, width: progress.width }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
              />

              <div className="grid auto-cols-[148px] grid-flow-col gap-4 px-4 sm:auto-cols-[164px] sm:gap-5 sm:px-5 md:auto-cols-[174px] md:gap-6 md:px-6 lg:auto-cols-[minmax(136px,1fr)] lg:gap-7 lg:px-0 xl:auto-cols-[minmax(146px,1fr)] 2xl:auto-cols-[minmax(154px,1fr)]">
                {milestones.map((item, index) => {
                  const isActive = index === activeIndex;
                  const isCompleted = index < activeIndex;

                  return (
                    <button
                      key={item.year}
                      ref={(element) => {
                        yearRefs.current[index] = element;
                      }}
                      type="button"
                      onClick={() => goToIndex(index)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative min-w-0 rounded-xl pb-5 pt-0 text-left outline-none focus-visible:ring-4 focus-visible:ring-[#8FA89B]/20"
                    >
                      <p
                        className={`font-heading text-[0.98rem] font-semibold leading-none transition duration-300 sm:text-[1.03rem] ${
                          isActive
                            ? "-translate-y-0.5 font-semibold text-[var(--foreground)]"
                            : isCompleted
                              ? "text-[var(--muted-strong)] group-hover:text-[var(--foreground)]"
                              : "text-[color:color-mix(in_srgb,var(--muted-strong)_48%,transparent)] group-hover:text-[var(--foreground)]"
                        }`}
                      >
                        {item.year}
                      </p>
                      <p
                        className={`mt-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] transition duration-300 sm:text-[0.72rem] ${
                          isActive
                            ? "font-semibold text-[var(--accent-strong)]"
                            : isCompleted
                              ? "text-[var(--muted-strong)] group-hover:text-[var(--accent-strong)]"
                              : "text-[color:color-mix(in_srgb,var(--muted-strong)_44%,transparent)] group-hover:text-[var(--muted-strong)]"
                        }`}
                      >
                        {item.category}
                      </p>
                      <div className="mt-3 min-h-[2.9rem] pr-2">
                        <AnimatePresence initial={false} mode="wait">
                          {isActive ? (
                            <motion.p
                              key={`${item.year}-detail`}
                              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                              transition={{ duration: reduceMotion ? 0.16 : 0.32, ease: easeOut }}
                              className="max-w-[17ch] text-[0.72rem] leading-5 text-[var(--muted)] sm:text-[0.76rem]"
                            >
                              {item.title}
                            </motion.p>
                          ) : (
                            <span key={`${item.year}-spacer`} className="block h-[2.9rem]" aria-hidden />
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="sr-only">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 w-full min-w-0 max-w-full overflow-x-hidden overflow-y-hidden sm:mt-10 lg:mt-12">
          <div className="grid items-start gap-6 md:gap-7 lg:min-h-[21.5rem] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center lg:gap-8 xl:min-h-[23rem] xl:gap-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeMilestone.year}-image`}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? 20 : -20, scale: 1.015 }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? -16 : 16, scale: 1.005 }
                }
                transition={{
                  duration: reduceMotion ? 0.18 : 0.5,
                  ease: easeOut,
                }}
                className="relative aspect-[4/3] w-full max-w-[34rem] overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface)] sm:aspect-[16/10] sm:max-w-[38rem] sm:rounded-[1.4rem] lg:max-w-[min(100%,36rem)] lg:aspect-[16/11] lg:rounded-[1.8rem] xl:max-w-[38rem]"
              >
                <Image
                  src={activeMilestone.image}
                  alt={activeMilestone.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,62,80,0.04),rgba(44,62,80,0.24))]" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeMilestone.year}-content`}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? 18 : -18 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? -14 : 14 }
                }
                transition={{
                  duration: reduceMotion ? 0.18 : 0.5,
                  ease: easeOut,
                }}
                className="min-w-0 py-1 lg:py-3"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted-strong)] sm:text-[0.78rem]">
                    {activeMilestone.year}
                  </span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] sm:text-[0.76rem]">
                    {activeMilestone.category}
                  </span>
                </div>
                <h3 className="mt-4 max-w-[14ch] font-heading text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold leading-[1.05] text-[var(--foreground)]">
                  {activeMilestone.title}
                </h3>
                <p className="mt-5 max-w-[34rem] text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.04rem] sm:leading-8 lg:max-w-[32rem] lg:text-[1.05rem]">
                  {activeMilestone.description}
                </p>
                <p className="mt-6 text-[0.8rem] leading-6 tracking-[0.14em] text-[var(--muted-strong)] sm:text-[0.86rem]">
                  {activeMilestone.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
