import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    // WHEN
    render(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );

    // THEN
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('applies default padding', () => {
    // WHEN
    render(<Card testID="card"><Text>Padded</Text></Card>);

    // THEN
    const card = screen.getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.padding).toBeGreaterThan(0);
  });

  it('removes padding when noPadding is true', () => {
    // WHEN
    render(<Card testID="card" noPadding><Text>No pad</Text></Card>);

    // THEN
    const card = screen.getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.padding).toBe(0);
  });

  it('merges custom styles', () => {
    // GIVEN
    const customStyle = { marginTop: 20 };

    // WHEN
    render(<Card testID="card" style={customStyle}><Text>Styled</Text></Card>);

    // THEN
    const card = screen.getByTestId('card');
    const flatStyle = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style.filter(Boolean))
      : card.props.style;
    expect(flatStyle.marginTop).toBe(20);
  });

  it('passes additional ViewProps through', () => {
    // GIVEN
    const onLayout = jest.fn();

    // WHEN
    render(
      <Card testID="card" onLayout={onLayout}>
        <Text>Props</Text>
      </Card>,
    );

    // THEN
    expect(screen.getByTestId('card')).toBeTruthy();
  });
});
