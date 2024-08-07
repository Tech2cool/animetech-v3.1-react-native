import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import useVideo from '../../hooks/useVideo';
import Controls from './Controls';
interface VideoPlayerProps {
  url: string | undefined;
  isLoading: boolean;
}
// const {width, height} = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({url, isLoading}) => {
  const {
    videoState,
    VideoRef,
    onLoad,
    onLoadStart,
    onSeek,
    onBuffer,
    onProgress,
    onPressPlayPause,
    toggleFullscreen,
  } = useVideo();

  return (
    <View
      style={videoState.fullscreen ? styles.containerFull : styles.container}>
      <Video
        ref={VideoRef}
        source={{uri: url}}
        style={styles.videoPlayer}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onBuffer={onBuffer}
        {...videoState}
        rate={videoState.playbackRate}
        fullscreen={false}
        controls={false}
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
