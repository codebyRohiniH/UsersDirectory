import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('renders with default testID', () => {
    // WHEN
    render(<Loading />);

    // THEN
    expect(screen.getByTestId('loading')).toBeTruthy();
  });

  it('accepts a custom testID', () => {
    // WHEN
    render(<Loading testID="custom-loading" />);

    // THEN
    expect(screen.getByTestId('custom-loading')).toBeTruthy();
  });
});
