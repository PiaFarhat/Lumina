"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { RequestKind } from "./RequestModal";

type SubmissionSuccessProps = {
  kind: RequestKind;
  reference: string;
  apiResponseId: number | null;
  onSubmitAnother: () => void;
  onClose: () => void;
};

const titleByKind: Record<RequestKind, string> = {
  maintenance: "Maintenance request submitted",
  concierge: "Concierge request submitted",
  parking: "Visitor parking request submitted",
  contact: "Message sent successfully",
};

const textByKind: Record<RequestKind, string> = {
  maintenance: "Your maintenance request was submitted successfully.",
  concierge: "Your concierge request was submitted successfully.",
  parking: "Your visitor parking request was submitted successfully.",
  contact: "Your message was sent successfully.",
};

export function SubmissionSuccess({
  kind,
  reference,
  apiResponseId,
  onSubmitAnother,
  onClose,
}: SubmissionSuccessProps) {
  const reduceMotion = useReducedMotion();
  const iconMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 } };
  const itemMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

  return (
    <section role="status" className="mx-auto grid w-full max-w-[460px] justify-items-center px-1 py-8 text-center sm:py-10">
      <motion.div
        {...iconMotion}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="grid h-20 w-20 place-items-center rounded-full border border-[#8FA89B]/35 bg-[#8FA89B]/14 text-[#789285]"
      >
        <motion.span
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.25 }}
        >
          <Check className="h-9 w-9" aria-hidden />
        </motion.span>
      </motion.div>

      <motion.h3
        id="submission-success-title"
        tabIndex={-1}
        {...itemMotion}
        transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 font-heading text-3xl font-semibold text-[#2C3E50]"
      >
        {titleByKind[kind]}
      </motion.h3>
      <motion.p
        {...itemMotion}
        transition={{ delay: reduceMotion ? 0 : 0.14, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-sm leading-6 text-[#6E6E6E]"
      >
        {textByKind[kind]}
      </motion.p>

      <motion.div
        {...itemMotion}
        transition={{ delay: reduceMotion ? 0 : 0.2, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 w-full rounded-[1.5rem] border border-[#C8A97E]/45 bg-[#F4F1EA] p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Reference</p>
        <p className="mt-2 break-words font-heading text-2xl font-semibold text-[#2C3E50]">{reference}</p>
        {apiResponseId ? <p className="mt-3 text-xs text-[#6E6E6E]">Demo response ID: {apiResponseId}</p> : null}
      </motion.div>

      <motion.div
        {...itemMotion}
        transition={{ delay: reduceMotion ? 0 : 0.26, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center"
      >
        <button type="button" onClick={onClose} className="btn-secondary w-full sm:w-auto">
          Close
        </button>
        <button type="button" onClick={onSubmitAnother} className="btn-primary w-full sm:w-auto">
          Submit another request
        </button>
      </motion.div>
    </section>
  );
}
