import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo, useEffect} from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Theme from '../utils/Theme';
import {F6Icon} from '../utils/constant';
import useVideo from '../hooks/useVideo';

const color = Theme.DARK;
const {height: SCREEN_HIEGHT, width} = Dimensions.get('window');
// const MAX_TRANSLATE_Y = -SCREEN_HIEGHT / 1.2;
interface BottomSheetProps {
  children: React.ReactNode;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  max_Trans_Y: number;
  borderRadius?: number;
  endPoint: number;
  snapPoint: number;
  onEnd: () => void;
  containerStyle?: ViewStyle;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  enabled,
  setEnabled,
  max_Trans_Y,
  borderRadius,
  endPoint,
  snapPoint,
  onEnd,
  containerStyle,
}) => {
  const {videoState} = useVideo();

  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const MAX_TRANSLATE_Y = videoState.fullscreen
    ? width * 0.03
    : SCREEN_HIEGHT * max_Trans_Y;
  const MAX_HEIGHT = videoState.fullscreen
    ? width - MAX_TRANSLATE_Y - 20
    : SCREEN_HIEGHT - MAX_TRANSLATE_Y;
  const BORDER_RADIUS = borderRadius;
  const END_POINT = videoState.fullscreen
    ? width * endPoint
    : SCREEN_HIEGHT * endPoint;
  const SNAP_POINT = videoState.fullscreen
    ? width * 0.2
    : SCREEN_HIEGHT * snapPoint;
  const LEFT = videoState.fullscreen ? SCREEN_HIEGHT * 0.5 : 0;
  // const RIGHT= 0
  const RIGHT = videoState.fullscreen ? SCREEN_HIEGHT * 0.2 : 0;

  // const MAX_TRANSLATE_Y = SCREEN_HIEGHT *0.1;
  // const MAX_HEIGHT = SCREEN_HIEGHT - MAX_TRANSLATE_Y - 20;
  // const BORDER_RADIUS = 20;
  // const END_POINT = SCREEN_HIEGHT * 0.92;
  // const SNAP_POINT = SCREEN_HIEGHT * 0.6;

  // console.log(MAX_TRANSLATE_Y);
  const tapGesture = Gesture.Tap().onStart(() => {
    runOnJS(setEnabled)(false);
    runOnJS(onEnd)();
    // enabled =false
    // console.log('tap');
  });
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(e => {
      // console.log('translate Y', e.translationY);
      // console.log("height",SCREEN_HIEGHT);
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      // console.log(e.translationY);
      if (translateY.value > SNAP_POINT) {
        translateY.value = END_POINT;
        // console.log("point",SNAP_POINT)
        runOnJS(setEnabled)(false);
        runOnJS(onEnd)();
      } else if (translateY.value < SNAP_POINT) {
        translateY.value = MAX_TRANSLATE_Y;
        // console.log("point",SNAP_POINT)
        // console.log("TransY",MAX_TRANSLATE_Y)
      }
    });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  useEffect(() => {
    translateY.value = MAX_TRANSLATE_Y;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    enabled && (
      <>
        <GestureDetector gesture={tapGesture}>
          <Animated.View
            entering={FadeIn.delay(10)}
            exiting={FadeOut.delay(10)}
            style={[styles.overlay]}></Animated.View>
        </GestureDetector>
        {videoState.fullscreen ? (
          <View style={[styles.overlayContainer, {left: LEFT, right: 0}]}>
            <View
              style={[
                styles.container,
                {
                  width: '100%',
                  height: '100%',
                  paddingTop: 20,
                  borderRadius: borderRadius,
                  ...containerStyle,
                },
              ]}>
              <>{children}</>
            </View>
          </View>
        ) : (
          <Animated.View
            style={[
              styles.overlayContainer,
              {left: LEFT, right: RIGHT},
              rStyle,
            ]}>
            <View
              style={[
                styles.container,
                {
                  width: '100%',
                  height: MAX_HEIGHT,
                  borderRadius: BORDER_RADIUS,
                  overflow: 'hidden',
                  ...containerStyle,
                },
              ]}>
              <GestureDetector gesture={panGesture}>
                <Animated.View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'rgba(255,255,255,0.15)',
                  }}>
                  <F6Icon name="grip-lines" color={color.White} size={30} />
                </Animated.View>
              </GestureDetector>
              <View
                style={{
                  paddingTop: 5,
                  flex: 1,
                }}>
                {children}
              </View>
            </View>
          </Animated.View>
        )}
      </>
    )
  );
};

export default memo(BottomSheet);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  overlayContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    margin: 0,
  },

  container: {
    backgroundColor: color.DarkBackGround2,
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: color.White,
    alignSelf: 'center',
    borderRadius: 10,
  },
  barStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
});
