import {StyleSheet, View} from 'react-native';
import React, {memo, useRef, useState} from 'react';
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
  const {controlState, videoState, toggleControls, toggleSetting} = useVideo();
  const [seeking, setSeeking] = useState(false);
  const [totalSeekTime, setTotalSeekTime] = useState<number>(0);
  const [seekType, setseekType] = useState<string | undefined>(undefined);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const refSeeking = useRef<any>(null);
  const iconSize = videoState.fullscreen ? 35 : 30;
  const iconColor = color.White;
  const onDoubleTapEvent = () => {
    setSeeking(true);
  };

  const seekToWithTimeOut = (seekTYPE: string) => {
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
  };

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(toggleControls)();
  });

  const DoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(onDoubleTapEvent)();
    });

  const pan = Gesture.Pan()
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
    });

  const taps = Gesture.Exclusive(DoubleTap, tap);
  const gesture = Gesture.Race(pan, taps);

  return (
    <View pointerEvents="box-none" style={[styles.wrapper]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.flexContainer}>
          <View
            style={controlState.showControl ? styles.container : styles.noOps}
            pointerEvents={videoState.fullscreen ? 'box-none' : 'auto'} // Allow touch events to pass through in fullscreen
          >
            <TopWrapper
              iconSize={iconSize}
              iconColor={iconColor}
              onPressPlayPause={onPressPlayPause}
              onSeek={onSeek}
              toggleSetting={toggleSetting}
            />
            <BottomWrapper
              toggleFullscreen={toggleFullscreen}
              iconSize={iconSize}
              onSeek={onSeek}
            />
          </View>
        </Animated.View>
      </GestureDetector>
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
