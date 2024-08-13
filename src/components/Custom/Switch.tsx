import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import {MCIcon} from '../../utils/constant';

interface SwitchProps {
  activeColor: string;
  inActiveColor: string;
  active: boolean;
  setActive: (value: boolean) => void;
}
const Switch: React.FC<SwitchProps> = ({
  activeColor,
  inActiveColor,
  active,
  setActive,
}) => {
  // value for Switch Animation
  const switchTranslate = useSharedValue(0);
  // state for activate Switch
  // Progress Value
  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0);
  });

  // useEffect for change the switchTranslate Value
  useEffect(() => {
    if (active) {
      switchTranslate.value = 22;
    } else {
      switchTranslate.value = 4;
    }
  }, [active, switchTranslate]);

  // Circle Animation
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  // Background Color Animation
  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [inActiveColor, activeColor],
    );
    return {
      backgroundColor,
    };
  });

  const handleActive = useCallback(() => {
    setActive(!active);
  }, [active, setActive]);
  return (
    <TouchableWithoutFeedback onPress={handleActive}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]}>
          <MCIcon
            name={active ? 'play-circle' : 'pause-circle'}
            size={24}
            color={'white'}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'transparent',
    shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2.5,
    // elevation: 4,
  },
});
