import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ErrorState } from '../ErrorState';

describe('ErrorState', () => {
  it('renders the error message', () => {
    // WHEN
    render(<ErrorState message="Network failed" />);

    // THEN
    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Network failed')).toBeTruthy();
  });

  it('shows retry button when onRetry is provided', () => {
    // WHEN
    render(<ErrorState message="Oops" onRetry={jest.fn()} />);

    // THEN
    expect(screen.getByText('Try Again')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    // GIVEN
    const onRetry = jest.fn();

    // WHEN
    render(<ErrorState message="Oops" onRetry={onRetry} />);
    fireEvent.press(screen.getByText('Try Again'));

    // THEN
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not show retry button when onRetry is not provided', () => {
    // WHEN
    render(<ErrorState message="Oops" />);

    // THEN
    expect(screen.queryByText('Try Again')).toBeNull();
  });

  it('uses default testID', () => {
    // WHEN
    render(<ErrorState message="Error" />);

    // THEN
    expect(screen.getByTestId('error-state')).toBeTruthy();
  });

  it('accepts a custom testID', () => {
    // WHEN
    render(<ErrorState message="Error" testID="custom-error" />);

    // THEN
    expect(screen.getByTestId('custom-error')).toBeTruthy();
  });
});
