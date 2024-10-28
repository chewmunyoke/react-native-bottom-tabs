import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { icons } from '@/constants';

import { TabBarItem } from './tab-bar-item';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routes = state.routes.filter(
    (route) => !['_sitemap', '+not-found'].includes(route.name)
  );

  const { width } = useWindowDimensions();
  const tabWidth = width / routes.length;
  const circleDiameter = 60;
  const gap = 10;
  const height = 40 + circleDiameter;

  const tabStart = tabWidth * state.index + (tabWidth - circleDiameter) / 2;
  const tabEnd = tabStart + circleDiameter;

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={height} style={styles.svg}>
        <Path
          d={`M 0,0
                L ${tabStart - gap * 4},0

                Q ${tabStart - gap * 2},0
                ${tabStart - gap},${gap * 2}

                C ${tabStart + gap / 2},${circleDiameter + gap / 2}
                ${tabEnd - gap / 2},${circleDiameter + gap / 2}
                ${tabEnd + gap},${gap * 2}

                Q ${tabEnd + gap * 2},0
                ${tabEnd + gap * 4},0

                L ${width},0
                L ${width},${height}
                L 0,${height}
                Z`}
          fill="blue"
          style={{ transition: '300ms cubic-bezier(0.35, 0.12, 0.14, 1.42)' }}
        />
      </Svg>

      <View style={styles.tabBar}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ? options.title : route.name;
          const isFocused = state.index === index;

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
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
              key={index}
              label={label}
              icon={icons[route.name]}
              circleDiameter={circleDiameter}
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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  tabBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
});
