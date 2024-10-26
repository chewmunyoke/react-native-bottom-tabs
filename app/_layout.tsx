import { Tabs } from 'expo-router';

import TabBar from '@/components/tab-bar';

export default function Layout() {
  return (
    <Tabs
      // screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', headerShown: false }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings', headerShown: false }}
      />
    </Tabs>
  );
}
