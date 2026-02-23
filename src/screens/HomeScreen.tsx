import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSharedValue } from "react-native-reanimated";
import { useUsersStore } from '../store';
import {
  Input,
  ListItem,
  Loading,
  ErrorState,
  EmptyState,
} from "../components";
import type { HomeScreenProps } from '../navigation';
import type { User } from '../types';
import { theme } from "../theme";

const SEARCH_DEBOUNCE_MS = 400;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    users,
    loading,
    refreshing,
    loadingMore,
    error,
    searchQuery,
    isSearching,
    loadUsers,
    loadMore,
    refresh,
    search,
    clearSearch,
  } = useUsersStore();

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearchChange = useCallback(
    (text: string) => {
      useUsersStore.setState({ searchQuery: text });

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        if (text.trim()) {
          search(text);
        } else {
          clearSearch();
        }
      }, SEARCH_DEBOUNCE_MS);
    },
    [search, clearSearch],
  );

  const handleClearSearch = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    clearSearch();
  }, [clearSearch]);


  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <ListItem
        testID={`user-item-${item.id}`}
        imageUri={item.image}
        title={`${item.firstName} ${item.lastName}`}
        subtitle={item.email}
        caption={item.company?.title}
        onPress={() => navigation.navigate('UserDetail', { userId: item.id })}
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: User) => String(item.id), []);

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <Loading testID="loading-more" />
      </View>
    );
  }, [loadingMore]);

  const renderEmpty = useCallback(() => {
    if (loading) return null;
    return isSearching ? (
      <EmptyState title="No users found" message="Try a different search term." />
    ) : (
      <EmptyState title="No users" message="Pull to refresh." />
    );
  }, [loading, isSearching]);

  if (loading && users.length === 0 && !isSearching) {
    return <Loading testID="initial-loading" />;
  }

  if (error && users.length === 0) {
    return <ErrorState message={error} onRetry={loadUsers} />;
  }

  return (
    <View testID="home-screen" style={styles.container}>
      <View style={[styles.searchContainer]}>
        <Input
          testID="search-input"
          placeholder="Search users…"
          value={searchQuery}
          onChangeText={handleSearchChange}
          clearable
          onClear={handleClearSearch}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <FlatList
        testID="users-list"
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        onEndReached={isSearching ? undefined : loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refresh}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        removeClippedSubviews
        maxToRenderPerBatch={15}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  listContent: {
    flexGrow: 1,
  },
  footer: {
    height: 60,
  },
});
