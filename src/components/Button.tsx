import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Text } from './Text';
import { theme } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  /** Visual variant. Defaults to 'primary'. */
  variant?: ButtonVariant;
  /** Size preset. Defaults to 'md'. */
  size?: ButtonSize;
  /** Button label text. */
  title: string;
  /** Show a loading spinner and disable the button. */
  loading?: boolean;
}

const sizeMap: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  md: { paddingVertical: 10, paddingHorizontal: 16 },
  lg: { paddingVertical: 14, paddingHorizontal: 20 },
};

/**
 * 
 * Button with variants (primary, secondary, outline, ghost) and sizes (sm, md, lg).
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  title,
  loading = false,
  disabled,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  const sizeStyle = sizeMap[size];

  const backgroundColors: Record<ButtonVariant, string> = {
    primary: theme.colors.primary,
    secondary: theme.colors.primaryLight,
    outline: 'transparent',
    ghost: 'transparent',
  };

  const textColors: Record<ButtonVariant, string> = {
    primary: '#FFFFFF',
    secondary: theme.colors.primary,
    outline: theme.colors.primary,
    ghost: theme.colors.primary,
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={isDisabled}
      style={[
        styles.base,
        {
          backgroundColor: backgroundColors[variant],
          ...sizeStyle,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: theme.colors.primary,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          testID="button-loading"
          color={textColors[variant]}
          size="small"
        />
      ) : (
        <Text
          variant="label"
          color={textColors[variant]}
          center
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
