import { residents as localResidents, Resident } from "@/lib/lumina-data";
import { JsonPlaceholderUser } from "@/types/api";
import { getJson } from "./client";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function mapUserToResident(user: JsonPlaceholderUser, index: number): Resident {
  const localMeta = localResidents[index % localResidents.length];

  return {
    id: user.id,
    name: user.name,
    villa: localMeta?.villa ?? `Villa ${String(index + 1).padStart(2, "0")}`,
    occupation: localMeta?.occupation ?? user.company.name,
    initials: initialsFromName(user.name),
    email: user.email,
    phone: user.phone,
    username: user.username,
  };
}

export async function getResidents(signal?: AbortSignal): Promise<Resident[]> {
  const users = await getJson<JsonPlaceholderUser[]>("/users", signal);
  return users.map(mapUserToResident);
}
