import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarItemProps {
  label: string;
  icon(props: Record<string, any>): JSX.Element;
  isFocused: boolean;
  onPress(): void;
  onLongPress(): void;
}

export function TabBarItem({
  label,
  icon,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const animateValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animateValue.value, [0, 1], [1, 1.5]);
    const top = interpolate(animateValue.value, [0, 1], [0, -35]);
    return {
      transform: [{ scale }],
      top,
    };
  }, [animateValue]);

  useEffect(() => {
    animateValue.value = withSpring(isFocused ? 1 : 0, { duration: 500 });
  }, [animateValue, isFocused]);

  return (
    <TouchableOpacity
      //   accessibilityRole="button"
      //   accessibilityState={isFocused ? { selected: true } : {}}
      //   accessibilityLabel={options.tabBarAccessibilityLabel}
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={[styles.tabBarItemIcon, animatedStyle]}>
        {icon({ color: isFocused ? 'cyan' : 'black', size: 24 })}
      </Animated.View>
      <Text
        style={[
          styles.tabBarItemLabel,
          { fontWeight: isFocused ? 'bold' : 'normal' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBarItem: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingBottom: 24,
  },
  tabBarItemIcon: {
    position: 'absolute',
    padding: 12,
  },
  tabBarItemLabel: {
    marginTop: 32,
  },
});
