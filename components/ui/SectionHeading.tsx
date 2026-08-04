"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8FA89B]">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-normal text-[#2C3E50] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-lg leading-8 text-[#6E6E6E]">{description}</p> : null}
    </motion.div>
  );
}
