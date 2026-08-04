"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Menu, Plus, X } from "lucide-react";
import { navItems, serviceMenu } from "@/lib/lumina-data";
import { LuminaMark } from "../ui/LuminaMark";
import { RequestKind } from "../forms/RequestModal";

type ArchitecturalHeaderProps = {
  onRequest: (kind: RequestKind) => void;
};

export function ArchitecturalHeader({ onRequest }: ArchitecturalHeaderProps) {
  const [active, setActive] = useState("Home");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(item: string) {
    setActive(item);

    if (item === "Services") {
      setServicesOpen((value) => !value);
      return;
    }

    setServicesOpen(false);
    const section = document.getElementById(item.toLowerCase());
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4 sm:top-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#D8D4CC]/90 bg-white/92 px-3 py-3 shadow-xl shadow-[#2C3E50]/8 backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-3 rounded-full pl-2 pr-3 focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20">
          <LuminaMark />
          <span className="font-heading text-lg font-semibold tracking-normal text-[#2C3E50]">Lumina</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <div key={item} className="relative">
              <button
                type="button"
                onClick={() => handleNav(item)}
                onMouseEnter={() => item === "Services" && setServicesOpen(true)}
                className="relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[#2C3E50] transition hover:text-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
                aria-expanded={item === "Services" ? servicesOpen : undefined}
              >
                {active === item ? (
                  <motion.span layoutId="nav-indicator" className="absolute inset-0 rounded-full bg-[#F4F1EA]" transition={{ type: "spring", stiffness: 360, damping: 30 }} />
                ) : null}
                <span className="relative">{item}</span>
                {item === "Services" ? <ChevronDown className="relative h-3.5 w-3.5" aria-hidden /> : null}
              </button>
              {item === "Services" ? (
                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      onMouseLeave={() => setServicesOpen(false)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 top-12 z-20 w-56 rounded-3xl border border-[#D8D4CC] bg-white p-2 shadow-xl shadow-[#2C3E50]/10"
                    >
                      {serviceMenu.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => onRequest(service === "Maintenance" ? "maintenance" : service === "Concierge" ? "concierge" : "parking")}
                          className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-[#2C3E50] transition hover:bg-[#F4F1EA] hover:text-[#789285] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
                        >
                          {service}
                        </button>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              ) : null}
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => handleNav("Announcements")}
            className="rounded-full border border-[#D8D4CC] p-3 text-[#2C3E50] transition hover:border-[#8FA89B] hover:bg-[#F4F1EA] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
            aria-label="View announcements"
          >
            <Bell className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => handleNav("Residents")}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#C8A97E] text-sm font-semibold text-white transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
            aria-label="View residents"
          >
            RN
          </button>
          <button type="button" onClick={() => onRequest("maintenance")} className="btn-primary h-11">
            <Plus className="h-4 w-4" aria-hidden />
            New Request
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-full p-3 text-[#2C3E50] lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-3 grid max-w-7xl gap-1 rounded-[2rem] border border-[#D8D4CC] bg-white p-3 shadow-xl shadow-[#2C3E50]/10 lg:hidden"
          >
            <div className="mb-2 flex items-center gap-3 rounded-3xl bg-[#F4F1EA] p-3">
              <LuminaMark size="md" />
              <div>
                <p className="font-heading text-lg font-semibold text-[#2C3E50]">Lumina</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#789285]">Live in Light</p>
              </div>
            </div>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#2C3E50] hover:bg-[#F4F1EA]">
                {item}
              </a>
            ))}
            <button type="button" onClick={() => onRequest("maintenance")} className="btn-primary mt-2 justify-center">
              New Request
            </button>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
