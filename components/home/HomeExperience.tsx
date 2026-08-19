"use client";

import { useState } from "react";
import { AuthGuard } from "../auth/AuthGuard";
import type { GalleryAlbum, MaintenanceRequest } from "@/lib/lumina-data";
import { RequestKind, RequestModal } from "../forms/RequestModal";
import { Footer } from "../layout/Footer";
import { FloatingHeader, MobileBottomAction } from "../navigation/FloatingHeader";
import { HeroSection } from "./HeroSection";
import { EditorialShowcase } from "../sections/EditorialShowcase";
import { LuminaJourney } from "../sections/LuminaJourney";
import { LuminaStandard } from "../sections/LuminaStandard";
import { LuminaValues } from "../sections/LuminaValues";
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

type HomeExperienceProps = {
  maintenanceRequests: MaintenanceRequest[];
  maintenanceSource: "api" | "fallback";
  galleryAlbums: GalleryAlbum[];
  gallerySource: "api" | "fallback";
};

export function HomeExperience({
  maintenanceRequests,
  maintenanceSource,
  galleryAlbums,
  gallerySource,
}: HomeExperienceProps) {
  const [request, setRequest] = useState<RequestKind>("maintenance");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openRequest(kind: RequestKind) {
    setRequest(kind);
    setModalOpen(true);
  }

  return (
    <AuthGuard>
      <div className="min-h-dvh bg-[#F4F1EA] pb-24 text-[#2C3E50] md:pb-0">
        <FloatingHeader onRequest={openRequest} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <main>
          <HeroSection onRequest={openRequest} />
          <CommunityOverview />
          <EditorialShowcase />
          <LuminaStandard />
          <LuminaValues />
          <LuminaJourney />
          <QuickServices onRequest={openRequest} />
          <AnnouncementsSection />
          <RequestStatus requests={maintenanceRequests} source={maintenanceSource} />
          <ConciergeSection onRequest={openRequest} />
          <ParkingSection onRequest={openRequest} />
          <EventsSection />
          <ResidentsGalleryContact onRequest={openRequest} galleryAlbums={galleryAlbums} gallerySource={gallerySource} />
        </main>
        <Footer />
        <MobileBottomAction onClick={() => openRequest("maintenance")} hidden={modalOpen || drawerOpen} />
        <RequestModal open={modalOpen} kind={request} onClose={() => setModalOpen(false)} />
      </div>
    </AuthGuard>
  );
}
