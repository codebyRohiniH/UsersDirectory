import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { UserDetailScreen } from '../screens/UserDetailScreen';
import type { RootStackParamList } from "./types";
import { theme } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.text,
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Users Directory' }}
    />
    <Stack.Screen
      name="UserDetail"
      component={UserDetailScreen}
      options={{ title: 'User Details' }}
    />
  </Stack.Navigator>
);
