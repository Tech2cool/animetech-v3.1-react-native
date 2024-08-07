import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onValueChange: (value: number) => void;
  sliderTrackStyle?: ViewStyle;
  sliderFillStyle?: ViewStyle;
  thumbStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  labelTextStyle?: TextStyle;
  customText?: string;
}

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  onValueChange,
  sliderTrackStyle,
  sliderFillStyle,
  thumbStyle,
  labelStyle,
  labelTextStyle,
  customText,
}) => {
  const validatedMin = typeof min === 'number' && !isNaN(min) ? min : 0;
  const validatedMax =
    typeof max === 'number' && !isNaN(max) && max > 0 ? max : 100;
  const validatedValue =
    typeof value === 'number' && !isNaN(value) ? value : validatedMin;

  const effectiveMin = Math.min(validatedMin, validatedMax);
  const effectiveMax = Math.max(validatedMin, validatedMax);

  const sliderWidth = Dimensions.get('window').width - 40;
  const thumbSize = 20;

  const range = effectiveMax - effectiveMin;
  const scaledValue =
    range > 0 ? (validatedValue - effectiveMin) * (sliderWidth / range) : 0;

  const position = useSharedValue(scaledValue);
  const context = useSharedValue(0);
  const [currentValue, setCurrentValue] = useState(validatedValue);

  const updatePosition = useCallback(() => {
    const newValue = (validatedValue - effectiveMin) * (sliderWidth / range);
    position.value = withTiming(newValue, {duration: 200});
    setCurrentValue(validatedValue);
  }, [validatedValue, effectiveMin, sliderWidth, range]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  const handleTap = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    const newValue =
      effectiveMin + Math.round(((touchX / sliderWidth) * range) / step) * step;
    position.value = withTiming(touchX, {duration: 200});
    setCurrentValue(newValue);
    onValueChange(newValue);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = position.value;
    })
    .onUpdate(e => {
      let newPosition = context.value + e.translationX;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > sliderWidth) {
        newPosition = sliderWidth;
      }
      position.value = newPosition;
      const newValue =
        effectiveMin +
        Math.round(((newPosition / sliderWidth) * range) / step) * step;
      setCurrentValue(newValue);
    })
    .onEnd(() => {
      onValueChange(currentValue);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value - thumbSize / 2}],
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    width: position.value,
  }));

  return (
    <View style={[styles.sliderContainer, sliderTrackStyle]}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.touchArea}>
          <View
            style={[styles.sliderBack, {width: sliderWidth}, sliderTrackStyle]}>
            <Animated.View
              style={[sliderStyle, styles.sliderFront, sliderFillStyle]}
            />
            <GestureDetector gesture={pan}>
              <Animated.View
                style={[animatedStyle, styles.thumb, thumbStyle]}
              />
            </GestureDetector>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  touchArea: {
    height: 40,
    justifyContent: 'center',
  },
  sliderBack: {
    height: 8,
    backgroundColor: '#DFEAFB',
    borderRadius: 20,
    position: 'relative',
  },
  sliderFront: {
    height: 8,
    backgroundColor: '#3F4CF6',
    borderRadius: 20,
    position: 'absolute',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderColor: '#3F4CF6',
    borderWidth: 5,
    borderRadius: 10,
    position: 'absolute',
    top: -6,
  },
});
