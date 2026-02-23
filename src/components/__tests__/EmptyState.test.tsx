import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders default title and message when no props are provided', () => {
    // WHEN
    render(<EmptyState />);

    // THEN
    expect(screen.getByText('No results')).toBeTruthy();
    expect(screen.getByText('Try a different search term.')).toBeTruthy();
  });

  it('renders custom title and message', () => {
    // WHEN
    render(<EmptyState title="Nothing here" message="Come back later." />);

    // THEN
    expect(screen.getByText('Nothing here')).toBeTruthy();
    expect(screen.getByText('Come back later.')).toBeTruthy();
  });

  it('uses default testID', () => {
    // WHEN
    render(<EmptyState />);

    // THEN
    expect(screen.getByTestId('empty-state')).toBeTruthy();
  });

  it('accepts a custom testID', () => {
    // WHEN
    render(<EmptyState testID="custom-empty" />);

    // THEN
    expect(screen.getByTestId('custom-empty')).toBeTruthy();
  });
});
