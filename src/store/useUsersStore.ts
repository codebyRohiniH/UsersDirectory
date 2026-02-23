import { create } from 'zustand';
import { fetchUsers, searchUsers } from '../api';
import type { User } from '../types';

interface UsersState {
  /* Data */
  users: User[];
  total: number;
  skip: number;

  /* UI flags */
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  error: string | null;

  /* Search */
  searchQuery: string;
  isSearching: boolean;

  /* Actions */
  loadUsers: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  search: (query: string) => Promise<void>;
  clearSearch: () => Promise<void>;
}

const loadFirstPage = async (): Promise<Partial<UsersState>> => {
  const data = await fetchUsers(0);
  return {
    users: data.users,
    total: data.total,
    skip: data.limit,
  };
};

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  total: 0,
  skip: 0,
  loading: false,
  refreshing: false,
  loadingMore: false,
  error: null,
  searchQuery: '',
  isSearching: false,

  loadUsers: async () => {
    set({ loading: true, error: null });
    try {
      const patch = await loadFirstPage();
      set({ ...patch, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load users',
      });
    }
  },

  loadMore: async () => {
    const { skip, total, loadingMore, isSearching } = get();
    if (loadingMore || skip >= total || isSearching) return;

    set({ loadingMore: true });
    try {
      const data = await fetchUsers(skip);
      set((state) => ({
        users: [...state.users, ...data.users],
        skip: state.skip + data.limit,
        loadingMore: false,
      }));
    } catch (err) {
      set({
        loadingMore: false,
        error: err instanceof Error ? err.message : 'Failed to load more users',
      });
    }
  },

  refresh: async () => {
    const { isSearching, searchQuery } = get();
    set({ refreshing: true, error: null });
    try {
      if (isSearching) {
        const data = await searchUsers(searchQuery);
        set({
          users: data.users,
          total: data.total,
          skip: 0,
          refreshing: false,
        });
      } else {
        const patch = await loadFirstPage();
        set({ ...patch, refreshing: false });
      }
    } catch (err) {
      set({
        refreshing: false,
        error: err instanceof Error ? err.message : 'Failed to refresh',
      });
    }
  },

  search: async (query: string) => {
    if (!query.trim()) {
      return get().clearSearch();
    }
    set({ loading: true, error: null, searchQuery: query, isSearching: true });
    try {
      const data = await searchUsers(query);
      set({
        users: data.users,
        total: data.total,
        skip: 0,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Search failed',
      });
    }
  },

  clearSearch: async () => {
    set({ searchQuery: '', isSearching: false, loading: true, error: null });
    try {
      const patch = await loadFirstPage();
      set({ ...patch, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load users',
      });
    }
  },
}));
