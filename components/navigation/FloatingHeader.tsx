"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { RequestKind } from "../forms/RequestModal";
import { LuminaMark } from "../ui/LuminaMark";

type FloatingHeaderProps = {
  onRequest: (kind: RequestKind) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

type NavAction = {
  label: string;
  target?: string;
  request?: RequestKind;
};

const primaryNav: NavAction[] = [
  { label: "Home", target: "home" },
  { label: "Announcements", target: "announcements" },
  { label: "Services", target: "services" },
];

const drawerPrimary: NavAction[] = [
  { label: "Home", target: "home" },
  { label: "Announcements", target: "announcements" },
  { label: "Maintenance", request: "maintenance" },
  { label: "Concierge", request: "concierge" },
  { label: "Visitor Parking", request: "parking" },
];

const drawerSecondary: NavAction[] = [
  { label: "Residents", target: "residents" },
  { label: "Gallery", target: "gallery" },
  { label: "Contact", target: "contact" },
  { label: "Community Rules", target: "contact" },
  { label: "Help and Support", target: "contact" },
];

export function FloatingHeader({ onRequest, drawerOpen, setDrawerOpen }: FloatingHeaderProps) {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { resident, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 18);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function navigate(item: NavAction) {
    setServicesOpen(false);
    setDrawerOpen(false);

    if (item.request) {
      onRequest(item.request);
      return;
    }

    if (item.target) {
      setActive(item.label);
      const target = document.getElementById(item.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${item.target}`);
      }
    }
  }

  function openDrawer() {
    setServicesOpen(false);
    setDrawerOpen(true);
  }

  function viewProfile() {
    setDrawerOpen(false);
    router.push("/profile");
  }

  function handleSignOut() {
    setDrawerOpen(false);
    signOut();
  }

  return (
    <>
      <ScrollAwareHeader>
        <div
          className={`mx-3 flex h-[64px] max-w-none items-center justify-between gap-2 rounded-[22px] border border-[var(--border)] px-2.5 py-2 shadow-xl backdrop-blur-xl transition-all duration-300 md:mx-auto md:grid md:h-auto md:w-[calc(100%-32px)] md:max-w-[1480px] md:grid-cols-[auto_1fr_auto] md:gap-3 md:rounded-[28px] md:px-4 md:py-2.5 ${
            isScrolled
              ? "bg-[color:color-mix(in_srgb,var(--surface)_94%,transparent)] shadow-[#2C3E50]/14"
              : "bg-[color:color-mix(in_srgb,var(--surface)_76%,transparent)] shadow-[#2C3E50]/8"
          }`}
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              navigate({ label: "Home", target: "home" });
            }}
            className="flex items-center gap-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
          >
            <LuminaMark />
            <span className="hidden font-heading text-lg font-semibold text-[var(--foreground)] sm:block">Lumina</span>
          </a>

          <div className="hidden min-w-0 items-center justify-center md:flex">
            <PageTitleIndicator active={active} />
            <HeaderNav active={active} onNavigate={navigate} servicesOpen={servicesOpen} setServicesOpen={setServicesOpen} />
          </div>

          <HeaderActions
            onRequest={() => onRequest("maintenance")}
            onNotifications={() => navigate({ label: "Announcements", target: "announcements" })}
            onResident={viewProfile}
            onMenu={openDrawer}
            drawerOpen={drawerOpen}
            menuButtonRef={menuButtonRef}
            resident={resident}
          />
        </div>
      </ScrollAwareHeader>

      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={navigate}
        active={active}
        triggerRef={menuButtonRef}
        resident={resident}
        onProfile={viewProfile}
        onSignOut={handleSignOut}
      />
    </>
  );
}

function ScrollAwareHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.header
      className="fixed left-0 right-0 top-[max(16px,env(safe-area-inset-top))] z-50 px-0"
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.header>
  );
}

function PageTitleIndicator({ active }: { active: string }) {
  return (
    <div className="min-w-0 px-2 text-center lg:hidden">
      <p className="truncate text-sm font-semibold text-[var(--foreground)]">{active}</p>
    </div>
  );
}

type HeaderNavProps = {
  active: string;
  onNavigate: (item: NavAction) => void;
  servicesOpen: boolean;
  setServicesOpen: (open: boolean) => void;
};

function HeaderNav({ active, onNavigate, servicesOpen, setServicesOpen }: HeaderNavProps) {
  return (
    <nav className="hidden items-center gap-1 rounded-full bg-[color:color-mix(in_srgb,var(--surface-muted)_72%,transparent)] p-1 lg:flex" aria-label="Primary navigation">
      {primaryNav.map((item) => (
        <div key={item.label} className="relative">
          <button
            type="button"
            onClick={() => {
              if (item.label === "Services") {
                setServicesOpen(!servicesOpen);
                return;
              }
              onNavigate(item);
            }}
            onMouseEnter={() => item.label === "Services" && setServicesOpen(true)}
            className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent-strong)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
            aria-expanded={item.label === "Services" ? servicesOpen : undefined}
          >
            {active === item.label ? (
              <motion.span layoutId="floating-header-indicator" className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-sm" transition={{ type: "spring", stiffness: 360, damping: 32 }} />
            ) : null}
            <span className="relative">{item.label}</span>
            {item.label === "Services" ? <ChevronDown className="relative h-3.5 w-3.5" aria-hidden /> : null}
          </button>
          {item.label === "Services" ? (
            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  onMouseLeave={() => setServicesOpen(false)}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className="absolute left-0 top-12 w-60 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl shadow-[#2C3E50]/12"
                >
                  {drawerPrimary.slice(2).map((service) => (
                    <DrawerNavButton key={service.label} item={service} onNavigate={onNavigate} compact />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          ) : null}
        </div>
      ))}
    </nav>
  );
}

type HeaderActionsProps = {
  onRequest: () => void;
  onNotifications: () => void;
  onResident: () => void;
  onMenu: () => void;
  drawerOpen: boolean;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
  resident: ReturnType<typeof useAuth>["resident"];
};

function HeaderActions({ onRequest, onNotifications, onResident, onMenu, drawerOpen, menuButtonRef, resident }: HeaderActionsProps) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
      <div className="hidden md:block">
        <button type="button" onClick={onRequest} className="btn-primary h-11 px-4">
          New Request
        </button>
      </div>
      <button
        type="button"
        onClick={onNotifications}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_74%,transparent)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--surface)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
        aria-label="View announcements"
      >
        <Bell className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onResident}
        className="hidden h-10 w-10 place-items-center rounded-full bg-[#C8A97E] text-sm font-semibold text-white transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 sm:grid"
        aria-label={resident ? `View ${resident.name} profile` : "View resident profile"}
      >
        {resident?.initials ?? "RN"}
      </button>
      <MenuTrigger ref={menuButtonRef} open={drawerOpen} onClick={onMenu} />
    </div>
  );
}

const MenuTrigger = function MenuTrigger({
  open,
  onClick,
  ref,
}: {
  open: boolean;
  onClick: () => void;
  ref: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_74%,transparent)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--surface)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
      aria-label="Open navigation menu"
      aria-expanded={open}
      aria-controls="lumina-navigation-drawer"
    >
      <Menu className="h-4 w-4" aria-hidden />
    </button>
  );
};

type NavigationDrawerProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (item: NavAction) => void;
  active: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  resident: ReturnType<typeof useAuth>["resident"];
  onProfile: () => void;
  onSignOut: () => void;
};

function NavigationDrawer({ open, onClose, onNavigate, active, triggerRef, resident, onProfile, onSignOut }: NavigationDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";

    const focusableSelector = "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerElement?.focus();
    };
  }, [onClose, open, triggerRef]);

  const panelTransition: Transition = shouldReduceMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 280, damping: 32 };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-[color:color-mix(in_srgb,var(--surface-strong)_38%,transparent)] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.aside
            id="lumina-navigation-drawer"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Lumina navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={panelTransition}
            className="ml-auto flex h-full w-full max-w-[460px] flex-col overflow-y-auto rounded-l-[1.75rem] border-l border-[var(--border)] bg-[var(--background)] p-5 shadow-2xl shadow-[#2C3E50]/24 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <LuminaMark size="md" />
                <div>
                  <p className="font-heading text-2xl font-semibold text-[var(--foreground)]">Lumina</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">Private Community Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[var(--surface)] p-3 text-[var(--foreground)] shadow-sm transition hover:bg-[var(--surface-muted)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
              className="mt-12 grid gap-8"
              aria-label="Drawer navigation"
            >
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-strong)]">Primary</p>
                <div className="grid gap-2">
                  {drawerPrimary.map((item) => (
                    <DrawerNavButton key={item.label} item={item} active={active === item.label} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-strong)]">Community</p>
                <div className="grid gap-2">
                  {drawerSecondary.map((item) => (
                    <DrawerNavButton key={item.label} item={item} active={active === item.label} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            </motion.nav>

            <ResidentMenuCard resident={resident} onProfile={onProfile} />

            <button
              type="button"
              onClick={() => onNavigate({ label: "New Request", request: "maintenance" })}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--primary-bg)] px-5 py-3 text-sm font-bold text-[var(--primary-fg)] shadow-xl shadow-[#2C3E50]/14 transition hover:bg-[var(--primary-bg-hover)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/24"
            >
              New Request
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>

            <div className="mt-8 grid gap-2 pb-8">
              <UtilityButton icon={Settings} label="Notification preferences" />
              <UtilityButton icon={ShieldAlert} label="Emergency contacts" />
              <UtilityButton icon={CircleHelp} label="Settings" />
              <UtilityButton icon={LogOut} label="Sign out" muted onClick={onSignOut} />
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DrawerNavButton({
  item,
  onNavigate,
  active = false,
  compact = false,
}: {
  item: NavAction;
  onNavigate: (item: NavAction) => void;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <motion.button
      variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } }}
      type="button"
      onClick={() => onNavigate(item)}
      className={`group flex w-full items-center justify-between rounded-2xl text-left font-semibold text-[var(--foreground)] transition hover:bg-[color:color-mix(in_srgb,var(--surface)_86%,transparent)] hover:pl-5 focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 ${
        active ? "bg-[var(--surface)] shadow-sm" : "bg-transparent"
      } ${compact ? "px-4 py-3 text-sm" : "px-4 py-4 text-lg"}`}
    >
      <span>{item.label}</span>
      <ArrowRight className="h-4 w-4 text-[var(--accent)] transition group-hover:translate-x-1" aria-hidden />
    </motion.button>
  );
}

function ResidentMenuCard({ resident, onProfile }: { resident: ReturnType<typeof useAuth>["resident"]; onProfile: () => void }) {
  return (
    <div className="mt-10 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#C8A97E] font-semibold text-white">{resident?.initials ?? "RN"}</div>
        <div>
          <p className="font-heading text-xl font-semibold text-[var(--foreground)]">{resident?.name ?? "Resident"}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{resident?.villa ?? "Lumina"}</p>
        </div>
      </div>
      <button type="button" onClick={onProfile} className="mt-5 w-full rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20">
        View profile
      </button>
    </div>
  );
}

function UtilityButton({ icon: Icon, label, muted = false, onClick }: { icon: LucideIcon; label: string; muted?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 ${
        muted
          ? "text-[var(--muted)] hover:bg-[color:color-mix(in_srgb,var(--surface)_72%,transparent)]"
          : "text-[var(--foreground)] hover:bg-[color:color-mix(in_srgb,var(--surface)_86%,transparent)]"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[var(--accent)]" aria-hidden />
        {label}
      </span>
      <ArrowRight className="h-4 w-4 text-[var(--muted-strong)]" aria-hidden />
    </button>
  );
}

export function MobileBottomAction({ onClick, hidden }: { onClick: () => void; hidden: boolean }) {
  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.button
          type="button"
          onClick={onClick}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          whileTap={{ scale: 0.97 }}
          className="fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-40 mx-auto inline-flex max-w-xs items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-[#2C3E50]/22 transition hover:bg-[var(--accent-strong)] focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/30 md:hidden"
        >
          New Request
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
