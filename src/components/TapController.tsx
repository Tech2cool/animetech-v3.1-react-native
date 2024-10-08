import React from 'react';
import {ViewStyle} from 'react-native';
import {Gesture, TouchableOpacity} from 'react-native-gesture-handler';
import {GestureDetector} from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';

const hitSlop = {left: 8, bottom: 4, right: 8, top: 4};

interface TapProps {
  onPress: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}
export const TapControler: React.FC<TapProps> = ({
  onPress,
  style,
  children,
}) => {
  const gesture = Gesture.Tap().onEnd((_e, success) => {
    if (success) {
      onPress();
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View hitSlop={hitSlop} style={style}>
        <TouchableOpacity>{children}</TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};
