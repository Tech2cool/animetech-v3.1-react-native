/* eslint-disable radix */
import {Dimensions, Modal, StyleSheet, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Theme from '../../utils/Theme';
import {F6Icon} from '../../utils/constant';
import {IconProps} from 'react-native-vector-icons/Icon';
interface BsheetProps {
  enabled: boolean;
  closeHeight?: string;
  maxHeight: string;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  iconProps?: IconProps;
  fullscreen?: boolean;
}
const color = Theme.DARK;

const BSheet: React.FC<BsheetProps> = ({
  enabled = false,
  maxHeight = '60%',
  closeHeight = '40%',
  onChange,
  children,
  containerStyle,
  iconContainerStyle,
  iconProps,
  fullscreen = false,
}) => {
  const {height} = Dimensions.get('window');
  const maxHeightPercent = parseInt(maxHeight.replace('%', '')) / 100;
  const maxTranslateY = height * maxHeightPercent;
  const maxheight = fullscreen ? 0 : height - maxTranslateY;
  const closePoint = (parseInt(closeHeight.replace('%', '')) / 100) * height;
  const TranslateY = useSharedValue(0);
  const context = useSharedValue(0);
  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onChange)(false);
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = TranslateY.value;
    })
    .onUpdate(e => {
      TranslateY.value = e.translationY + context.value;
      TranslateY.value = Math.max(TranslateY.value, maxheight);
    })
    .onEnd(() => {
      if (TranslateY.value > closePoint) {
        TranslateY.value = withTiming(height);
        runOnJS(onChange)(false);
      }
    });

  useEffect(() => {
    TranslateY.value = withTiming(maxheight);
    // StatusBar.setHidden(enabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const sheetStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: TranslateY.value,
        },
      ],
    };
  });

  return (
    <Modal
      transparent
      animationType="slide"
      visible={enabled}
      statusBarTranslucent={fullscreen ? true : undefined}>
      <GestureHandlerRootView>
        <GestureDetector gesture={tap}>
          <Animated.View style={styles.overlay} />
        </GestureDetector>
        {!fullscreen ? (
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                sheetStyle,
                styles.sheet,
                {height: maxTranslateY},
                containerStyle,
              ]}>
              <Animated.View style={[styles.barContainer, iconContainerStyle]}>
                <F6Icon
                  name="grip-lines"
                  color={color.White}
                  size={30}
                  {...iconProps}
                />
              </Animated.View>
              {children}
            </Animated.View>
          </GestureDetector>
        ) : (
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[sheetStyle, styles.sheetFull, containerStyle]}>
              <Animated.View style={[styles.barContainer, iconContainerStyle]}>
                <F6Icon
                  name="grip-lines"
                  color={color.White}
                  size={30}
                  {...iconProps}
                />
              </Animated.View>
              {children}
            </Animated.View>
          </GestureDetector>
        )}
      </GestureHandlerRootView>
    </Modal>
  );
};

export default BSheet;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: color.DarkBackGround2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
  },
  sheetFull: {
    backgroundColor: color.DarkBackGround2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '50%',
    height: '100%',
    alignSelf: 'flex-end',
  },

  barContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
});
