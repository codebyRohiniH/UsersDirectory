import React from 'react';
import { TouchableOpacity, View, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Avatar } from './Avatar';
import { Text } from './Text';
import { theme } from '../theme';

interface ListItemProps extends TouchableOpacityProps {
  /** Avatar image URI. */
  imageUri?: string;
  /** Primary title text. */
  title: string;
  /** Secondary subtitle text. */
  subtitle?: string;
  /** Tertiary caption text. */
  caption?: string;
}

/**
 * ListItem component.
 * A pressable row with avatar, title, subtitle, and optional caption.
 */
export const ListItem: React.FC<ListItemProps> = ({
  imageUri,
  title,
  subtitle,
  caption,
  style,
  ...rest
}) => (
  <TouchableOpacity style={[styles.container, style]} {...rest}>
    <Avatar uri={imageUri} name={title} size="md" />
    <View style={styles.content}>
      <Text variant="label" numberOfLines={1}>
        {title}
      </Text>
      {subtitle && (
        <Text
          variant="bodySmall"
          color={theme.colors.textSecondary}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      )}
      {caption && (
        <Text
          variant="caption"
          color={theme.colors.textTertiary}
          numberOfLines={1}
        >
          {caption}
        </Text>
      )}
    </View>
    <Text variant="body" color={theme.colors.textTertiary}>
      ›
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  content: {
    flex: 1,
    marginLeft: theme.spacing.md,
    marginRight: theme.spacing.sm,
  },
});
