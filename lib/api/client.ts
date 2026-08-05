const JSONPLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";

export class JsonPlaceholderError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "JsonPlaceholderError";
  }
}

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${JSONPLACEHOLDER_BASE_URL}${path}`, {
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new JsonPlaceholderError(`JSONPlaceholder request failed: ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}

export function apiFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  return getJson<T>(path, signal);
}

export async function postJson<TResponse, TBody extends object>(
  path: string,
  body: TBody,
  signal?: AbortSignal,
): Promise<TResponse> {
  const response = await fetch(`${JSONPLACEHOLDER_BASE_URL}${path}`, {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new JsonPlaceholderError(`JSONPlaceholder request failed: ${response.status}`, response.status);
  }

  return response.json() as Promise<TResponse>;
}
