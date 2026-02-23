import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolation,
    withSpring,
} from 'react-native-reanimated';
import { fetchUserById } from '../api';
import { Avatar, Card, Text, Loading, ErrorState, Button, theme } from '../ui';
import type { UserDetailScreenProps } from '../navigation';
import type { User } from '../types';
import InfoRow from '../ui/InfoRow';

const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = 90;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollY = useSharedValue(0);
  const headerScale = useSharedValue(1);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserById(userId);
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP,
    );
    return { height };
  });

  const avatarStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [1, 0.6],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -20],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }, { translateY }] };
  });

  const nameStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE * 0.5],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  const handleAvatarPress = useCallback(() => {
    headerScale.value = withSpring(1.15, { damping: 4, stiffness: 300 }, () => {
      headerScale.value = withSpring(1);
    });
  }, [headerScale]);

  const avatarBounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  if (loading) {
    return <Loading testID="detail-loading" />;
  }

  if (error || !user) {
    return (
      <ErrorState
        testID="detail-error"
        message={error ?? 'User not found'}
        onRetry={loadUser}
      />
    );
  }

  return (
    <View testID="detail-screen" style={styles.container}>
      {/* Collapsible header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.View style={[avatarStyle, avatarBounceStyle]}>
          <Avatar
            testID="detail-avatar"
            uri={user.image}
            name={`${user.firstName} ${user.lastName}`}
            size="lg"
          />
        </Animated.View>
        <Animated.View style={nameStyle}>
          <Text variant="h2" center style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text variant="bodySmall" color={theme.colors.textSecondary} center>
            @{user.username}
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Tap-to-bounce button */}
      <View style={styles.bounceHint}>
        <Button
          testID="bounce-avatar-button"
          title="✨ Bounce Avatar"
          variant="ghost"
          size="sm"
          onPress={handleAvatarPress}
        />
      </View>

      {/* Scrollable details */}
      <Animated.ScrollView
        testID="detail-scroll"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Personal info */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Personal Info
          </Text>
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Phone" value={user.phone} />
          <InfoRow label="Age" value={String(user.age)} />
          <InfoRow label="Gender" value={user.gender} />
          <InfoRow label="Birth Date" value={user.birthDate} />
          <InfoRow label="Blood Group" value={user.bloodGroup} />
        </Card>

        {/* Physical */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Physical
          </Text>
          <InfoRow label="Height" value={`${user.height} cm`} />
          <InfoRow label="Weight" value={`${user.weight} kg`} />
          <InfoRow label="Eye Color" value={user.eyeColor} />
          <InfoRow label="Hair" value={`${user.hair.color}, ${user.hair.type}`} />
        </Card>

        {/* Address */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Address
          </Text>
          <InfoRow label="Street" value={user.address.address} />
          <InfoRow label="City" value={user.address.city} />
          <InfoRow label="State" value={`${user.address.state} (${user.address.stateCode})`} />
          <InfoRow label="Postal Code" value={user.address.postalCode} />
        </Card>

        {/* Company */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Company
          </Text>
          <InfoRow label="Name" value={user.company.name} />
          <InfoRow label="Department" value={user.company.department} />
          <InfoRow label="Title" value={user.company.title} />
        </Card>

        {/* Education */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Education
          </Text>
          <InfoRow label="University" value={user.university} />
        </Card>
      </Animated.ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    paddingTop: theme.spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    overflow: 'hidden',
  },
  name: {
    marginTop: theme.spacing.md,
  },
  bounceHint: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
});
