import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import Video, {OnVideoErrorData} from 'react-native-video';
import useVideo from '../../hooks/useVideo';
import Controls from './Controls';

interface VideoPlayerProps {
  url: string | undefined;
  isLoading: boolean;
  handleNextBtn: () => void;
}
// const {width, height} = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url = '',
  isLoading = false,
  handleNextBtn,
}) => {
  const {
    videoState,
    videoRef,
    onLoad,
    onLoadStart,
    onSeek,
    onBuffer,
    onProgress,
    onPressPlayPause,
    toggleFullscreen,
    onPlaybackStateChanged,
    onEnd,
  } = useVideo();

  return (
    <View
      style={videoState.fullscreen ? styles.containerFull : styles.container}>
      <Video
        ref={videoRef}
        source={{uri: url}}
        style={styles.videoPlayer}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onBuffer={onBuffer}
        onEnd={() => onEnd(handleNextBtn)}
        {...videoState}
        rate={videoState.playbackRate}
        controls={false}
        fullscreen={false}
        progressUpdateInterval={1000}
        onPlaybackStateChanged={onPlaybackStateChanged}
        onError={(e: OnVideoErrorData) => {
          Alert.alert('error', e?.error?.errorString);
        }}
      />
      <Controls
        onSeek={onSeek}
        onPressPlayPause={onPressPlayPause}
        toggleFullscreen={toggleFullscreen}
      />
      {(isLoading || videoState.isBuffering) && (
        <ActivityIndicator color={'red'} size={30} style={styles.indicator} />
      )}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  containerFull: {
    // height: width,
    // width: height,
    // aspectRatio: 16 / 9,
    position: 'relative',
    // backgroundColor: 'red',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  videoPlayerNo: {
    flex: 0,
  },
  indicator: {
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: '50%',
    bottom: '50%',
  },
});
