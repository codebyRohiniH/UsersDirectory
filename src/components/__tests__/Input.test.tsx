import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input', () => {
  it('renders a label when provided', () => {
    // WHEN
    render(<Input label="Email" />);

    // THEN
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('does not render a label when not provided', () => {
    // WHEN
    render(<Input placeholder="Type..." />);

    // THEN
    expect(screen.queryByText('Email')).toBeNull();
  });

  it('calls onChangeText when typing', () => {
    // GIVEN
    const onChangeText = jest.fn();

    // WHEN
    render(<Input testID="input" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByTestId('input'), 'hello');

    // THEN
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('shows clear button when clearable and value is present', () => {
    // GIVEN
    const onClear = jest.fn();

    // WHEN
    render(<Input value="search" clearable onClear={onClear} />);
    fireEvent.press(screen.getByTestId('input-clear'));

    // THEN
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not show clear button when value is empty', () => {
    // WHEN
    render(<Input value="" clearable onClear={jest.fn()} />);

    // THEN
    expect(screen.queryByTestId('input-clear')).toBeNull();
  });
});
