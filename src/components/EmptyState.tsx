import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { theme } from '../theme';

interface EmptyStateProps {
  title?: string;
  message?: string;
  testID?: string;
}

/**
 * Full-screen empty state for lists with no data.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results',
  message = 'Try a different search term.',
  testID = 'empty-state',
}) => (
  <View testID={testID} style={styles.container}>
    <Text variant="h3" center style={styles.title}>
      {title}
    </Text>
    <Text variant="bodySmall" color={theme.colors.textSecondary} center>
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
});
