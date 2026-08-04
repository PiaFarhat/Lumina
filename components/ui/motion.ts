"use client";

import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const softSpring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};
