/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import useVideo from '../../hooks/useVideo';
import {TapControler} from '../TapController';
import {MIcon} from '../../utils/constant';
import Theme from '../../utils/Theme';
import Slider from '@react-native-community/slider';
import {runOnJS} from 'react-native-reanimated';
const color = Theme.DARK;

interface BottomWrapperProps {
  toggleFullscreen: () => void;
  onSeek: (value: number) => void;
  iconSize: number;
}
const BottomWrapper: React.FC<BottomWrapperProps> = ({
  toggleFullscreen,
  iconSize,
  onSeek,
}) => {
  // console.log('control Bottom Wrapper');

  const {videoTimeFormat, videoState, controlState} = useVideo();
  const onToggleFullscreen = () => {
    'worklet';
    runOnJS(toggleFullscreen)();
  };

  const memoziedCurrentTime = useMemo(() => {
    if (videoState.currentTime) {
      return videoTimeFormat(videoState.currentTime);
    }
    return '00:00';
  }, [videoState.currentTime]);

  const memoziedDuration = useMemo(() => {
    if (videoState.duration) {
      return videoTimeFormat(videoState.duration);
    }
    return '00:00';
  }, [videoState.duration]);

  return (
    <View style={!controlState.showControl ? styles.none : styles.container}>
      <View style={styles.bottomWrapper}>
        <View style={styles.timeHolder}>
          <Text style={styles.currentTime}>{memoziedCurrentTime}</Text>
          <Text>/</Text>
          <Text style={styles.duration}>{memoziedDuration}</Text>
        </View>
        <TapControler onPress={onToggleFullscreen}>
          <MIcon name="fullscreen" size={iconSize} color={color.White} />
        </TapControler>
      </View>
      <View style={!videoState.fullscreen ? styles.none : undefined}>
        <Slider
          minimumValue={0}
          value={videoState.currentTime}
          maximumValue={videoState.duration}
          onValueChange={onSeek}
          style={styles.slider}
          thumbTintColor={color.Orange}
          minimumTrackTintColor={color.Orange}
        />

        <View
          style={videoState.fullscreen ? styles.fullBottomView : styles.none}>
          <Text>upcoming</Text>
        </View>
      </View>
    </View>
  );
};

export default BottomWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomWrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    // bottom: -5,
  },
  timeHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingLeft: 5,
    paddingBottom: 2,
  },
  currentTime: {
    color: color.White,
    fontSize: 12,
  },
  duration: {
    color: color.White,
    fontSize: 12,
  },
  sliderWrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sliderWrapperNot: {
    backgroundColor: 'transparent',
  },
  slider: {
    width: '100%',
    bottom: -8,
    padding: 0,
  },
  fullBottomView: {
    paddingVertical: 25,
    opacity: 0,
  },
  none: {
    display: 'none',
    opacity: 0,
    zIndex: -1,
  },
  thumbStyle: {
    top: -7,
    width: 15,
    height: 15,
    borderColor: color.Orange,
    backgroundColor: color.Orange,
    borderWidth: 4,
  },
  sliderFillStyle: {
    height: 2,
    backgroundColor: color.Orange,
  },
  sliderTrackStyle: {
    width: '100%',
    height: 2,
  },
});
