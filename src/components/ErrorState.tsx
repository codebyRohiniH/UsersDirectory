import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { theme } from '../theme';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  testID?: string;
}

/**
 * Full-screen error state with retry button.
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  testID = 'error-state',
}) => (
  <View testID={testID} style={styles.container}>
    <Text variant="h3" center style={styles.title}>
      Something went wrong
    </Text>
    <Text
      variant="bodySmall"
      color={theme.colors.textSecondary}
      center
      style={styles.message}
    >
      {message}
    </Text>
    {onRetry && (
      <Button title="Try Again" onPress={onRetry} variant="outline" />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
    backgroundColor: theme.colors.background,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  message: {
    marginBottom: theme.spacing.lg,
  },
});
