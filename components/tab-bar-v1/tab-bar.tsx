import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { icons } from '@/constants';

import { TabBarHighlight } from './tab-bar-highlight';
import { TabBarItem } from './tab-bar-item';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routes = state.routes.filter(
    (route) => !['_sitemap', '+not-found'].includes(route.name)
  );

  const [rect, setRect] = useState({ height: 0, width: 0 });
  const tabWidth = rect.width / routes.length;

  const tabPositionX = useSharedValue(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    tabPositionX.value = withTiming((width / routes.length) * state.index, {
      duration: 300,
    });
    setRect({ height, width });
  };

  return (
    <View onLayout={handleLayout} style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        <TabBarHighlight tabPositionX={tabPositionX} tabWidth={tabWidth} />
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const handlePress = () => {
            tabPositionX.value = withSpring(tabWidth * index, {
              duration: 1000,
            });

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const handleLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarItem
              key={route.key}
              label={label}
              icon={icons[route.name]}
              isFocused={isFocused}
              onPress={handlePress}
              onLongPress={handleLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 140,
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    backgroundColor: 'cyan',
  },
});
