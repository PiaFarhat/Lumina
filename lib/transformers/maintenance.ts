import type { JsonPlaceholderTodo } from "@/types/api";
import type {
  MaintenancePriority,
  MaintenanceRequest,
  MaintenanceStatus,
  Resident,
} from "@/lib/lumina-data";

const categories = [
  "Plumbing",
  "Electrical",
  "Air Conditioning",
  "Landscaping",
  "Security",
  "General Maintenance",
] as const;

const priorities = ["Low", "Medium", "High"] as const;

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function mapTodoStatus(todo: JsonPlaceholderTodo): MaintenanceStatus {
  if (todo.completed) {
    return "Completed";
  }

  const remainder = todo.id % 3;

  if (remainder === 0) {
    return "Scheduled";
  }

  if (remainder === 1) {
    return "Submitted";
  }

  return "In Progress";
}

function getCategory(id: number) {
  return categories[id % categories.length];
}

function getPriority(id: number): MaintenancePriority {
  return priorities[id % priorities.length];
}

function getVillaNumber(userId: number) {
  return `Villa ${100 + userId}`;
}

function getReference(id: number) {
  return `LUM-M-${String(id).padStart(4, "0")}`;
}

function getRequestDate(id: number) {
  const day = (id % 28) + 1;
  return `2026-08-${String(day).padStart(2, "0")}`;
}

export function transformTodoToMaintenanceRequest(
  todo: JsonPlaceholderTodo,
  residentsById: Map<number, Resident>,
): MaintenanceRequest {
  const resident = residentsById.get(todo.userId);

  return {
    id: todo.id,
    residentId: todo.userId,
    title: sentenceCase(todo.title),
    category: getCategory(todo.id),
    status: mapTodoStatus(todo),
    priority: getPriority(todo.id),
    villa: resident?.villa ?? getVillaNumber(todo.userId),
    residentName: resident?.name,
    createdAt: getRequestDate(todo.id),
    reference: getReference(todo.id),
    description: `${getCategory(todo.id)} request coordinated through the Lumina resident desk.`,
  };
}

export function transformTodosToMaintenanceRequests(
  todos: JsonPlaceholderTodo[],
  residents: Resident[],
): MaintenanceRequest[] {
  const residentsById = new Map(
    residents
      .filter((resident): resident is Resident & { id: number } => typeof resident.id === "number")
      .map((resident) => [resident.id, resident]),
  );

  return todos.map((todo) => transformTodoToMaintenanceRequest(todo, residentsById));
}
