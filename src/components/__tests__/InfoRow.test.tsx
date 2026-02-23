import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { InfoRow } from '../InfoRow';

describe('InfoRow', () => {
  it('renders label and value', () => {
    // WHEN
    render(<InfoRow label="Email" value="john@test.com" />);

    // THEN
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('john@test.com')).toBeTruthy();
  });

  it('renders different label and value pairs', () => {
    // WHEN
    render(<InfoRow label="Age" value="30" />);

    // THEN
    expect(screen.getByText('Age')).toBeTruthy();
    expect(screen.getByText('30')).toBeTruthy();
  });

  it('renders empty value string', () => {
    // WHEN
    render(<InfoRow label="Phone" value="" />);

    // THEN
    expect(screen.getByText('Phone')).toBeTruthy();
  });
});
