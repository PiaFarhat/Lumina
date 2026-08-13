"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { fadeUp, stagger } from "../ui/motion";

type ShowcaseCardItem = {
  label: string;
  title: string;
  image: string;
  alt: string;
  aspectClassName: string;
};

const columnOneCards: ShowcaseCardItem[] = [
  {
    label: "Residences",
    title: "Private Living",
    image: "/img/exterior villa.png",
    alt: "Lumina private villa exterior with landscaped gardens and sheltered arrival",
    aspectClassName: "aspect-[4/5]",
  },
  {
    label: "Amenities",
    title: "Wellness & Pool",
    image: "/img/pool and club house.png",
    alt: "Lumina clubhouse and pool terrace arranged for quiet resident use",
    aspectClassName: "aspect-[4/3]",
  },
  {
    label: "Life Together",
    title: "Community Events",
    image: "/img/the rythm of the compound.png",
    alt: "Lumina compound landscape with architectural pathways and shared outdoor spaces",
    aspectClassName: "aspect-[4/5]",
  },
];

const columnTwoCards: ShowcaseCardItem[] = [
  {
    label: "Arrival",
    title: "Concierge",
    image: "/img/reception.png",
    alt: "Lumina reception entrance with security and landscaped arrival drive",
    aspectClassName: "aspect-[4/3]",
  },
  {
    label: "Guest Access",
    title: "Visitor Parking",
    image: "/img/parking drive way.png",
    alt: "Lumina visitor parking drive with covered bays and integrated lighting",
    aspectClassName: "aspect-[4/5]",
  },
  {
    label: "Arrival",
    title: "Arrival Experience",
    image: "/img/event-sections/arrival-gate.png",
    alt: "Lumina gated arrival experience with illuminated architecture and landscaped entry",
    aspectClassName: "aspect-[4/3]",
  },
];

const mobileCards = [
  {
    ...columnOneCards[0],
    title: "Private Living",
    gridClassName: "col-span-3 row-span-1",
  },
  {
    ...columnTwoCards[0],
    title: "Concierge",
    gridClassName: "col-span-3 row-span-1",
  },
  {
    ...columnTwoCards[1],
    title: "Visitor Parking",
    gridClassName: "col-span-2 row-span-1",
  },
  {
    ...columnOneCards[1],
    title: "Wellness & Pool",
    gridClassName: "col-span-4 row-span-1",
  },
  {
    ...columnOneCards[2],
    title: "Community Events",
    gridClassName: "col-span-3 row-span-1",
  },
  {
    ...columnTwoCards[2],
    title: "Arrival",
    gridClassName: "col-span-3 row-span-1",
  },
] as const;

const mobileRowOneCards = [
  {
    ...columnOneCards[0],
    title: "Private Living",
  },
  {
    ...columnTwoCards[0],
    title: "Concierge",
  },
  {
    ...columnOneCards[1],
    title: "Wellness & Pool",
  },
] as const;

const mobileRowTwoCards = [
  {
    ...columnTwoCards[1],
    title: "Visitor Parking",
  },
  {
    ...columnOneCards[2],
    title: "Community Events",
  },
  {
    ...columnTwoCards[2],
    title: "Arrival",
  },
] as const;

function ShowcaseCard({
  card,
  className = "",
}: {
  card: ShowcaseCardItem;
  className?: string;
}) {
  return (
    <article
      className={`group relative w-full overflow-hidden rounded-[1.75rem] border border-[#D8D4CC] bg-white shadow-sm shadow-[#2C3E50]/8 ${card.aspectClassName} ${className}`}
    >
      <Image
        src={card.image}
        alt={card.alt}
        fill
        sizes="(min-width: 1728px) 20vw, (min-width: 1440px) 22vw, (min-width: 1024px) 26vw, (min-width: 768px) 42vw, (min-width: 380px) 44vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,62,80,0.06),rgba(44,62,80,0.72))]" />
      <div className="absolute inset-x-0 bottom-0 p-2.5 text-white min-[390px]:p-3 sm:p-5">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#F4F1EA]/84 sm:text-[0.68rem] sm:tracking-[0.22em]">
          {card.label}
        </p>
        <h3 className="mt-1.5 max-w-[14ch] font-heading text-[0.98rem] font-semibold leading-tight min-[390px]:text-[1.06rem] sm:mt-2 sm:max-w-[16ch] sm:text-lg xl:text-xl 2xl:text-2xl">
          {card.title}
        </h3>
      </div>
    </article>
  );
}

function MediaColumn({
  cards,
  direction,
  duration,
  reduceMotion,
  cardClassName = "",
  className = "",
}: {
  cards: ShowcaseCardItem[];
  direction: "up" | "down";
  duration: number;
  reduceMotion: boolean;
  cardClassName?: string;
  className?: string;
}) {
  const initialY = direction === "up" ? "0%" : "-50%";
  const animateY = direction === "up" ? "-50%" : "0%";

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: initialY }}
        animate={reduceMotion ? { y: initialY } : { y: animateY }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                ease: "linear",
                repeat: Infinity,
              }
        }
        className="flex flex-col"
      >
        {[0, 1].map((stackIndex) => (
          <div key={stackIndex} className="flex flex-col gap-6 pb-6 xl:gap-7 xl:pb-7">
            {cards.map((card) => (
              <ShowcaseCard
                key={`${stackIndex}-${card.title}`}
                card={card}
                className={cardClassName}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MobileMarqueeRow({
  cards,
  direction,
  duration,
  reduceMotion,
}: {
  cards: readonly ShowcaseCardItem[];
  direction: "left" | "right";
  duration: number;
  reduceMotion: boolean;
}) {
  const initialX = direction === "left" ? "0%" : "-50%";
  const animateX = direction === "left" ? "-50%" : "0%";

  return (
    <div className="-mx-[14px] overflow-hidden px-[14px] min-[390px]:-mx-4 min-[390px]:px-4">
      <motion.div
        initial={{ x: initialX }}
        animate={reduceMotion ? { x: initialX } : { x: animateX }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                ease: "linear",
                repeat: Infinity,
              }
        }
        className="flex w-max gap-2 min-[390px]:gap-2.5"
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-2 min-[390px]:gap-2.5">
            {cards.map((card) => (
              <ShowcaseCard
                key={`${setIndex}-${card.title}`}
                card={card}
                className="h-[90px] w-[142px] flex-none rounded-[0.95rem] !aspect-auto min-[360px]:h-[98px] min-[360px]:w-[150px] min-[390px]:h-[104px] min-[390px]:w-[168px] min-[430px]:h-[112px] min-[430px]:w-[184px]"
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function EditorialShowcase() {
  const reduceMotion = !!useReducedMotion();

  return (
    <section className="relative bg-[#F8F5EE] px-[14px] py-12 sm:px-4 sm:py-14 lg:py-24 xl:py-28">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(248,245,238,0.96),rgba(248,245,238,0))] lg:h-32" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(248,245,238,0.98),rgba(248,245,238,0))] lg:h-36" />
        <div className="absolute inset-x-[10%] bottom-[6%] top-[50%] hidden lg:block">
          <div className="absolute inset-0 rounded-tl-[12rem] rounded-tr-[4rem] bg-[#B4C2C9]/42 [clip-path:polygon(0_60%,10%_48%,22%_40%,38%_34%,56%_26%,74%_18%,90%_10%,100%_6%,100%_100%,0_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,238,0.02)_0%,rgba(220,229,232,0.34)_22%,rgba(180,194,201,0.46)_54%,rgba(143,168,155,0.16)_76%,rgba(248,245,238,0.1)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(248,245,238,0.14),transparent_28%),radial-gradient(circle_at_72%_42%,rgba(122,146,163,0.1),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(143,168,155,0.1),transparent_24%)]" />
          <div className="absolute inset-x-0 bottom-[-2%] h-[32%] bg-[linear-gradient(180deg,rgba(180,194,201,0),rgba(248,245,238,0.64)_68%,rgba(248,245,238,0.96)_100%)]" />
        </div>
        <div className="absolute inset-x-[45%] bottom-0 top-[56%] hidden md:block lg:hidden">
          <div className="absolute inset-0 rounded-tl-[6rem] bg-[#DCE5E8]/34 [clip-path:polygon(0_58%,24%_42%,54%_28%,100%_14%,100%_100%,0_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,229,232,0.46),rgba(248,245,238,0.08)_66%,rgba(248,245,238,0)_100%)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-[72%] md:hidden">
          <div className="absolute inset-0 bg-[#AABBC6]/46 [clip-path:polygon(0_34%,28%_22%,52%_18%,74%_12%,100%_0%,100%_100%,0_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,229,232,0.38),rgba(248,245,238,0.12)_70%,rgba(248,245,238,0)_100%)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1800px)]">
        <div className="grid gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:items-start lg:gap-10 xl:gap-12 2xl:gap-14">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[820px]"
          >
            <motion.p variants={fadeUp} className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8FA89B] min-[390px]:text-[0.7rem] sm:text-xs sm:tracking-[0.26em]">
              Life at Lumina
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-2.5 max-w-[11ch] font-heading text-[1.9rem] font-semibold leading-[1.06] tracking-normal text-[#2C3E50] min-[390px]:text-[2rem] sm:mt-4 sm:text-4xl lg:max-w-[14ch] lg:text-[3.35rem] lg:leading-[1.04]"
            >
              Designed around the way you live.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-[40rem] text-[0.92rem] leading-[1.55] text-[#6E6E6E] min-[390px]:text-[0.96rem] sm:mt-5 sm:text-lg sm:leading-8">
              Private living, thoughtful services, wellness and community &mdash; connected in one
              considered environment.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-5 max-w-[34rem] rounded-[1.35rem] border border-[#D8D4CC] bg-[#F4F1EA] p-4 shadow-sm sm:mt-8 sm:rounded-[1.75rem] sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A92A3]">Highlight</p>
              <p className="mt-2 font-heading text-[1.45rem] font-semibold text-[#2C3E50] min-[390px]:text-[1.55rem] sm:mt-3 sm:text-4xl">
                24/7 Resident Services
              </p>
              <p className="mt-2 max-w-md text-[0.82rem] leading-[1.55] text-[#6E6E6E] sm:mt-3 sm:text-sm sm:leading-7">
                Concierge support, guest access, and villa requests remain composed in one resident
                flow.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 hidden md:block">
              <a href="#services" className="btn-secondary inline-flex items-center gap-2">
                Explore the community
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          </motion.div>

          <div className="hidden w-full min-w-0 lg:block">
            <div className="relative h-[clamp(600px,68vh,740px)] w-full overflow-hidden rounded-[2rem]">
              <div className="grid h-full grid-cols-2 gap-[clamp(18px,1.8vw,28px)]">
                <MediaColumn
                  cards={columnOneCards}
                  direction="up"
                  duration={20}
                  reduceMotion={reduceMotion}
                  cardClassName="!aspect-auto h-[clamp(240px,30vh,330px)] rounded-[1.6rem] xl:rounded-[1.75rem]"
                  className="w-full pt-6 xl:pt-8"
                />
                <MediaColumn
                  cards={columnTwoCards}
                  direction="down"
                  duration={24}
                  reduceMotion={reduceMotion}
                  cardClassName="!aspect-auto h-[clamp(240px,30vh,330px)] rounded-[1.6rem] xl:rounded-[1.75rem]"
                  className="w-full pt-20 xl:pt-24"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(180deg,rgba(248,245,238,0.82),rgba(248,245,238,0))] xl:h-12" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(0deg,rgba(248,245,238,0.82),rgba(248,245,238,0.06)_62%,rgba(248,245,238,0))] xl:h-14" />
            </div>
          </div>

          <div className="hidden md:block lg:hidden">
            <div className="grid gap-4 md:grid-cols-2">
              {mobileCards.map((card, index) => (
                <ShowcaseCard
                  key={card.title}
                  card={card}
                  className={index === 0 || index === 5 ? "md:col-span-2" : ""}
                />
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <div className="mt-6 space-y-2 min-[390px]:space-y-2.5">
              <MobileMarqueeRow
                cards={mobileRowOneCards}
                direction="left"
                duration={18}
                reduceMotion={reduceMotion}
              />
              <MobileMarqueeRow
                cards={mobileRowTwoCards}
                direction="right"
                duration={22}
                reduceMotion={reduceMotion}
              />
            </div>

            <motion.div variants={fadeUp} className="mt-6 flex justify-center">
              <a href="#services" className="btn-secondary inline-flex min-h-10 items-center gap-2 px-4 py-2.5 text-sm">
                Explore the community
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
