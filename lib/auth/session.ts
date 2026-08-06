import { mapUserToResident } from "@/lib/api/residents";
import type { JsonPlaceholderUser } from "@/types/api";

export const AUTH_STORAGE_KEY = "lumina-auth-user";

export interface AuthenticatedResident {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  city: string;
  villa: string;
  initials: string;
}

export function mapUserToAuthenticatedResident(user: JsonPlaceholderUser): AuthenticatedResident {
  const resident = mapUserToResident(user, user.id - 1);

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    companyName: user.company.name,
    city: user.address.city,
    villa: resident.villa,
    initials: resident.initials,
  };
}

export function getStoredResident(): AuthenticatedResident | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<AuthenticatedResident>;
    if (
      typeof parsed.id !== "number" ||
      typeof parsed.name !== "string" ||
      typeof parsed.username !== "string" ||
      typeof parsed.email !== "string"
    ) {
      return null;
    }

    return parsed as AuthenticatedResident;
  } catch {
    return null;
  }
}

export function storeResident(resident: AuthenticatedResident) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(resident));
}

export function clearStoredResident() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
