import React, { useCallback } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Text } from './Text';
import { theme } from '../theme';

interface InputProps extends TextInputProps {
  /** Optional label displayed above the input. */
  label?: string;
  /** Show a clear (✕) button when the input has a value. */
  clearable?: boolean;
  /** Called when the clear button is pressed. */
  onClear?: () => void;
}

/**
 * 
 * Input component supports a label, placeholder, and optional clear button.
 */
export const Input: React.FC<InputProps> = ({
  label,
  clearable,
  onClear,
  value,
  style,
  ...rest
}) => {
    
  const handleClear = useCallback(() => {
    onClear?.();
  }, [onClear]);

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textTertiary}
          value={value}
          {...rest}
        />
        {clearable && !!value && (
          <TouchableOpacity
            testID="input-clear"
            onPress={handleClear}
            style={styles.clearButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text variant="body" color={theme.colors.textSecondary}>
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  clearButton: {
    paddingHorizontal: theme.spacing.md,
  },
});
