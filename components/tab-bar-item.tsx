import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarItemProps {
  label: string;
  icon(props: Record<string, any>): JSX.Element;
  circleRadius: number;
  isFocused: boolean;
  onPress(): void;
  onLongPress(): void;
}

export default function TabBarItem({
  label,
  icon,
  circleRadius,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const animateValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: animateValue.value }],
    }),
    [animateValue]
  );

  useEffect(() => {
    animateValue.value = withSpring(isFocused ? -12 : 0, {
      stiffness: isFocused ? 500 : 100,
    });
  }, [animateValue, isFocused]);

  return (
    <TouchableOpacity
      //   accessibilityRole="button"
      //   accessibilityState={isFocused ? { selected: true } : {}}
      //   accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabItem]}
    >
      <Animated.View
        style={[
          styles.tabItemIcon,
          { width: circleRadius, height: circleRadius },
          isFocused && styles.activeIcon,
          animatedStyle,
        ]}
      >
        {icon({
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
