import type {
  JsonPlaceholderCommentResponse,
  JsonPlaceholderPostResponse,
} from "@/types/api";
import type {
  ConciergeFormInput,
  ContactFormInput,
  MaintenanceFormInput,
  ParkingFormInput,
} from "@/types/forms";
import { postJson } from "./client";

type JsonPlaceholderPostBody = {
  userId: number;
  title: string;
  body: string;
};

type JsonPlaceholderCommentBody = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

function compactPayload<T extends Record<string, string | undefined>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => typeof value === "string" && value.trim().length > 0),
  );
}

function assertPostResponse(response: JsonPlaceholderPostResponse): JsonPlaceholderPostResponse {
  if (typeof response.id !== "number" || typeof response.title !== "string" || typeof response.body !== "string") {
    throw new Error("Unexpected post response shape");
  }

  return response;
}

function assertCommentResponse(response: JsonPlaceholderCommentResponse): JsonPlaceholderCommentResponse {
  if (typeof response.id !== "number" || typeof response.body !== "string") {
    throw new Error("Unexpected comment response shape");
  }

  return response;
}

export async function createMaintenanceRequest(input: MaintenanceFormInput) {
  const response = await postJson<JsonPlaceholderPostResponse, JsonPlaceholderPostBody>("/posts", {
    userId: 1,
    title: `Maintenance: ${input.category}`,
    body: JSON.stringify(
      compactPayload({
        residentName: input.residentName,
        villa: input.villa,
        preferredDate: input.preferredDate,
        details: input.details,
      }),
    ),
  });

  return assertPostResponse(response);
}

export async function createConciergeRequest(input: ConciergeFormInput) {
  const response = await postJson<JsonPlaceholderPostResponse, JsonPlaceholderPostBody>("/posts", {
    userId: 1,
    title: `Concierge: ${input.service}`,
    body: JSON.stringify(
      compactPayload({
        residentName: input.residentName,
        villa: input.villa,
        preferredDate: input.preferredDate,
        details: input.details,
      }),
    ),
  });

  return assertPostResponse(response);
}

export async function createParkingReservation(input: ParkingFormInput) {
  const response = await postJson<JsonPlaceholderPostResponse, JsonPlaceholderPostBody>("/posts", {
    userId: 1,
    title: `Visitor Parking: ${input.parkingBay}`,
    body: JSON.stringify(
      compactPayload({
        residentName: input.residentName,
        villa: input.villa,
        visitorName: input.visitorName,
        parkingBay: input.parkingBay,
        duration: input.duration,
        arrivalDate: input.arrivalDate,
        notes: input.notes,
      }),
    ),
  });

  return assertPostResponse(response);
}

export async function createContactMessage(input: ContactFormInput) {
  const response = await postJson<JsonPlaceholderCommentResponse, JsonPlaceholderCommentBody>("/comments", {
    postId: 1,
    name: input.residentName,
    email: "",
    body: JSON.stringify(
      compactPayload({
        villa: input.villa,
        category: input.category,
        preferredDate: input.preferredDate,
        details: input.details,
      }),
    ),
  });

  return assertCommentResponse(response);
}
