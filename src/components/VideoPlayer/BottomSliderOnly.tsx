import {Platform, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
import Slider from '@react-native-community/slider';
const color = Theme.DARK;
interface BSOnlyProps {
  onSeek: (value: number) => void;
}

const BottomSliderOnly: React.FC<BSOnlyProps> = ({onSeek}) => {
  const {videoState, controlState} = useVideo();
  return (
    <View
      style={
        videoState.fullscreen
          ? styles.sliderNo
          : controlState.showControl
          ? styles.sliderWrapper
          : styles.sliderWrapperNot
      }>
      <Slider
        minimumValue={0}
        value={videoState.currentTime}
        maximumValue={videoState.duration}
        onValueChange={onSeek}
        style={styles.slider}
        thumbTintColor={controlState.showControl ? color.Orange : 'transparent'}
        minimumTrackTintColor={color.Orange}
      />
    </View>
  );
};

export default memo(BottomSliderOnly);

const styles = StyleSheet.create({
  sliderWrapper: {
    marginHorizontal: Platform.select({ios: 0, android: -10}),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sliderWrapperNot: {
    marginHorizontal: Platform.select({ios: 0, android: -10}),
  },
  slider: {
    width: '100%',
    bottom: -8,
    padding: 0,
  },
  sliderNo: {
    display: 'none',
    opacity: 0,
  },
  fullBottomView: {
    paddingVertical: 35,
  },
  none: {
    display: 'none',
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
