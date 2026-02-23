import { View, StyleSheet } from "react-native";
import { theme } from "../theme";
import { Text } from ".";


interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text variant="bodySmall" color={theme.colors.textSecondary} style={styles.infoLabel}>
      {label}
    </Text>
    <Text variant="body" style={styles.infoValue}>
      {value}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    flex: 2,
    textAlign: 'right',
  },
});


