import { apiClient } from './client';
import type { User, UsersResponse } from '../types';

const PAGE_SIZE = 30;

/**
 * Fetch a paginated list of users.
 */
export const fetchUsers = async (skip = 0): Promise<UsersResponse> => {
  return apiClient.request<UsersResponse>(
    `/users?limit=${PAGE_SIZE}&skip=${skip}&select=id,firstName,lastName,email,image,company,age`,
  );
}

/**
 * Fetch a single user by ID.
 */
export const fetchUserById = async (id: number): Promise<User> => {
  return apiClient.request<User>(`/users/${id}`);
}

/**
 * Search users by query string.
 */
export const searchUsers = async (query: string): Promise<UsersResponse> => {
  return apiClient.request<UsersResponse>(
    `/users/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}`,
  );
}
