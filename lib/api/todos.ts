import type { JsonPlaceholderTodo } from "@/types/api";
import { apiFetch } from "./client";

export function getTodos(signal?: AbortSignal): Promise<JsonPlaceholderTodo[]> {
  return apiFetch<JsonPlaceholderTodo[]>("/todos", signal);
}

export function getTodosByUserId(userId: number, signal?: AbortSignal): Promise<JsonPlaceholderTodo[]> {
  return apiFetch<JsonPlaceholderTodo[]>(`/users/${userId}/todos`, signal);
}
