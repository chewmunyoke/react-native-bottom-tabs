import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { icons } from '@/constants';

import { TabBarItem } from './tab-bar-item';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routes = state.routes.filter(
    (route) => !['_sitemap', '+not-found'].includes(route.name)
  );

  const { width } = useWindowDimensions();
  const tabWidth = width / routes.length;
  const totalWidth = tabWidth * ((routes.length - 1) * 2 + 2 + 1);
  const circleDiameter = 60;
  const gap = 10;
  const height = 40 + circleDiameter;

  const curveStart = tabWidth * routes.length + (tabWidth - circleDiameter) / 2;

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(-tabWidth * (routes.length - state.index), {
      damping: 20,
      stiffness: 500,
    });
  }, [width, state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View
        style={[
          styles.svgContainer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <Svg width={totalWidth} height={height}>
          <Path
            d={`M 0,0
                l ${curveStart - gap * 4},0

                q ${gap * 2},0
                ${gap * 3},${gap * 2}

                c ${gap * 1.5},${circleDiameter - gap * 1.5}
                ${circleDiameter + gap / 2},${circleDiameter - gap * 1.5}
                ${circleDiameter + gap * 2},${0}

                q ${gap},${-gap * 2}
                ${gap * 3},${-gap * 2}

                l ${curveStart - gap * 4},0
                v ${height}
                l ${-totalWidth},0
                z`}
            fill="blue"
          />
        </Svg>
      </Animated.View>
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
  svgContainer: {
    position: 'absolute',
    left: 0,
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
