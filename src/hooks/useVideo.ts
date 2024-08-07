/* eslint-disable react-hooks/exhaustive-deps */
import {
  OnBufferData,
  OnLoadData,
  OnLoadStartData,
  OnProgressData,
  ResizeMode,
  SelectedVideoTrackType,
  VideoRef,
} from 'react-native-video';
import {
  initialStateControlState,
  initialStateVideoState,
  useVideoState,
} from '../context/VideoStateContext';
import {useCallback, useEffect, useRef} from 'react';
import Orientation from 'react-native-orientation-locker';
import {getAsyncData, setAsyncData} from '../utils/helperFunctions';
import {Toast} from 'toastify-react-native';
import {saveVideoRecord} from '../api/sqlLite';
import {useSetting} from '../context/SettingContext';
type resizeModeType = 'none' | 'contain' | 'cover' | 'stretch';
// interface useVidProps {
//   anime?: animeInfo;
//   episodeId?: string;
//   episodeNum?: string;
// }
const useVideo = () => {
  const VideoRef = useRef<VideoRef>(null);
  const updateTimerRef = useRef<any>(null);
  const initialTimerRef = useRef<any>(null);

  const {
    videoState,
    controlState,
    setControlState,
    setVideoState,
    setVideoInfo,
    videoInfo,
  } = useVideoState();
  const {setting} = useSetting();

  const resetVideoAndControlsState = () => {
    setVideoState(initialStateVideoState);
    setControlState(initialStateControlState);
  };
  const onChangeDownloadSheet = (value: boolean) => {
    setControlState(prev => ({
      ...prev,
      showDownloadSheet: value,
    }));
  };
  const onChangeResizeSetting = (value: boolean) => {
    setControlState(prev => ({
      ...prev,
      showResizeSetting: value,
    }));
  };
  const onChangeShowChats = (value: boolean) => {
    setControlState(prev => ({
      ...prev,
      showChats: value,
    }));
  };

  const onChangeResizeMode = (value: ResizeMode) => {
    setVideoState(prev => ({
      ...prev,
      resizeMode: value,
    }));
  };

  const toggleControls = () => {
    setControlState(prev => ({
      ...prev,
      showControl: !prev.showControl,
    }));
  };
  const toggleSetting = () => {
    setControlState(prev => ({
      ...prev,
      showSetting: !prev.showSetting,
    }));
  };
  const toggleFullscreen = () => {
    if (videoState.fullscreen) {
      setVideoState(prev => ({...prev, fullscreen: false}));
      Orientation.lockToPortrait();
      // SystemNavigationBar.stickyImmersive(false);
      VideoRef.current?.dismissFullscreenPlayer();
    } else {
      setVideoState(prev => ({...prev, fullscreen: true}));
      Orientation.lockToLandscape();
      // SystemNavigationBar.stickyImmersive();
      VideoRef.current?.presentFullscreenPlayer();
    }
  };
  const onVideoParams = (
    id: string,
    episodeId: string,
    episodeNum: number,
    animeInfo: animeInfo,
    provider: string,
  ) => {
    setVideoInfo(prev => ({
      ...prev,
      id,
      episodeId,
      episodeNum,
      animeInfo,
      provider,
    }));
  };
  const updateRecordOnProgress = async () => {
    if (!videoInfo.animeInfo?.animeId || !videoInfo.episodeId) return;
    // console.log(JSON.stringify(videoInfo, null, 2));
    try {
      const record = {
        id: videoInfo.id,
        episodeIdGogo: videoInfo.episodeId,
        animeImg: videoInfo.animeInfo?.animeImg,
        episodeNum: videoInfo.episodeNum,
        english: videoInfo.animeInfo?.animeTitle?.english,
        english_jp: videoInfo.animeInfo?.animeTitle?.english_jp,
        japanese: videoInfo.animeInfo?.animeTitle?.japanese,
        currentTime: videoState.currentTime,
        duration: videoState.duration,
        gogoId: videoInfo.id,
        timestamp: new Date().getTime(),
        wannaDelete: false,
        provider: videoInfo.provider,
      };
      await saveVideoRecord(record);
      await setAsyncData(
        videoInfo.episodeId,
        JSON.stringify(videoState.currentTime),
      );
      // console.log("update")
    } catch (err: any) {
      Toast.error(err?.message, 'top');
    }
  };

  // VideoPlayer Events Start
  //onLoadStart
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLoadStart = useCallback((data: OnLoadStartData) => {
    // console.log(JSON.stringify(data, null, 2));
    // console.log('onLoadStart Called');
  }, []);

  const onLoadCallback = async () => {
    if (!videoInfo.episodeId) return;
    const resp = await getAsyncData(videoInfo.episodeId);
    if (!resp) return;
    // console.log(resp);
    onSeek(JSON.parse(resp));
    // setVideoState(prev => ({
    //   ...prev,
    //   currentTime: JSON.parse(resp),
    // }));
  };

  //onLoad
  const onLoad = useCallback((data: OnLoadData) => {
    // console.log(JSON.stringify(data, null, 2));
    // console.log('onLoad Called');
    let findQuality = 'default';
    if (setting.isWifi) {
      findQuality =
        data.videoTracks?.find(item => item.height === setting.wifiQuality) ||
        'default';
    } else {
      findQuality =
        data.videoTracks?.find(item => item.height === setting.mobileQuality) ||
        'default';
    }
    // console.log(findQuality);
    setVideoState(prev => ({
      ...prev,
      currentTime: data.currentTime,
      duration: data.duration,
      videoTracks: data.videoTracks,
      selectedVideoTrack: {
        ...prev.selectedVideoTrack,
        type:
          findQuality !== 'default'
            ? SelectedVideoTrackType.RESOLUTION
            : SelectedVideoTrackType.AUTO,
        value: findQuality !== 'default' ? findQuality?.height : 0,
      },
      quality: JSON.stringify(findQuality?.height) || 'default',
    }));
    setControlState(prev => ({
      ...prev,
      initialLoaded: true,
    }));
    clearTimeout(initialTimerRef?.current);
    initialTimerRef.current = setTimeout(() => {
      setControlState(prev => ({
        ...prev,
        initialLoaded: false,
      }));
    }, 4000);
    // onLoadCallback();
  }, []);

  //onBuffer
  const onBuffer = useCallback((data: OnBufferData) => {
    // console.log(JSON.stringify(data, null, 2));
    setVideoState(prev => ({
      ...prev,
      isBuffering: data.isBuffering,
    }));
    // console.log('onLoadStart Called');
  }, []);

  //onSeek
  const onSeek = useCallback((value: number) => {
    VideoRef.current?.seek(value < 0 ? 0 : value);
    setVideoState(prev => ({
      ...prev,
      currentTime: value < 0 ? 0 : value,
    }));
  }, []);

  //togglePlayPause
  const onPressPlayPause = () => {
    if (videoState.paused) {
      VideoRef.current?.resume();
      setVideoState({...videoState, paused: false});
    } else {
      VideoRef.current?.pause();
      setVideoState({...videoState, paused: true});
    }
  };

  //onProgress
  const onProgress = useCallback((data: OnProgressData) => {
    setVideoState(prev => ({
      ...prev,
      currentTime: data.currentTime,
      playableDuration: data.playableDuration,
      seekableDuration: data.seekableDuration,
    }));
    clearTimeout(updateTimerRef?.current);
    updateTimerRef.current = setTimeout(() => {
      updateRecordOnProgress();
    }, 500);
  }, []);
  // VideoPlayer Events end

  const videoTimeFormat = useCallback((time: number) => {
    if (isNaN(time) || !isFinite(time)) {
      return '0:00';
    }

    time = Math.floor(time);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = time - hours * 3600 - minutes * 60;
    if (time < 3600) {
      return minutes + ':' + ('0' + seconds).slice(-2);
    } else {
      return (
        hours +
        ':' +
        ('0' + minutes).slice(-2) +
        ':' +
        ('0' + seconds).slice(-2)
      );
    }
  }, []);

  const qualitySettingOp = (ops: boolean = false) => {
    setControlState(prev => ({...prev, showQualitySetting: ops}));
  };

  const playbackRateSettingOp = (ops: boolean = false) => {
    setControlState(prev => ({...prev, showPlayBackRateSetting: ops}));
  };
  const resizeModeSettingOp = (ops: boolean = false) => {
    setControlState(prev => ({...prev, showResizeSetting: ops}));
  };
  const settingOp = (ops: boolean = false) => {
    setControlState(prev => ({...prev, showSetting: ops}));
  };
  const setResizeVideo = (resize: resizeModeType) => {
    setVideoState({...videoState, resizeMode: resize});
  };

  const onChangeAutoPlay = (value: boolean) => {
    setControlState(prev => ({
      ...prev,
      autoPlayNext: value,
    }));
    Toast.success(`AutoPlay ${value ? 'on' : 'off'}`, 'top');
  };
  useEffect(() => {
    if (!controlState.initialLoaded) return;
    if (videoState.duration <= 0) return;
    onLoadCallback();
  }, [controlState.initialLoaded]);

  return {
    VideoRef,
    videoState,
    controlState,
    toggleControls,
    onLoad,
    onLoadStart,
    onSeek,
    onBuffer,
    onProgress,
    onPressPlayPause,
    videoTimeFormat,
    toggleSetting,
    toggleFullscreen,
    setResizeVideo,
    settingOp,
    resizeModeSettingOp,
    playbackRateSettingOp,
    qualitySettingOp,
    setControlState,
    setVideoState,
    onChangeDownloadSheet,
    resetVideoAndControlsState,
    onChangeResizeMode,
    onChangeResizeSetting,
    onChangeShowChats,
    onVideoParams,
    onChangeAutoPlay,
  };
};

export default useVideo;
