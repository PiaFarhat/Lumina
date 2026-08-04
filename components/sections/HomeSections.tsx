"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin, ParkingCircle, Send } from "lucide-react";
import Image from "next/image";
import { announcements, concierge, contact, events, gallery, images, metrics, residents, services, timeline } from "@/lib/lumina-data";
import { RequestKind } from "../forms/RequestModal";
import { EmptyState } from "../ui/EmptyState";
import { fadeUp, stagger } from "../ui/motion";
import { SearchBar } from "../ui/SearchBar";
import { SectionHeading } from "../ui/SectionHeading";
import { StatusBadge } from "../ui/StatusBadge";

type HomeSectionsProps = {
  onRequest: (kind: RequestKind) => void;
};

export function CommunityOverview() {
  return (
    <section id="overview" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Community Overview" title="A composed view of everything moving through Lumina." description="Metrics are arranged for scanning, not boxed into a generic dashboard." />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 grid gap-5 lg:grid-cols-12">
          <motion.article variants={fadeUp} className="relative min-h-96 overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white shadow-sm lg:col-span-7 lg:row-span-2">
            <Image
              src={images.reception}
              alt="Lumina entrance gate with illuminated signage and landscaped arrival drive"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,62,80,0.72),rgba(44,62,80,0.08))]" />
            <div className="absolute bottom-0 max-w-md p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C8A97E]">Arrival</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">A composed first impression, every day.</h3>
              <p className="mt-4 text-sm leading-7 text-white/76">Gate access, security, visitor flow, and community operations are surfaced with the same calm precision as the architecture.</p>
            </div>
          </motion.article>
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.article key={metric.label} variants={fadeUp} className="rounded-[2rem] border border-[#D8D4CC] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2C3E50]/8 lg:col-span-5">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#8FA89B]" aria-hidden />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#7A92A3]">Live</span>
                </div>
                <p className="mt-8 font-heading text-4xl font-semibold text-[#2C3E50] sm:text-5xl">{metric.value}</p>
                <h3 className="mt-4 text-lg font-semibold text-[#2C3E50]">{metric.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6E6E6E]">{metric.detail}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export function QuickServices({ onRequest }: HomeSectionsProps) {
  return (
    <section id="services" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Quick Services" title="Resident requests with hospitality-level clarity." />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.title}
                type="button"
                variants={fadeUp}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRequest(service.title === "Maintenance" ? "maintenance" : service.title === "Concierge" ? "concierge" : service.title === "Parking" ? "parking" : "contact")}
                className="group rounded-[1.75rem] border border-[#D8D4CC] bg-white p-7 text-left shadow-sm transition hover:border-[#8FA89B] hover:shadow-xl hover:shadow-[#2C3E50]/8 focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 md:rounded-[2rem]"
              >
                <Icon className="h-7 w-7 text-[#2C3E50] transition group-hover:-translate-y-1 group-hover:text-[#789285]" aria-hidden />
                <h3 className="mt-6 font-heading text-2xl font-semibold text-[#2C3E50] md:mt-10">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6E6E6E] md:mt-4 md:min-h-24">{service.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#789285]">
                  {service.action}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export function AnnouncementsSection() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => announcements.filter((item) => `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <section id="announcements" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <SectionHeading eyebrow="Announcements" title="Notices that feel considered, not broadcast." />
          <SearchBar value={query} onChange={setQuery} placeholder="Search updates" />
        </div>
        {filtered.length ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <motion.article whileHover={{ y: -4 }} className="relative min-h-96 overflow-hidden rounded-[2rem] bg-[#2C3E50] p-8 text-white lg:col-span-2">
              <Image src={images.clubhouse} alt="Lumina clubhouse pool terrace prepared for a resident evening event" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover opacity-62" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,62,80,0.9),rgba(44,62,80,0.3))]" />
              <div className="relative">
                <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">{filtered[0].category}</span>
                <h3 className="mt-20 max-w-2xl font-heading text-3xl font-semibold sm:mt-28 sm:text-4xl">{filtered[0].title}</h3>
                <p className="mt-5 max-w-2xl leading-7 text-white/78">{filtered[0].description}</p>
                <p className="mt-8 text-sm text-white/68">{filtered[0].date}</p>
              </div>
            </motion.article>
            <div className="grid gap-5">
              {filtered.slice(1).map((item) => (
                <motion.article whileHover={{ y: -4 }} key={item.title} className="rounded-[2rem] border border-[#D8D4CC] bg-[#F4F1EA] p-6 transition-shadow hover:shadow-xl hover:shadow-[#2C3E50]/8">
                  <span className="rounded-full border border-[#D8D4CC] bg-white px-3 py-1 text-xs font-semibold text-[#789285]">{item.category}</span>
                  <h3 className="mt-8 font-heading text-2xl font-semibold text-[#2C3E50]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6E6E6E]">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12"><EmptyState title="No announcements match your search." /></div>
        )}
      </div>
    </section>
  );
}

export function RequestStatus() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Request Status" title="A quiet timeline for active work." />
        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {timeline.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <Icon className="h-5 w-5 text-[#8FA89B]" aria-hidden />
                  <StatusBadge status={item.status} />
                </div>
                <h3 className="mt-10 font-heading text-xl font-semibold text-[#2C3E50]">{item.title}</h3>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#6E6E6E]"><Clock className="h-4 w-4" aria-hidden />{item.time}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ConciergeSection({ onRequest }: HomeSectionsProps) {
  return (
    <section className="bg-[#2C3E50] px-4 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#C8A97E]">Concierge</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">Hospitality built into daily residence.</h2>
          <p className="mt-6 text-lg leading-8 text-white/68">Coordinate transport, home care, deliveries, and facility access with a calm, private workflow.</p>
          <button type="button" onClick={() => onRequest("concierge")} className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2C3E50] transition hover:bg-[#F4F1EA] focus:outline-none focus:ring-4 focus:ring-white/30">
            Request Concierge
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-white/12 sm:col-span-2">
            <Image src={images.clubhouse} alt="Lumina clubhouse amenities with poolside lounge seating" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(44,62,80,0.7))]" />
            <div className="absolute bottom-0 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Amenities</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">Clubhouse support, handled privately.</h3>
            </div>
          </div>
          {concierge.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/12 bg-white/8 p-6">
                <Icon className="h-6 w-6 text-[#C8A97E]" aria-hidden />
                <h3 className="mt-10 font-heading text-2xl font-semibold">{item.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ParkingSection({ onRequest }: HomeSectionsProps) {
  const [selectedSpace, setSelectedSpace] = useState<number | null>(2);
  const spaces = Array.from({ length: 36 }, (_, index) => ({ id: index + 1, reserved: [3, 4, 8, 9, 12, 17, 18, 22, 25, 29, 33, 34].includes(index + 1) }));
  const available = spaces.filter((space) => !space.reserved).length;
  const reserved = spaces.length - available;

  return (
    <section id="parking" className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Parking" title="Visitor arrival, visually managed." description="Availability, reserved bays, and occupancy are readable at a glance." />
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            <div><p className="font-heading text-4xl font-semibold text-[#2C3E50]">{available}</p><p className="text-sm text-[#6E6E6E]">Available spaces</p></div>
            <div><p className="font-heading text-4xl font-semibold text-[#2C3E50]">{reserved}</p><p className="text-sm text-[#6E6E6E]">Reserved spaces</p></div>
            <div><p className="font-heading text-4xl font-semibold text-[#2C3E50]">67%</p><p className="text-sm text-[#6E6E6E]">Occupancy</p></div>
          </div>
          <button type="button" onClick={() => onRequest("parking")} className="btn-primary mt-9">
            <ParkingCircle className="h-4 w-4" aria-hidden />
            Reserve Parking
          </button>
        </div>
        <div className="rounded-[2rem] border border-[#D8D4CC] bg-white p-5 shadow-sm">
          <div className="relative mb-5 h-64 overflow-hidden rounded-[1.5rem]">
            <Image src={images.parking} alt="Lumina visitor parking driveway with covered parking spaces" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,62,80,0.04),rgba(44,62,80,0.46))]" />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/88 px-4 py-3 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#789285]">Selected bay</p>
              <p className="mt-1 font-heading text-2xl font-semibold text-[#2C3E50]">{selectedSpace ? `P-${String(selectedSpace).padStart(2, "0")}` : "Choose a bay"}</p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {spaces.map((space) => (
              <motion.button
                key={space.id}
                type="button"
                whileTap={{ scale: space.reserved ? 1 : 0.94 }}
                onClick={() => {
                  if (!space.reserved) setSelectedSpace(space.id);
                }}
                className={`aspect-square rounded-lg border text-[0.68rem] font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20 sm:aspect-[1.25] sm:rounded-xl sm:text-xs ${
                  space.reserved
                    ? "border-[#D8D4CC] bg-[#F4F1EA] text-[#7A92A3]"
                    : selectedSpace === space.id
                      ? "border-[#2C3E50] bg-[#2C3E50] text-white shadow-lg shadow-[#2C3E50]/18"
                      : "border-[#8FA89B]/50 bg-[#8FA89B]/14 text-[#2C3E50] hover:bg-[#8FA89B]/24"
                }`}
                aria-label={`Parking space ${space.id} ${space.reserved ? "reserved" : "available"}`}
              >
                {space.id}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Community Events" title="The rhythm of the compound." />
          <div className="hidden gap-2 sm:flex">
            <button className="event-prev rounded-full border border-[#D8D4CC] p-3 text-[#2C3E50] hover:bg-[#F4F1EA]" aria-label="Previous event"><ChevronLeft className="h-5 w-5" /></button>
            <button className="event-next rounded-full border border-[#D8D4CC] p-3 text-[#2C3E50] hover:bg-[#F4F1EA]" aria-label="Next event"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <Swiper modules={[Navigation, A11y]} navigation={{ prevEl: ".event-prev", nextEl: ".event-next" }} spaceBetween={20} slidesPerView={1.1} breakpoints={{ 768: { slidesPerView: 2.2 }, 1180: { slidesPerView: 3.2 } }} className="mt-12 !overflow-visible">
          {events.map((event) => (
            <SwiperSlide key={event.title}>
              <article className="group relative min-h-80 overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-[#F4F1EA] p-7">
                <Image src={event.image} alt={event.alt} fill sizes="(min-width: 1180px) 32vw, (min-width: 768px) 45vw, 90vw" className="scale-[1.01] object-cover object-center transition duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,62,80,0.04),rgba(44,62,80,0.78))]" />
                <div className="relative flex min-h-64 flex-col justify-end text-white">
                  <p className="text-sm font-semibold text-[#F4F1EA]">{event.date}</p>
                  <h3 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">{event.title}</h3>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/74"><MapPin className="h-4 w-4" aria-hidden />{event.location}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function ResidentsGalleryContact({ onRequest }: HomeSectionsProps) {
  const [activeGallery, setActiveGallery] = useState<(typeof gallery)[number] | null>(null);

  return (
    <>
      <section id="residents" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Residents" title="A private preview of the people who shape Lumina." />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white">
              <Image src={images.villa} alt="Lumina villa exterior in a landscaped private residential lane" fill sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(44,62,80,0.58))]" />
              <div className="absolute bottom-0 p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Residences</p>
                <h3 className="mt-4 max-w-xl font-heading text-3xl font-semibold sm:text-4xl">Private villas, connected community.</h3>
              </div>
            </div>
            <div className="grid gap-5">
            {residents.map((resident) => (
              <motion.article whileHover={{ y: -4 }} key={resident.name} className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-[#2C3E50]/8">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#2C3E50] font-heading text-lg font-semibold text-white">{resident.initials}</div>
                <p className="mt-6 text-sm font-semibold text-[#8FA89B]">{resident.villa}</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-[#2C3E50]">{resident.name}</h3>
                <p className="mt-2 text-sm text-[#6E6E6E]">{resident.occupation}</p>
                <button className="mt-7 text-sm font-semibold text-[#789285]">View Profile</button>
              </motion.article>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section id="gallery" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" title="Architectural moments across the community." />
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.map((item) => (
              <button type="button" onClick={() => setActiveGallery(item)} key={item.title} className={`group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[2rem] border border-[#D8D4CC] bg-white text-left ${item.height} focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/20`}>
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(44,62,80,0.66))] opacity-80 transition group-hover:opacity-100" />
                <div className="absolute bottom-0 p-6 text-white opacity-0 transition group-hover:opacity-100">
                  <p className="text-sm">{item.area}</p>
                  <h3 className="font-heading text-2xl font-semibold">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Contact" title="Clear lines for office, security, and urgent needs." />
          <div className="rounded-[2rem] border border-[#D8D4CC] bg-white p-6">
            <div className="relative mb-5 h-72 overflow-hidden rounded-[1.5rem]">
              <Image src={images.reception} alt="Lumina reception gate and security entrance" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover transition duration-700 hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(44,62,80,0.54))]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contact.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-3xl bg-[#F4F1EA] p-5">
                    <Icon className="h-5 w-5 text-[#8FA89B]" aria-hidden />
                    <p className="mt-8 text-sm font-semibold text-[#2C3E50]">{item.label}</p>
                    <p className="mt-2 text-sm text-[#6E6E6E]">{item.value}</p>
                  </div>
                );
              })}
            </div>
            <button type="button" onClick={() => onRequest("contact")} className="btn-primary mt-6">
              <Send className="h-4 w-4" aria-hidden />
              Send Message
            </button>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {activeGallery ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2C3E50]/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeGallery.title} gallery image`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveGallery(null);
            }}
          >
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.28 }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <div className="relative h-[72vh] max-h-[760px] min-h-96">
                <Image src={activeGallery.image} alt={activeGallery.alt} fill sizes="90vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(44,62,80,0.78))] p-7 text-white">
                  <p className="text-sm">{activeGallery.area}</p>
                  <h3 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">{activeGallery.title}</h3>
                </div>
                <button type="button" onClick={() => setActiveGallery(null)} className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2C3E50] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/30">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
