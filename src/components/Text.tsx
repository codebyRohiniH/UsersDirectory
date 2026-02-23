import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme } from '../theme';

type Variant = keyof typeof theme.typography;

interface TextProps extends RNTextProps {
  /** Typography variant, Defaults to 'body'. */
  variant?: Variant;
  /** Override color. Defaults to theme.colors.text. */
  color?: string;
  /** Center text horizontally. */
  center?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  center,
  style,
  ...rest
}) => {
  const typo = theme.typography[variant];

  return (
    <RNText
      style={[
        {
          fontSize: typo.fontSize,
          fontWeight: typo.fontWeight,
          lineHeight: typo.lineHeight,
          color: color ?? theme.colors.text,
        },
        center && styles.center,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
});
