import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../theme';

interface CardProps extends ViewProps {
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  noPadding,
  style,
  ...rest
}) => (
  <View
    style={[styles.card, noPadding && styles.noPadding, style]}
    {...rest}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  noPadding: {
    padding: 0,
  },
});
