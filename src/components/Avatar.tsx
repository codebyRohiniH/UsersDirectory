import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { theme } from '../theme';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  /** Image URI. Falls back to initials when not provided. */
  uri?: string;
  /** Full name used to derive initials as fallback. */
  name?: string;
  /** Size preset. Defaults to 'md'. */
  size?: AvatarSize;
  /** Custom testID for testing. */
  testID?: string;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 80,
};

/**
 * 
 * Circular avatar image or falls back to initials.
 */
export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 'md',
  testID,
}) => {
  const dimension = sizeMap[size];

  if (!uri) {
    const initials = (name ?? '?')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <View
        testID={testID}
        style={[
          styles.fallback,
          { width: dimension, height: dimension, borderRadius: dimension / 2 },
        ]}
      >
        <Text
          variant={size === 'lg' ? 'h3' : 'caption'}
          color={theme.colors.primary}
        >
          {initials}
        </Text>
      </View>
    );
  }

  return (
    <Image
      testID={testID}
      source={{ uri }}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
      }}
      accessibilityIgnoresInvertColors
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
