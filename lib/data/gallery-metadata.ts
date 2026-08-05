import { gallery, images } from "@/lib/lumina-data";

export const localGalleryImages = [
  images.villa,
  images.clubhouse,
  images.reception,
  images.compoundRhythm,
  images.parking,
] as const;

export const albumMetadata: Record<
  number,
  {
    title: string;
    category: string;
    description: string;
    coverImage: string;
    location: string;
    height: string;
    alt: string;
  }
> = {
  1: {
    title: "Lumina Villas",
    category: "Architecture",
    description: "Contemporary homes shaped by light, privacy, and landscape.",
    coverImage: images.villa,
    location: "Residential Quarter",
    height: "h-80",
    alt: "Modern Lumina villa exterior with landscaped garden and driveway",
  },
  2: {
    title: "Clubhouse and Pool",
    category: "Amenities",
    description: "Poolside spaces arranged for calm mornings and private evenings.",
    coverImage: images.clubhouse,
    location: "Clubhouse",
    height: "h-96",
    alt: "Lumina clubhouse pool terrace with lounge seating",
  },
  3: {
    title: "Community Entrance",
    category: "Arrival",
    description: "A composed gate experience with security and hospitality in view.",
    coverImage: images.reception,
    location: "East Gate",
    height: "h-72",
    alt: "Lumina entrance gate with illuminated signage and landscaped arrival drive",
  },
  4: {
    title: "Landscaped Walkways",
    category: "Landscape",
    description: "Garden paths and residential rhythm across the compound.",
    coverImage: images.compoundRhythm,
    location: "Garden Walk",
    height: "h-96",
    alt: "Lumina residential compound with landscaped walking paths and villas",
  },
  5: {
    title: "Visitor Parking",
    category: "Arrival",
    description: "Covered bays and arrival lanes planned for easy guest flow.",
    coverImage: images.parking,
    location: "Arrival Drive",
    height: "h-72",
    alt: "Lumina visitor parking driveway with covered bays",
  },
  6: {
    title: "Community Evenings",
    category: "Events",
    description: "Shared spaces prepared for resident dinners and seasonal gatherings.",
    coverImage: images.clubhouse,
    location: "Central Court",
    height: "h-80",
    alt: "Lumina clubhouse terrace prepared for an evening community gathering",
  },
};

export const fallbackGalleryAlbums = gallery.map((item, index) => ({
  id: index + 1,
  residentId: index + 1,
  title: item.title,
  category: item.area,
  description: "A Lumina architectural moment from the local gallery collection.",
  coverImage: item.image,
  photoCount: 6,
  location: item.area,
  height: item.height,
  alt: item.alt,
}));
