import {StyleSheet, View} from 'react-native';
import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import useVideo from '../../hooks/useVideo';
import Theme from '../../utils/Theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {runOnJS, useSharedValue} from 'react-native-reanimated';
import SeekingComp from './SeekingComp';
import BottomSliderOnly from './BottomSliderOnly';
import TopWrapper from './TopWrapper';
import BottomWrapper from './BottomWrapper';
interface ControlProps {
  onSeek: (value: number) => void;
  onPressPlayPause: () => void;
  toggleFullscreen: () => void;
}
const color = Theme.DARK;
const Controls: React.FC<ControlProps> = ({
  onSeek,
  onPressPlayPause,
  toggleFullscreen,
}) => {
  const {
    controlState,
    videoState,
    toggleControls,
    toggleSetting,
    toggleAutoPlay,
  } = useVideo();
  const [seeking, setSeeking] = useState(false);
  const [totalSeekTime, setTotalSeekTime] = useState<number>(0);
  const [seekType, setseekType] = useState<string | undefined>(undefined);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const refSeeking = useRef<any>(null);
  const iconSize = useMemo(
    () => (videoState.fullscreen ? 35 : 30),
    [videoState.fullscreen],
  );
  const iconColor = useMemo(() => color.White, []);

  const onDoubleTapEvent = useCallback(() => {
    setSeeking(true);
  }, []);

  const seekToWithTimeOut = useCallback(
    (seekTYPE: string) => {
      let seekTime = videoState.currentTime + 10;
      if (seekTYPE === 'LEFT') {
        seekTime = videoState.currentTime - 10;
        setTotalSeekTime(prev => prev - 10);
      } else {
        setTotalSeekTime(prev => prev + 10);
      }
      onSeek(seekTime);
      setseekType(seekTYPE);
      clearTimeout(refSeeking?.current);
      refSeeking.current = setTimeout(() => {
        setSeeking(false);
        setseekType(undefined);
        setTotalSeekTime(0);
      }, 500);
    },
    [videoState.currentTime, onSeek],
  );

  const tap = useMemo(
    () =>
      Gesture.Tap().onStart(() => {
        runOnJS(toggleControls)();
      }),
    [toggleControls],
  );

  const DoubleTap = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
          runOnJS(onDoubleTapEvent)();
        }),
    [onDoubleTapEvent],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          translationX.value = 0;
          translationY.value = 0;
        })
        .onUpdate(e => {
          translationX.value = e.translationX;
          translationY.value = e.translationY;
        })
        .onEnd(e => {
          const threshold = 45;

          if (Math.abs(e.translationY) > threshold) {
            if (e.translationY <= -20 && !videoState.fullscreen) {
              runOnJS(toggleFullscreen)();
            } else if (
              (e.translationX < -3 && videoState.fullscreen) ||
              (e.translationY >= 20 && videoState.fullscreen)
            ) {
              runOnJS(toggleFullscreen)();
            }
          }

          translationX.value = 0;
          translationY.value = 0;
        }),
    [toggleFullscreen, translationX, translationY, videoState.fullscreen],
  );

  const taps = Gesture.Exclusive(DoubleTap, tap);
  const gesture = Gesture.Race(pan, taps);

  return (
    <View style={[styles.wrapper]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.flexContainer}>
          <View
            style={controlState.showControl ? styles.container : styles.noOps}>
            <TopWrapper
              iconSize={iconSize}
              iconColor={iconColor}
              onPressPlayPause={onPressPlayPause}
              onSeek={onSeek}
              toggleSetting={toggleSetting}
              paused={videoState.paused}
              currentTime={videoState.currentTime}
              autoPlayNext={controlState.autoPlayNext}
              onChangeAutoPlay={toggleAutoPlay}
            />
          </View>
        </Animated.View>
      </GestureDetector>
      <BottomWrapper
        toggleFullscreen={toggleFullscreen}
        iconSize={iconSize}
        onSeek={onSeek}
      />

      <BottomSliderOnly onSeek={onSeek} />
      <SeekingComp
        seekToWithTimeOut={seekToWithTimeOut}
        seekType={seekType!}
        seeking={seeking}
        totalSeekTime={totalSeekTime}
      />
    </View>
  );
};

export default memo(Controls);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  noOps: {
    opacity: 0,
  },
});
