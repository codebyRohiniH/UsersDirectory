import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ListItem } from '../ListItem';

describe('ListItem', () => {
  it('renders title', () => {
    // WHEN
    render(<ListItem title="John Doe" />);

    // THEN
    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    // WHEN
    render(<ListItem title="John Doe" subtitle="john@test.com" />);

    // THEN
    expect(screen.getByText('john@test.com')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    // WHEN
    render(<ListItem title="John Doe" />);

    // THEN
    expect(screen.queryByText('john@test.com')).toBeNull();
  });

  it('renders caption when provided', () => {
    // WHEN
    render(<ListItem title="John Doe" caption="Developer" />);

    // THEN
    expect(screen.getByText('Developer')).toBeTruthy();
  });

  it('does not render caption when not provided', () => {
    // WHEN
    render(<ListItem title="John Doe" />);

    // THEN
    expect(screen.queryByText('Developer')).toBeNull();
  });

  it('calls onPress when pressed', () => {
    // GIVEN
    const onPress = jest.fn();

    // WHEN
    render(<ListItem title="John Doe" onPress={onPress} testID="list-item" />);
    fireEvent.press(screen.getByTestId('list-item'));

    // THEN
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders chevron indicator', () => {
    // WHEN
    render(<ListItem title="John Doe" />);

    // THEN
    expect(screen.getByText('›')).toBeTruthy();
  });
});
