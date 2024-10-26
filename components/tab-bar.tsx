import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { icons } from '@/constants';

import TabBarItem from './tab-bar-item';

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const routes = state.routes.filter(
    (route) => !['+not-found', '_sitemap'].includes(route.name)
  );

  const { width } = Dimensions.get('window');
  const tabWidth = width / routes.length;
  const circleRadius = 60;
  const gap = 10;
  const height = 40 + circleRadius;

  const iconStart = tabWidth * state.index + (tabWidth - circleRadius) / 2;
  const iconEnd = iconStart + circleRadius;

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={height} style={styles.svgBg}>
        <Path
          d={`M0,0
                L${iconStart - gap * 4},0

                Q${iconStart - gap * 2},0
                ${iconStart - gap},${gap * 2}

                C${iconStart + gap / 2},${circleRadius + gap / 2}
                ${iconEnd - gap / 2},${circleRadius + gap / 2}
                ${iconEnd + gap},${gap * 2}

                Q${iconEnd + gap * 2},0
                ${iconEnd + gap * 4},0

                L${iconEnd + gap * 4},0
                L${width},0
                L${width},${height}
                L0,${height}
                Z`}
          fill="blue"
          style={{ transition: '300ms cubic-bezier(0.35, 0.12, 0.14, 1.42)' }}
        />
      </Svg>

      <View style={styles.tabBar}>
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
              circleRadius={circleRadius}
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
  svgBg: {
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
