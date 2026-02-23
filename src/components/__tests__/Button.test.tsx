import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders the title text', () => {
    // WHEN
    render(<Button title="Click me" />);

    // THEN
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    // GIVEN
    const onPress = jest.fn();

    // WHEN
    render(<Button title="Press" onPress={onPress} />);
    fireEvent.press(screen.getByText('Press'));

    // THEN
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    // GIVEN
    const onPress = jest.fn();

    // WHEN
    render(<Button title="Disabled" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Disabled'));

    // THEN
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading is true', () => {
    // WHEN
    render(<Button title="Loading" loading />);

    // THEN
    expect(screen.getByTestId('button-loading')).toBeTruthy();
    expect(screen.queryByText('Loading')).toBeNull();
  });

  it('has button accessibility role', () => {
    // WHEN
    render(<Button title="Role" />);

    // THEN
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
