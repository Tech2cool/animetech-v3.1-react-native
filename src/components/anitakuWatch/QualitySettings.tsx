import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {MCIcon, MIcon} from '../../utils/constant';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
import {SelectedVideoTrackType, VideoTrack} from 'react-native-video';
const color = Theme.DARK;
const font = Theme.FONTS;
const QualitySetting = () => {
  const {videoState, setVideoState, setControlState, controlState} = useVideo();
  const QualityIcon = useCallback((src: VideoTrack) => {
    if (src?.height === 360 || src?.height === 480) {
      return 'quality-low';
    }
    return 'quality-high';
  }, []);
  const handleGOBack = () => {
    setControlState(prev => ({
      ...prev,
      showSetting: true,
      showPlayBackRateSetting: false,
      showQualitySetting: false,
    }));
  };
  return (
    controlState.showQualitySetting && (
      <View style={[styles.container]}>
        <TouchableOpacity onPress={handleGOBack} style={[styles.BackBtn]}>
          <MIcon name="arrow-back-ios" size={20} color={color.White} />
          <Text style={styles.btnText}>Quality</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <ScrollView>
            {videoState?.videoTracks?.map((track: VideoTrack, i: number) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.Btn,
                  videoState.selectedVideoTrack.value === track.height
                    ? styles.active
                    : undefined,
                ]}
                onPress={() => {
                  setVideoState(prev => ({
                    ...prev,
                    selectedVideoTrack: {
                      type: SelectedVideoTrackType.RESOLUTION,
                      value: track.height,
                    },
                    quality: track?.height?.toString() || 'default',
                  }));
                }}>
                <MCIcon
                  name={QualityIcon(track)}
                  size={28}
                  color={color.White}
                />
                <Text style={styles.btnText}>{track?.height}</Text>
              </TouchableOpacity>
            ))}
            {videoState.selectedVideoTrack.type ===
              SelectedVideoTrackType.AUTO && (
              <TouchableOpacity
                style={[
                  styles.Btn,
                  {
                    backgroundColor: color.Orange,
                  },
                ]}
                onPress={() => {
                  setVideoState(prev => ({
                    ...prev,
                    selectedVideoTrack: {
                      type: SelectedVideoTrackType.AUTO,
                      value: 0,
                    },
                  }));
                }}>
                <MCIcon name={'quality-high'} size={28} color={color.White} />
                <Text style={styles.btnText}>Auto</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    )
  );
};

export default memo(QualitySetting);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
  },
  Btn: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
    borderBottomColor: color.LighterGray,
    borderRadius: 5,
  },
  active: {
    backgroundColor: color.Orange,
  },
  BackBtn: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
    borderBottomColor: color.LighterGray,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  btnText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
    fontSize: 15,
  },
});
