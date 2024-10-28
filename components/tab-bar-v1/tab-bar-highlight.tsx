import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

interface TabBarHighlightProps {
  tabPositionX: SharedValue<number>;
  tabWidth: number;
}

export function TabBarHighlight({
  tabPositionX,
  tabWidth,
}: TabBarHighlightProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  }, [tabPositionX]);

  return (
    <Animated.View
      style={[styles.tabHighlightContainer, { width: tabWidth }, animatedStyle]}
    >
      <View style={styles.tabHighlightLeftBack}>
        <View style={styles.tabHighlightLeftFront} />
      </View>
      <View style={styles.tabHighlightCircleContainer}>
        <View style={styles.tabHighlightCircleGap}>
          <View style={styles.tabHighlightCircle} />
        </View>
      </View>
      <View style={styles.tabHighlightRightBack}>
        <View style={styles.tabHighlightRightFront} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabHighlightContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabHighlightLeftBack: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  tabHighlightLeftFront: {
    height: '100%',
    borderTopRightRadius: 26,
    backgroundColor: 'cyan',
  },
  tabHighlightRightBack: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    zIndex: -1,
    elevation: -1,
  },
  tabHighlightRightFront: {
    height: '100%',
    borderTopLeftRadius: 26,
    backgroundColor: 'cyan',
  },
  tabHighlightCircleContainer: {
    position: 'relative',
    width: 66,
    height: '100%',
    backgroundColor: 'cyan',
  },
  tabHighlightCircleGap: {
    position: 'absolute',
    top: '-60%',
    left: '50%',
    transform: [{ translateX: -40 }],
    width: 78,
    height: '100%',
    borderRadius: 32,
    backgroundColor: 'white',
  },
  tabHighlightCircle: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -33 }],
    borderRadius: 100,
    width: 68,
    height: 68,
    backgroundColor: 'blue',
  },
});
