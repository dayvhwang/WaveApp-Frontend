import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { colors } from '@/src/theme/tokens';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.brandBlack,
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: '#ffffff', paddingTop: 12, paddingBottom: 12 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="match-making"
        options={{
          title: 'Match Making',
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
