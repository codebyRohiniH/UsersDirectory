import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface LoadingProps {
  testID?: string;
}

/**
 * Full-screen centered loading spinner.
 */
export const Loading: React.FC<LoadingProps> = ({ testID = 'loading' }) => (
  <View testID={testID} style={styles.container}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
