import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders image when uri is provided', () => {
    // GIVEN
    const uri = 'https://example.com/avatar.png';

    // WHEN
    render(<Avatar uri={uri} testID="avatar" />);

    // THEN
    expect(screen.getByTestId('avatar')).toBeTruthy();
  });

  it('renders initials fallback when no uri is provided', () => {
    // GIVEN
    const name = 'John Doe';

    // WHEN
    render(<Avatar name={name} testID="avatar" />);

    // THEN
    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('renders single initial for single-word name', () => {
    // GIVEN
    const name = 'Jane';

    // WHEN
    render(<Avatar name={name} testID="avatar" />);

    // THEN
    expect(screen.getByText('J')).toBeTruthy();
  });

  it('renders "?" when neither uri nor name is provided', () => {
    // WHEN
    render(<Avatar testID="avatar" />);

    // THEN
    expect(screen.getByText('?')).toBeTruthy();
  });

  it('applies correct dimensions for each size', () => {
    // GIVEN
    const sizes = { sm: 32, md: 48, lg: 80 } as const;

    Object.entries(sizes).forEach(([size, dimension]) => {
      // WHEN
      const { unmount } = render(
        <Avatar uri="https://example.com/a.png" size={size as 'sm' | 'md' | 'lg'} testID="avatar" />,
      );

      // THEN
      const image = screen.getByTestId('avatar');
      const style = image.props.style;
      expect(style).toEqual(
        expect.objectContaining({ width: dimension, height: dimension }),
      );

      unmount();
    });
  });
});
