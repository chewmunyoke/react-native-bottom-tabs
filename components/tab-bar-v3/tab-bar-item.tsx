import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

interface TabBarItemProps {
  label: string;
  icon?(props: Record<string, any>): JSX.Element;
  circleDiameter: number;
  isFocused: boolean;
  onPress(): void;
  onLongPress(): void;
}

export function TabBarItem({
  label,
  icon,
  circleDiameter,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(isFocused ? -12 : 0, {
      stiffness: isFocused ? 500 : 100,
    });
  }, [isFocused]);

  return (
    <TouchableOpacity
      //   accessibilityRole="button"
      //   accessibilityState={isFocused ? { selected: true } : {}}
      //   accessibilityLabel={options.tabBarAccessibilityLabel}
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabItem]}
    >
      <Animated.View
        style={[
          styles.tabItemIcon,
          isFocused && styles.activeIcon,
          {
            width: circleDiameter,
            height: circleDiameter,
            transform: [{ translateY }],
          },
        ]}
      >
        {icon &&
          icon({
            color: isFocused ? 'blue' : 'white',
            size: isFocused ? 36 : 24,
          })}
      </Animated.View>
      <Text
        style={{
          color: isFocused ? 'cyan' : 'white',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tabItemIcon: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  activeIcon: {
    justifyContent: 'center',
    backgroundColor: 'cyan',
  },
});
