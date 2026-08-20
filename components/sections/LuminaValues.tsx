"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BellRing, Gem, Home, Leaf, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { fadeUp, stagger } from "../ui/motion";

type ValueItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
};

const values: ValueItem[] = [
  {
    title: "Thoughtful Living",
    description:
      "Every space and service is considered around comfort, privacy and the rhythms of daily life.",
    icon: Home,
    accentClassName: "text-[#789285]",
  },
  {
    title: "Quiet Security",
    description:
      "Discreet systems and attentive support help residents feel protected without feeling restricted.",
    icon: ShieldCheck,
    accentClassName: "text-[#2C3E50]",
  },
  {
    title: "Responsive Service",
    description:
      "Concierge and maintenance support are designed to feel clear, personal and dependable.",
    icon: BellRing,
    accentClassName: "text-[#C8A97E]",
  },
  {
    title: "Shared Belonging",
    description:
      "Gathering spaces and community moments create natural opportunities to connect.",
    icon: Users,
    accentClassName: "text-[#7A92A3]",
  },
  {
    title: "Wellness by Design",
    description:
      "Landscape, movement and calm shared spaces make wellbeing part of the everyday environment.",
    icon: Leaf,
    accentClassName: "text-[#789285]",
  },
  {
    title: "Enduring Quality",
    description:
      "Architecture, materials and community standards are cared for with long-term attention.",
    icon: Gem,
    accentClassName: "text-[#C8A97E]",
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

const textReveal = {
  hidden: { opacity: 0.3, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: revealEase,
    },
  }),
};

function setCarouselState(swiper: SwiperType, setter: (state: { active: number; beginning: boolean; end: boolean }) => void) {
  setter({
    active: swiper.realIndex,
    beginning: swiper.isBeginning,
    end: swiper.isEnd,
  });
}

function RibbonTriangle({
  direction,
  Icon,
  accentClassName,
  mobile = false,
}: {
  direction: "up" | "down";
  Icon: LucideIcon;
  accentClassName: string;
  mobile?: boolean;
}) {
  const wrapperClassName = mobile
    ? "relative h-full w-full"
    : `absolute inset-x-0 ${direction === "up" ? "bottom-1/2" : "top-1/2"} h-[7.75rem] lg:h-[9.25rem]`;

  return (
    <div className={wrapperClassName}>
      <div
        className="relative h-full w-full bg-[#F4F1EA]/95"
        style={{
          clipPath:
            direction === "up"
              ? "polygon(50% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 0%, 100% 0%, 50% 100%)",
        }}
      >
        <div
          className={`absolute inset-x-0 ${
            direction === "up"
              ? mobile
                ? "bottom-6"
                : "bottom-6 lg:bottom-7"
              : mobile
                ? "top-6"
                : "top-6 lg:top-7"
          } flex justify-center`}
        >
          <Icon
            className={`${accentClassName} ${mobile ? "h-12 w-12" : "h-11 w-11 lg:h-14 lg:w-14"}`}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function DesktopValueSlide({
  item,
  index,
  reduceMotion,
}: {
  item: ValueItem;
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;
  const revealDelay = (index % 4) * 0.06;

  return (
    <article className="relative h-[22rem] min-w-0">
      {isEven ? (
        <>
          <RibbonTriangle direction="up" Icon={Icon} accentClassName={item.accentClassName} />
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.45 }}
            variants={textReveal}
            custom={revealDelay}
            className="absolute inset-x-3 bottom-0 flex h-[calc(50%-0.35rem)] flex-col items-center justify-start px-3 pt-5 text-center lg:inset-x-4 lg:px-4 lg:pt-6"
          >
            <h3 className="text-[1.02rem] font-semibold text-[#F4F1EA] lg:text-[1.15rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[16rem] text-[0.84rem] leading-6 text-[#F4F1EA]/76 lg:text-[0.92rem]">
              {item.description}
            </p>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.45 }}
            variants={textReveal}
            custom={revealDelay}
            className="absolute inset-x-3 top-0 flex h-[calc(50%-0.35rem)] flex-col items-center justify-end px-3 pb-5 text-center lg:inset-x-4 lg:px-4 lg:pb-6"
          >
            <h3 className="text-[1.02rem] font-semibold text-[#F4F1EA] lg:text-[1.15rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[16rem] text-[0.84rem] leading-6 text-[#F4F1EA]/76 lg:text-[0.92rem]">
              {item.description}
            </p>
          </motion.div>
          <RibbonTriangle direction="down" Icon={Icon} accentClassName={item.accentClassName} />
        </>
      )}
    </article>
  );
}

function MobileValueSlide({
  item,
  index,
  reduceMotion,
}: {
  item: ValueItem;
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;
  const direction = isEven ? "down" : "up";
  const revealDelay = (index % 3) * 0.08;

  return (
    <article className="relative mx-auto flex min-h-[26rem] w-full max-w-[26rem] flex-col items-center px-3 text-center">
      {direction === "up" ? (
        <>
          <div className="relative h-[13rem] w-full max-w-[17.5rem]">
            <RibbonTriangle
              direction="up"
              Icon={Icon}
              accentClassName={item.accentClassName}
              mobile
            />
          </div>
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.5 }}
            variants={textReveal}
            custom={revealDelay}
            className="mt-6 w-full"
          >
            <h3 className="text-[1.35rem] font-semibold text-[#F4F1EA]">{item.title}</h3>
            <p className="mx-auto mt-4 max-w-[18rem] text-[0.98rem] leading-7 text-[#F4F1EA]/78">
              {item.description}
            </p>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.5 }}
            variants={textReveal}
            custom={revealDelay}
            className="w-full pt-1"
          >
            <h3 className="text-[1.35rem] font-semibold text-[#F4F1EA]">{item.title}</h3>
            <p className="mx-auto mt-4 max-w-[18rem] text-[0.98rem] leading-7 text-[#F4F1EA]/78">
              {item.description}
            </p>
          </motion.div>
          <div className="relative mt-8 h-[13rem] w-full max-w-[17.5rem]">
            <RibbonTriangle
              direction="down"
              Icon={Icon}
              accentClassName={item.accentClassName}
              mobile
            />
          </div>
        </>
      )}
    </article>
  );
}

export function LuminaValues() {
  const reduceMotion = !!useReducedMotion();
  const [desktopSwiper, setDesktopSwiper] = useState<SwiperType | null>(null);
  const [mobileSwiper, setMobileSwiper] = useState<SwiperType | null>(null);
  const [desktopState, setDesktopState] = useState({
    active: 0,
    beginning: true,
    end: false,
  });
  const [mobileState, setMobileState] = useState({
    active: 0,
    beginning: true,
    end: false,
  });

  return (
    <section
      id="values"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#789285_0%,#617988_42%,#2C3E50_100%)] py-14 sm:py-16 lg:py-18 xl:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(244,241,234,0.06),rgba(244,241,234,0))]" />
        <div className="absolute left-[-8%] top-[18%] h-[42%] w-[34%] bg-white/4 [clip-path:polygon(0_10%,100%_0,58%_100%,0_88%)]" />
        <div className="absolute right-[-4%] top-[8%] h-[58%] w-[42%] bg-[#F4F1EA]/5 [clip-path:polygon(28%_0,100%_0,100%_100%,0_78%)]" />
        <div className="absolute bottom-0 left-[12%] h-[38%] w-[36%] bg-[#7A92A3]/8 [clip-path:polygon(0_24%,84%_0,100%_100%,12%_100%)]" />
      </div>

      <div className="lumina-page-shell relative z-10">
        <motion.div
          variants={stagger}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.26em] text-[#C8A97E]">
            Lumina Values
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading text-3xl font-semibold tracking-normal text-[#F4F1EA] sm:text-4xl lg:text-5xl"
          >
            The principles behind everyday life at Lumina.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-[#F4F1EA]/74">
            Thoughtful design, responsive service and a strong sense of belonging shape how the
            community is experienced every day.
          </motion.p>
        </motion.div>

        <div className="relative mt-10 hidden w-full min-w-0 max-w-full overflow-hidden md:block lg:mt-12">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(244,241,234,0),rgba(244,241,234,0.46)_12%,rgba(244,241,234,0.46)_88%,rgba(244,241,234,0))]" />

          <button
            type="button"
            onClick={() => desktopSwiper?.slidePrev()}
            disabled={desktopState.beginning}
            className="absolute left-1 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F4F1EA] text-[#2C3E50] shadow-lg shadow-[#10202A]/16 transition duration-200 hover:-translate-y-[calc(50%+1px)] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F4F1EA]/25 disabled:cursor-not-allowed disabled:bg-[#F4F1EA]/45 disabled:text-[#2C3E50]/45 disabled:shadow-none disabled:hover:-translate-y-1/2 lg:left-2 lg:h-12 lg:w-12"
            aria-label="Previous values"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => desktopSwiper?.slideNext()}
            disabled={desktopState.end}
            className="absolute right-1 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F4F1EA] text-[#2C3E50] shadow-lg shadow-[#10202A]/16 transition duration-200 hover:-translate-y-[calc(50%+1px)] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F4F1EA]/25 disabled:cursor-not-allowed disabled:bg-[#F4F1EA]/45 disabled:text-[#2C3E50]/45 disabled:shadow-none disabled:hover:-translate-y-1/2 lg:right-2 lg:h-12 lg:w-12"
            aria-label="Next values"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>

          <div className="mx-auto w-full min-w-0 max-w-full overflow-hidden px-12 lg:px-14">
            <Swiper
              modules={[A11y]}
              speed={reduceMotion ? 0 : 560}
              onSwiper={(swiper) => {
                setDesktopSwiper(swiper);
                setCarouselState(swiper, setDesktopState);
              }}
              onSlideChange={(swiper) => setCarouselState(swiper, setDesktopState)}
              onResize={(swiper) => setCarouselState(swiper, setDesktopState)}
              watchOverflow
              spaceBetween={2}
              slidesPerView={2.2}
              breakpoints={{
                768: { slidesPerView: 2.35, spaceBetween: 2 },
                904: { slidesPerView: 2.8, spaceBetween: 2 },
                1024: { slidesPerView: 4.85, spaceBetween: 2 },
                1440: { slidesPerView: 5.05, spaceBetween: 2 },
              }}
              className="w-full min-w-0 max-w-full"
              a11y={{
                enabled: true,
                containerMessage: "Lumina values carousel",
              }}
            >
              {values.map((item, index) => (
                <SwiperSlide key={item.title} className="!h-auto min-w-0">
                  <DesktopValueSlide item={item} index={index} reduceMotion={reduceMotion} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="relative mt-10 min-w-0 md:hidden">
          <div className="w-full min-w-0 max-w-full overflow-hidden">
            <Swiper
              modules={[A11y]}
              speed={reduceMotion ? 0 : 520}
              onSwiper={(swiper) => {
                setMobileSwiper(swiper);
                setCarouselState(swiper, setMobileState);
              }}
              onSlideChange={(swiper) => setCarouselState(swiper, setMobileState)}
              watchOverflow
              slidesPerView={1}
              spaceBetween={12}
              className="w-full min-w-0 max-w-full"
              a11y={{
                enabled: true,
                containerMessage: "Lumina values mobile carousel",
              }}
            >
              {values.map((item, index) => (
                <SwiperSlide key={item.title} className="!h-auto min-w-0">
                  <MobileValueSlide item={item} index={index} reduceMotion={reduceMotion} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2" aria-label="Lumina values pagination">
            {values.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => mobileSwiper?.slideTo(index)}
                className={`h-2.5 rounded-full transition focus:outline-none focus:ring-4 focus:ring-[#F4F1EA]/20 ${
                  mobileState.active === index
                    ? "w-6 bg-[#C8A97E]"
                    : "w-2.5 bg-[#F4F1EA]/28 hover:bg-[#F4F1EA]/44"
                }`}
                aria-label={`Go to ${item.title}`}
                aria-current={mobileState.active === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
