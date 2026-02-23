import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';
import { useUsersStore } from '../../store';


jest.mock('../../api', () => ({
  fetchUsers: jest.fn(),
  searchUsers: jest.fn(),
}));

const { fetchUsers, searchUsers } = require('../../api');

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate } as any;
const mockRoute = { params: undefined } as any;

const mockUsers = [
  {
    id: 1,
    firstName: 'Test1',
    lastName: 'User',
    email: 'test1@user.com',
    image: 'https://example.com/john.png',
    company: { title: 'Developer', name: 'Acme', department: 'Eng' },
    age: 30,
  },
  {
    id: 2,
    firstName: 'Test2',
    lastName: 'User',
    email: 'test2@user.com',
    image: 'https://example.com/jane.png',
    company: { title: 'Designer', name: 'Acme', department: 'Design' },
    age: 25,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  useUsersStore.setState({
    users: [],
    total: 0,
    skip: 0,
    loading: false,
    refreshing: false,
    loadingMore: false,
    error: null,
    searchQuery: '',
    isSearching: false,
  });
});

describe('HomeScreen', () => {
  it('shows loading state initially', () => {
    // GIVEN
    fetchUsers.mockReturnValue(new Promise(() => {})); // never resolves
    useUsersStore.setState({ loading: true });

    // WHEN
    render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

    // THEN
    expect(screen.getByTestId('initial-loading')).toBeTruthy();
  });

  it('renders user list after loading', async () => {
    // GIVEN
    fetchUsers.mockResolvedValueOnce({
      users: mockUsers,
      total: 2,
      skip: 0,
      limit: 30,
    });

    // WHEN
    render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });
    expect(screen.getByTestId('user-item-1')).toBeTruthy();
    expect(screen.getByTestId('user-item-2')).toBeTruthy();
    expect(screen.getByText('Test1 User')).toBeTruthy();
    expect(screen.getByText('Test2 User')).toBeTruthy();
  });

  it('shows error state when loading fails', async () => {
    // GIVEN
    fetchUsers.mockRejectedValueOnce(new Error('Server error'));

    // WHEN
    render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeTruthy();
    });
  });

  it('navigates to UserDetail when a user is pressed', async () => {
    // GIVEN
    fetchUsers.mockResolvedValueOnce({
      users: mockUsers,
      total: 2,
      skip: 0,
      limit: 30,
    });

    // WHEN
    render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

    await waitFor(() => {
      expect(screen.getByTestId('user-item-1')).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId('user-item-1'));

    // THEN
    expect(mockNavigate).toHaveBeenCalledWith('UserDetail', { userId: 1 });
  });
});
