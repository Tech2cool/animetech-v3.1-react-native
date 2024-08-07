import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TapControler} from '../TapController';
import {F5Icon, IIcon, MCIcon} from '../../utils/constant';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
import {runOnJS} from 'react-native-reanimated';
import Switch from '../Custom/Switch';
const color = Theme.DARK;
interface TopWrapperProps {
  onPressPlayPause: () => void;
  toggleSetting: () => void;
  onSeek: (value: number) => void;
  iconSize: number;
  iconColor: string;
}

const TopWrapper: React.FC<TopWrapperProps> = ({
  onPressPlayPause,
  onSeek,
  iconSize,
  iconColor,
  toggleSetting,
}) => {
  const {videoState, controlState, onChangeAutoPlay} = useVideo();
  const onDummy = () => {
    'worklet';
  };
  const onPauseTapHandler = () => {
    'worklet';
    runOnJS(onPressPlayPause)();
  };
  const onSeekFowardTapHandler = () => {
    'worklet';
    runOnJS(onSeek)(videoState.currentTime + 10);
  };
  const onSeekRewindTapHandler = () => {
    'worklet';
    runOnJS(onSeek)(videoState.currentTime - 10);
  };
  const onToggleSetting = () => {
    'worklet';
    runOnJS(toggleSetting)();
  };

  return (
    <View style={styles.TopWrapper}>
      <View style={styles.TopHeader}>
        <TapControler onPress={onDummy}>
          <MCIcon name={'chevron-down'} size={iconSize} color={color.White} />
        </TapControler>

        <View style={styles.iconHolder}>
          <TapControler onPress={onDummy}>
            <Switch
              activeColor={'rgba(240,240,240,0.4)'}
              inActiveColor={'rgba(50,50,50,0.4)'}
              active={controlState.autoPlayNext}
              setActive={onChangeAutoPlay}
            />
          </TapControler>

          <TapControler onPress={onToggleSetting}>
            <IIcon
              name={'settings-outline'}
              size={iconSize - 5}
              color={iconColor}
            />
          </TapControler>
        </View>
      </View>
      <View style={styles.TopMiddleWrapper}>
        <TapControler onPress={onSeekRewindTapHandler}>
          <MCIcon name={'rewind-10'} size={iconSize} color={color.White} />
        </TapControler>
        <TapControler onPress={onPauseTapHandler}>
          <F5Icon
            name={videoState.paused ? 'play-circle' : 'pause-circle'}
            size={iconSize + 5}
            color={color.White}
          />
        </TapControler>
        <TapControler onPress={onSeekFowardTapHandler}>
          <MCIcon
            name={'fast-forward-10'}
            size={iconSize}
            color={color.White}
          />
        </TapControler>
      </View>
    </View>
  );
};

export default TopWrapper;

const styles = StyleSheet.create({
  TopWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  TopHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  TopMiddleWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  iconHolder: {
    flexDirection: 'row',
    gap: 10,
  },
});
