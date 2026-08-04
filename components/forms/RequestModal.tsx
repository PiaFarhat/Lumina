"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Car, ConciergeBell, Send, Wrench, X } from "lucide-react";
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

export function RequestModal({ open, kind, onClose }: RequestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const selected = meta[kind];
  const Icon = selected.icon;
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const required =
      kind === "parking"
        ? ["name", "villa", "visitorName", "parkingBay", "category", "date"]
        : ["name", "villa", "category", "details"];
    const missing = required.some((field) => !String(data.get(field) ?? "").trim());

    if (missing) {
      setError("Please complete the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setRequestId(`LM-${Math.floor(10000 + Math.random() * 89999)}`);
      event.currentTarget.reset();
    }, 900);
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
            if (event.target === event.currentTarget) onClose();
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
                  <p className="text-sm text-[#6E6E6E]">Frontend simulation for resident requests.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-[#6E6E6E] transition hover:bg-[#F4F1EA] hover:text-[#2C3E50] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
                aria-label="Close request form"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <form className="mt-7 grid min-w-0 gap-4 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                Resident name
                <input name="name" className="field" placeholder="Full name" required />
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                Villa
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
                {kind === "parking" ? "Duration" : "Category"}
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
                {kind === "parking" ? "Arrival date" : "Preferred date"}
                <span className="relative">
                  <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A92A3]" aria-hidden />
                  <input name="date" type="date" min={today} className="field pr-11" required={kind === "parking"} />
                </span>
              </label>
              {kind === "parking" ? (
                <>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                    Visitor / driver name
                    <input name="visitorName" className="field" placeholder="Name of the person parking" required />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-[#2C3E50]">
                    Parking bay
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
                {kind === "parking" ? "Notes" : "Details"}
                <textarea
                  name="details"
                  className="field min-h-28 resize-none py-3"
                  placeholder={kind === "parking" ? "Vehicle plate, arrival time, or special instructions." : "Describe what you need."}
                  required={kind !== "parking"}
                />
              </label>
              {error ? <p className="break-words text-sm font-medium text-red-700 md:col-span-2">{error}</p> : null}
              {requestId ? <div className="min-w-0 md:col-span-2"><SuccessBanner message={`Request ${requestId} created successfully.`} /></div> : null}
              <div className="flex flex-col-reverse gap-3 pt-2 md:col-span-2 md:flex-row md:justify-end">
                <button type="button" onClick={onClose} className="btn-secondary w-full md:w-auto">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 md:w-auto">
                  {isLoading ? "Sending..." : "Submit Request"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
