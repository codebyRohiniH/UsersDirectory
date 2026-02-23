const BASE_URL = 'https://dummyjson.com';

/**
 * API client using the built-in fetch API.
 * Centralises base URL, error handling, and JSON parsing.
 */
const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = { request };
