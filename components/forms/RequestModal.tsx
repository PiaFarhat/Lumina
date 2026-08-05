"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Car, ConciergeBell, Send, Wrench, X } from "lucide-react";
import {
  createConciergeRequest,
  createContactMessage,
  createMaintenanceRequest,
  createParkingReservation,
} from "@/lib/api/submissions";
import { formOptions } from "@/lib/lumina-data";
import { SuccessBanner } from "../ui/SuccessBanner";

export type RequestKind = "maintenance" | "concierge" | "parking" | "contact";

type RequestModalProps = {
  open: boolean;
  kind: RequestKind;
  onClose: () => void;
};

const meta = {
  maintenance: { title: "Maintenance Request", icon: Wrench, options: formOptions.maintenance },
  concierge: { title: "Concierge Request", icon: ConciergeBell, options: formOptions.concierge },
  parking: { title: "Visitor Parking Reservation", icon: Car, options: formOptions.parking },
  contact: { title: "Contact Community Office", icon: Send, options: ["General", "Security", "Billing", "Community"] },
};

const villas = Array.from({ length: 30 }, (_, index) => `Villa ${String(index + 1).padStart(2, "0")}`);
const reservedParkingBays = new Set([3, 4, 8, 9, 12, 17, 18, 22, 25, 29, 33, 34]);
const parkingBays = Array.from({ length: 36 }, (_, index) => {
  const bayNumber = index + 1;
  return {
    label: `P-${String(bayNumber).padStart(2, "0")}`,
    reserved: reservedParkingBays.has(bayNumber),
  };
});

type SubmissionStatus = "idle" | "validating" | "submitting" | "success" | "error";
type ReferencePrefix = "M" | "C" | "P" | "G";

const successCopy: Record<RequestKind, string> = {
  maintenance: "Maintenance request submitted successfully.",
  concierge: "Concierge request submitted successfully.",
  parking: "Visitor parking request submitted successfully.",
  contact: "Your message was sent successfully.",
};

function createReference(prefix: ReferencePrefix, apiId: number) {
  return `LUM-${prefix}-${String(apiId).padStart(4, "0")}`;
}

function referencePrefixForKind(kind: RequestKind): ReferencePrefix {
  if (kind === "maintenance") return "M";
  if (kind === "concierge") return "C";
  if (kind === "parking") return "P";
  return "G";
}

function getField(data: FormData, field: string) {
  return String(data.get(field) ?? "").trim();
}

function RequiredMark() {
  return <span className="text-red-700" aria-hidden>*</span>;
}

export function RequestModal({ open, kind, onClose }: RequestModalProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [apiResponseId, setApiResponseId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const selected = meta[kind];
  const Icon = selected.icon;
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isSubmitting = submissionStatus === "validating" || submissionStatus === "submitting";

  function resetFormFields() {
    formRef.current?.reset();
    setError("");
  }

  function resetSubmissionState() {
    setSubmissionStatus("idle");
    setRequestId(null);
    setApiResponseId(null);
    setError("");
  }

  function closeModal() {
    if (isSubmitting) return;

    resetFormFields();
    resetSubmissionState();
    onClose();
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        resetFormFields();
        resetSubmissionState();
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSubmitting, onClose, open]);

  useEffect(() => {
    if (submissionStatus === "error") {
      errorRef.current?.focus();
    }

    if (submissionStatus === "success") {
      successRef.current?.focus();
    }
  }, [submissionStatus]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmissionStatus("validating");
    setRequestId(null);
    setApiResponseId(null);
    setError("");
    const data = new FormData(event.currentTarget);
    const required =
      kind === "parking"
        ? ["name", "villa", "visitorName", "parkingBay", "category", "date"]
        : ["name", "villa", "category", "details"];
    const missing = required.some((field) => !String(data.get(field) ?? "").trim());

    if (missing) {
      setError("Please complete the required fields.");
      setSubmissionStatus("error");
      return;
    }

    const date = getField(data, "date");
    if (date && date < today) {
      setError("Please choose today or a future date.");
      setSubmissionStatus("error");
      return;
    }

    setSubmissionStatus("submitting");

    try {
      const response =
        kind === "maintenance"
          ? await createMaintenanceRequest({
              residentName: getField(data, "name"),
              villa: getField(data, "villa"),
              category: getField(data, "category"),
              preferredDate: date || undefined,
              details: getField(data, "details"),
            })
          : kind === "concierge"
            ? await createConciergeRequest({
                residentName: getField(data, "name"),
                villa: getField(data, "villa"),
                service: getField(data, "category"),
                preferredDate: date || undefined,
                details: getField(data, "details"),
              })
            : kind === "parking"
              ? await createParkingReservation({
                  residentName: getField(data, "name"),
                  villa: getField(data, "villa"),
                  visitorName: getField(data, "visitorName"),
                  parkingBay: getField(data, "parkingBay"),
                  duration: getField(data, "category"),
                  arrivalDate: date,
                  notes: getField(data, "details") || undefined,
                })
              : await createContactMessage({
                  residentName: getField(data, "name"),
                  villa: getField(data, "villa"),
                  category: getField(data, "category"),
                  preferredDate: date || undefined,
                  details: getField(data, "details"),
                });

      setRequestId(createReference(referencePrefixForKind(kind), response.id));
      setApiResponseId(response.id);
      setSubmissionStatus("success");
      resetFormFields();
    } catch (submitError) {
      if (process.env.NODE_ENV === "development") {
        console.error(submitError);
      }

      setError("We couldn't submit your request. Please try again.");
      setSubmissionStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#2C3E50]/35 p-3 backdrop-blur-sm sm:p-4 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="max-h-[calc(100dvh-24px)] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-[#D8D4CC] bg-white p-5 shadow-2xl shadow-[#2C3E50]/20 sm:p-6 md:rounded-[2rem]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F1EA] text-[#2C3E50]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 id="request-modal-title" className="font-heading text-xl font-semibold text-[#2C3E50] sm:text-2xl">
                    {selected.title}
                  </h3>
                  <p className="text-sm text-[#6E6E6E]">Demo submission for resident requests.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="rounded-full p-2 text-[#6E6E6E] transition hover:bg-[#F4F1EA] hover:text-[#2C3E50] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close request form"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <form ref={formRef} className="mt-7 grid min-w-0 gap-4 md:grid-cols-2" onSubmit={handleSubmit} noValidate aria-describedby={error ? "request-form-error" : requestId ? "request-form-success" : undefined}>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                <span>Resident name <RequiredMark /></span>
                <input name="name" className="field" placeholder="Full name" required />
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                <span>Villa <RequiredMark /></span>
                <select name="villa" className="field" required defaultValue="">
                  <option value="" disabled>
                    Select villa
                  </option>
                  {villas.map((villa) => (
                    <option key={villa}>{villa}</option>
                  ))}
                </select>
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                <span>{kind === "parking" ? "Duration" : "Category"} <RequiredMark /></span>
                <select name="category" className="field" required defaultValue="">
                  <option value="" disabled>
                    {kind === "parking" ? "Select duration" : "Select one"}
                  </option>
                  {selected.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                <span>{kind === "parking" ? "Arrival date" : "Preferred date"} {kind === "parking" ? <RequiredMark /> : null}</span>
                <span className="relative">
                  <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A92A3]" aria-hidden />
                  <input name="date" type="date" min={today} className="field pr-11" required={kind === "parking"} />
                </span>
              </label>
              {kind === "parking" ? (
                <>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                    <span>Visitor / driver name <RequiredMark /></span>
                    <input name="visitorName" className="field" placeholder="Name of the person parking" required />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                    <span>Parking bay <RequiredMark /></span>
                    <select name="parkingBay" className="field" required defaultValue="">
                      <option value="" disabled>
                        Select available bay
                      </option>
                      {parkingBays.map((bay) => (
                        <option key={bay.label} value={bay.label} disabled={bay.reserved}>
                          {bay.label}
                          {bay.reserved ? " - reserved" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : null}
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50] md:col-span-2">
                <span>{kind === "parking" ? "Notes" : "Details"} {kind !== "parking" ? <RequiredMark /> : null}</span>
                <textarea
                  name="details"
                  className="field min-h-28 resize-none py-3"
                  placeholder={kind === "parking" ? "Vehicle plate, arrival time, or special instructions." : "Describe what you need."}
                  required={kind !== "parking"}
                />
              </label>
              {error ? (
                <p id="request-form-error" ref={errorRef} tabIndex={-1} role="alert" className="break-words rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 md:col-span-2">
                  {error}
                </p>
              ) : null}
              {requestId ? (
                <div id="request-form-success" ref={successRef} tabIndex={-1} className="min-w-0 md:col-span-2">
                  <SuccessBanner message={`${successCopy[kind]} Reference ${requestId}.`} />
                  {apiResponseId ? <p className="mt-2 break-words text-xs leading-5 text-[#6E6E6E]">Demo response id: {apiResponseId}.</p> : null}
                </div>
              ) : null}
              <div className="flex flex-col-reverse gap-3 pt-2 md:col-span-2 md:flex-row md:justify-end">
                <button type="button" onClick={closeModal} disabled={isSubmitting} className="btn-secondary w-full disabled:cursor-not-allowed disabled:opacity-60 md:w-auto">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 md:w-auto">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
