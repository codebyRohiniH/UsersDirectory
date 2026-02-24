import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { UserDetailScreen } from '../UserDetailScreen';
import type { User } from '../../types';

jest.mock('../../api', () => ({
  fetchUserById: jest.fn(),
}));

const { fetchUserById } = require('../../api');

const mockRoute = { params: { userId: 1 } } as any;
const mockNavigation = {} as any;

const mockUser: User = {
  id: 1,
  firstName: 'Test1',
  lastName: 'User',
  maidenName: '',
  age: 28,
  gender: 'male',
  email: 'test1@user.com',
  phone: '+1 234 567 890',
  username: 'test1user',
  birthDate: '1998-01-15',
  image: 'https://example.com/test1.png',
  bloodGroup: 'A+',
  height: 175,
  weight: 70,
  eyeColor: 'Brown',
  hair: { color: 'Black', type: 'Straight' },
  ip: '192.168.1.1',
  address: {
    address: '123 Test St',
    city: 'Testville',
    state: 'Test State',
    stateCode: 'TS',
    postalCode: '12345',
    country: 'Testland',
  },
  university: 'Test University',
  company: {
    department: 'Engineering',
    name: 'TestCorp',
    title: 'Developer',
    address: {
      address: '456 Corp Ave',
      city: 'Corpville',
      state: 'Corp State',
      stateCode: 'CS',
      postalCode: '67890',
      country: 'Testland',
    },
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserDetailScreen', () => {
  it('shows loading state initially', () => {
    // GIVEN
    fetchUserById.mockReturnValue(new Promise(() => {}));

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    expect(screen.getByTestId('detail-loading')).toBeTruthy();
  });

  it('renders user details after loading', async () => {
    // GIVEN
    fetchUserById.mockResolvedValueOnce(mockUser);

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(screen.getByText('Test1 User')).toBeTruthy();
    expect(screen.getByText('@test1user')).toBeTruthy();
  });

  it('renders personal info section', async () => {
    // GIVEN
    fetchUserById.mockResolvedValueOnce(mockUser);

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(screen.getByText('Personal Info')).toBeTruthy();
    expect(screen.getByText('test1@user.com')).toBeTruthy();
    expect(screen.getByText('+1 234 567 890')).toBeTruthy();
    expect(screen.getByText('28')).toBeTruthy();
  });

  it('renders physical info section', async () => {
    // GIVEN
    fetchUserById.mockResolvedValueOnce(mockUser);

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(screen.getByText('Physical')).toBeTruthy();
    expect(screen.getByText('175 cm')).toBeTruthy();
    expect(screen.getByText('70 kg')).toBeTruthy();
    expect(screen.getByText('Black, Straight')).toBeTruthy();
  });

  it('renders address section', async () => {
    // GIVEN
    fetchUserById.mockResolvedValueOnce(mockUser);

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(screen.getByText('Address')).toBeTruthy();
    expect(screen.getByText('123 Test St')).toBeTruthy();
    expect(screen.getByText('Testville')).toBeTruthy();
    expect(screen.getByText('Test State (TS)')).toBeTruthy();
  });

  it('renders company section', async () => {
    // GIVEN
    fetchUserById.mockResolvedValueOnce(mockUser);

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(screen.getByText('Company')).toBeTruthy();
    expect(screen.getByText('TestCorp')).toBeTruthy();
    expect(screen.getByText('Engineering')).toBeTruthy();
  });

  it('renders education section', async () => {
    // GIVEN
    fetchUserById.mockResolvedValueOnce(mockUser);

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(screen.getByText('Education')).toBeTruthy();
    expect(screen.getByText('Test University')).toBeTruthy();
  });

  it('shows error state when loading fails', async () => {
    // GIVEN
    fetchUserById.mockRejectedValueOnce(new Error('Network error'));

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-error')).toBeTruthy();
    });
    expect(screen.getByText('Network error')).toBeTruthy();
  });

  it('retries loading when retry button is pressed on error', async () => {
    // GIVEN
    fetchUserById.mockRejectedValueOnce(new Error('Failed'));

    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    await waitFor(() => {
      expect(screen.getByTestId('detail-error')).toBeTruthy();
    });

    // WHEN
    fetchUserById.mockResolvedValueOnce(mockUser);
    fireEvent.press(screen.getByText('Try Again'));

    // THEN
    await waitFor(() => {
      expect(screen.getByTestId('detail-screen')).toBeTruthy();
    });
    expect(fetchUserById).toHaveBeenCalledTimes(2);
  });

  it('calls fetchUserById with the correct userId', () => {
    // GIVEN
    fetchUserById.mockReturnValue(new Promise(() => {}));

    // WHEN
    render(<UserDetailScreen route={mockRoute} navigation={mockNavigation} />);

    // THEN
    expect(fetchUserById).toHaveBeenCalledWith(1);
  });
});
