import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from '../Text';

describe('Text', () => {
  it('renders children text', () => {
    // WHEN
    render(<Text>Hello World</Text>);

    // THEN
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('uses body variant by default', () => {
    // WHEN
    render(<Text testID="txt">Default</Text>);

    // THEN
    const txt = screen.getByTestId('txt');
    const flatStyle = Array.isArray(txt.props.style)
      ? Object.assign({}, ...txt.props.style.filter(Boolean))
      : txt.props.style;
    expect(flatStyle.fontWeight).toBe('400');
  });

  it('applies h1 variant styles', () => {
    // WHEN
    render(<Text testID="txt" variant="h1">Heading</Text>);

    // THEN
    const txt = screen.getByTestId('txt');
    const flatStyle = Array.isArray(txt.props.style)
      ? Object.assign({}, ...txt.props.style.filter(Boolean))
      : txt.props.style;
    expect(flatStyle.fontWeight).toBe('700');
  });

  it('applies custom color', () => {
    // WHEN
    render(<Text testID="txt" color="#FF0000">Red</Text>);

    // THEN
    const txt = screen.getByTestId('txt');
    const flatStyle = Array.isArray(txt.props.style)
      ? Object.assign({}, ...txt.props.style.filter(Boolean))
      : txt.props.style;
    expect(flatStyle.color).toBe('#FF0000');
  });

  it('centers text when center prop is true', () => {
    // WHEN
    render(<Text testID="txt" center>Centered</Text>);

    // THEN
    const txt = screen.getByTestId('txt');
    const flatStyle = Array.isArray(txt.props.style)
      ? Object.assign({}, ...txt.props.style.filter(Boolean))
      : txt.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('does not center text by default', () => {
    // WHEN
    render(<Text testID="txt">Left</Text>);

    // THEN
    const txt = screen.getByTestId('txt');
    const flatStyle = Array.isArray(txt.props.style)
      ? Object.assign({}, ...txt.props.style.filter(Boolean))
      : txt.props.style;
    expect(flatStyle.textAlign).toBeUndefined();
  });
});
