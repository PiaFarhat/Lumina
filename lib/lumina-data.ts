import {
  Bell,
  Building2,
  CalendarDays,
  Car,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  ConciergeBell,
  DoorOpen,
  Gem,
  Home,
  LucideIcon,
  Mail,
  MapPin,
  Megaphone,
  PackageCheck,
  ParkingCircle,
  Phone,
  Search,
  Shield,
  Sparkles,
  SprayCan,
  CarTaxiFront,
  Users,
  Wrench,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  action: string;
};

export type Announcement = {
  id?: number;
  userId?: number;
  title: string;
  category: string;
  date: string;
  description: string;
};

export type Resident = {
  id?: number;
  name: string;
  villa: string;
  occupation: string;
  initials: string;
  email?: string;
  phone?: string;
  username?: string;
};

export type MaintenanceStatus = "Submitted" | "Scheduled" | "In Progress" | "Completed";

export type MaintenancePriority = "Low" | "Medium" | "High";

export interface MaintenanceRequest {
  id: number;
  residentId: number;
  title: string;
  category: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  villa: string;
  residentName?: string;
  createdAt: string;
  reference: string;
  description?: string;
}

export type GalleryItem = {
  title: string;
  area: string;
  image: string;
  alt: string;
  height: string;
  position?: string;
};

export interface GalleryAlbum {
  id: number;
  residentId: number;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  photoCount: number;
  location?: string;
  height: string;
  alt: string;
}

export interface GalleryPhoto {
  id: number;
  albumId: number;
  title: string;
  image: string;
  alt: string;
  category: string;
}

export const images = {
  villa: "/img/exterior villa.png",
  logo: "/img/logo.png",
  mark: "/img/lumina-mark.png",
  parking: "/img/parking drive way.png",
  clubhouse: "/img/pool and club house.png",
  compoundRhythm: "/img/the rythm of the compound.png",
  reception: "/img/reception.png",
};

export const navItems = [
  "Home",
  "Announcements",
  "Services",
  "Parking",
  "Residents",
  "Gallery",
  "Contact",
] as const;

export const serviceMenu = ["Maintenance", "Concierge", "Visitor Parking"];

export const metrics = [
  { label: "Residents", value: "286", detail: "Across 74 private villas", icon: Users },
  { label: "Open Requests", value: "12", detail: "4 scheduled today", icon: ClipboardList },
  { label: "Parking Availability", value: "18", detail: "Visitor spaces open", icon: Car },
  { label: "Upcoming Events", value: "7", detail: "This month", icon: CalendarDays },
];

export const services: Service[] = [
  {
    title: "Maintenance",
    description: "Quietly coordinate repairs, inspections, landscaping, and villa care.",
    icon: Wrench,
    action: "Start request",
  },
  {
    title: "Concierge",
    description: "Hospitality support for transport, bookings, errands, and arrivals.",
    icon: ConciergeBell,
    action: "Request help",
  },
  {
    title: "Parking",
    description: "Reserve guest bays and see availability before visitors arrive.",
    icon: ParkingCircle,
    action: "Reserve space",
  },
  {
    title: "Announcements",
    description: "Read community notices, facility changes, and private updates.",
    icon: Megaphone,
    action: "View updates",
  },
];

export const announcements: Announcement[] = [
  {
    title: "North garden lighting upgrade begins Monday",
    category: "Community",
    date: "Aug 10",
    description:
      "Path lighting and entry fixtures will be replaced in three evening phases with quiet-hour limits.",
  },
  {
    title: "Pool terrace reserved for residents evening",
    category: "Events",
    date: "Aug 14",
    description: "A small seasonal gathering with live acoustic music and a chef-led mezze station.",
  },
  {
    title: "Visitor gate lane two maintenance",
    category: "Security",
    date: "Aug 17",
    description: "Guests will be guided through lane one while the access camera is recalibrated.",
  },
];

export const timeline = [
  { status: "Submitted", title: "Villa 12 garden irrigation", time: "09:18", icon: ClipboardList },
  { status: "Scheduled", title: "AC service inspection", time: "11:30", icon: CalendarDays },
  { status: "In Progress", title: "Guest parking reservation", time: "13:45", icon: Car },
  { status: "Completed", title: "Concierge delivery handoff", time: "15:05", icon: CircleCheck },
];

export const fallbackMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 1,
    residentId: 1,
    title: "Villa 12 garden irrigation",
    category: "Landscaping",
    status: "Submitted",
    priority: "Medium",
    villa: "Villa 12",
    residentName: "Maya Haddad",
    createdAt: "2026-08-02",
    reference: "LUM-M-0001",
    description: "Irrigation timing needs review near the north garden edge.",
  },
  {
    id: 2,
    residentId: 2,
    title: "AC service inspection",
    category: "Air Conditioning",
    status: "Scheduled",
    priority: "High",
    villa: "Villa 21",
    residentName: "Karim Nassar",
    createdAt: "2026-08-03",
    reference: "LUM-M-0002",
    description: "Preventive inspection scheduled before the weekend.",
  },
  {
    id: 3,
    residentId: 3,
    title: "Visitor parking gate calibration",
    category: "Security",
    status: "In Progress",
    priority: "Low",
    villa: "Villa 17",
    residentName: "Lea Mansour",
    createdAt: "2026-08-04",
    reference: "LUM-M-0003",
    description: "Gate sensor is being checked after intermittent access delays.",
  },
  {
    id: 4,
    residentId: 4,
    title: "Clubhouse handoff completed",
    category: "General Maintenance",
    status: "Completed",
    priority: "Low",
    villa: "Villa 09",
    residentName: "Omar Khoury",
    createdAt: "2026-08-05",
    reference: "LUM-M-0004",
    description: "Facility handoff and post-event reset are complete.",
  },
];

export const concierge = [
  { title: "Taxi", icon: CarTaxiFront },
  { title: "Cleaning", icon: SprayCan },
  { title: "Facility Booking", icon: DoorOpen },
  { title: "Luggage Assistance", icon: PackageCheck },
  { title: "Delivery", icon: Gem },
];

export const residents: Resident[] = [
  { name: "Maya Haddad", villa: "Villa 08", occupation: "Interior Architect", initials: "MH" },
  { name: "Karim Nassar", villa: "Villa 21", occupation: "Product Director", initials: "KN" },
  { name: "Lina Farah", villa: "Villa 36", occupation: "Gallery Curator", initials: "LF" },
];

export const gallery: GalleryItem[] = [
  {
    title: "Arrival Court",
    area: "East Gate",
    image: images.reception,
    alt: "Lumina entrance gate with illuminated signage and landscaped arrival drive",
    height: "h-80",
  },
  {
    title: "Pool Terrace",
    area: "Clubhouse",
    image: images.clubhouse,
    alt: "Lumina clubhouse pool terrace at dusk with lounge seating",
    height: "h-96",
  },
  {
    title: "Villa Facade",
    area: "Residence Lane",
    image: images.villa,
    alt: "Modern Lumina villa exterior with landscaped garden and driveway",
    height: "h-72",
  },
  {
    title: "Visitor Parking",
    area: "Arrival Drive",
    image: images.parking,
    alt: "Lumina visitor parking driveway with covered bays and evening lighting",
    height: "h-96",
  },
  {
    title: "Clubhouse Lounge",
    area: "Amenities",
    image: images.clubhouse,
    alt: "Pool and clubhouse amenity area with warm architectural lighting",
    height: "h-72",
  },
  {
    title: "Residence Lane",
    area: "Private Villas",
    image: images.villa,
    alt: "Luxury villa frontage within the Lumina residential community",
    height: "h-80",
  },
];

export const events = [
  {
    title: "Courtyard Dinner",
    date: "Fri, 7 PM",
    location: "Central Court",
    image: "/img/event-sections/clubhouse-pool-clean.png",
    alt: "Lumina clubhouse pool terrace prepared for an evening community gathering",
  },
  {
    title: "Morning Pilates",
    date: "Sat, 8 AM",
    location: "Wellness Lawn",
    image: "/img/event-sections/wellness-studio-clean.png",
    alt: "Lumina wellness studio with reformers and garden views",
  },
  {
    title: "Architecture Walk",
    date: "Sun, 5 PM",
    location: "East Promenade",
    image: "/img/event-sections/garden-walk-clean.png",
    alt: "Tree-lined Lumina garden promenade between residential buildings",
  },
  {
    title: "Family Cinema",
    date: "Thu, 8 PM",
    location: "Pool Terrace",
    image: "/img/event-sections/clubhouse-pool-clean.png",
    alt: "Lumina clubhouse pool terrace used for evening resident gatherings",
  },
];

export const contact = [
  { label: "Office", value: "Clubhouse, Level 1", icon: Building2 },
  { label: "Security", value: "+961 01 555 018", icon: Shield },
  { label: "Emergency", value: "+961 70 000 911", icon: Phone },
  { label: "Email", value: "residents@lumina.community", icon: Mail },
];

export const formOptions = {
  maintenance: ["Appliance", "Electrical", "Landscaping", "Pool", "General"],
  concierge: ["Taxi", "Cleaning", "Facility Booking", "Luggage Assistance", "Delivery"],
  parking: ["2 hours", "Half day", "Full day", "Overnight"],
};

export const uiIcons = {
  Bell,
  ChevronRight,
  Home,
  MapPin,
  Search,
  Sparkles,
};
