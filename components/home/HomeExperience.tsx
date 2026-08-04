"use client";

import { useState } from "react";
import { RequestKind, RequestModal } from "../forms/RequestModal";
import { Footer } from "../layout/Footer";
import { FloatingHeader, MobileBottomAction } from "../navigation/FloatingHeader";
import { HeroSection } from "./HeroSection";
import {
  AnnouncementsSection,
  CommunityOverview,
  ConciergeSection,
  EventsSection,
  ParkingSection,
  QuickServices,
  RequestStatus,
  ResidentsGalleryContact,
} from "../sections/HomeSections";

export function HomeExperience() {
  const [request, setRequest] = useState<RequestKind>("maintenance");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openRequest(kind: RequestKind) {
    setRequest(kind);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F1EA] pb-28 text-[#2C3E50] md:pb-0">
      <FloatingHeader onRequest={openRequest} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <main>
        <HeroSection onRequest={openRequest} />
        <CommunityOverview />
        <QuickServices onRequest={openRequest} />
        <AnnouncementsSection />
        <RequestStatus />
        <ConciergeSection onRequest={openRequest} />
        <ParkingSection onRequest={openRequest} />
        <EventsSection />
        <ResidentsGalleryContact onRequest={openRequest} />
      </main>
      <Footer />
      <MobileBottomAction onClick={() => openRequest("maintenance")} hidden={modalOpen || drawerOpen} />
      <RequestModal open={modalOpen} kind={request} onClose={() => setModalOpen(false)} />
    </div>
  );
}
