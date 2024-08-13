// /* eslint-disable react-hooks/exhaustive-deps */
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
  const videoRef = useRef<VideoRef>(null);
  const updateTimerRef = useRef<any>(null);
  const initialTimerRef = useRef<any>(null);
  const seekTimeoutRef = useRef<any>(null);
  const progressCounterRef = useRef<number>(0);

  const {
    videoState,
    controlState,
    setControlState,
    setVideoState,
    setVideoInfo,
    videoInfo,
  } = useVideoState();
  const {setting} = useSetting();

  const resetVideoAndControlsState = useCallback(() => {
    setVideoState(initialStateVideoState);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {autoPlayNext, ...otherCotrolsOps} = initialStateControlState;
    setControlState(prev => ({
      ...prev,
      otherCotrolsOps,
    }));
  }, [setControlState, setVideoState]);

  const onChangeDownloadSheet = useCallback(
    (value: boolean) => {
      setControlState(prev => ({
        ...prev,
        showDownloadSheet: value,
      }));
    },
    [setControlState],
  );
  //onSeek
  const onSeek = useCallback(
    (value: number) => {
      videoRef.current?.seek(value < 0 ? 0 : value);
      setVideoState(prev => ({
        ...prev,
        currentTime: value < 0 ? 0 : value,
        isSeeking: prev.isSeeking === true ? prev.isSeeking : true,
      }));
      clearTimeout(seekTimeoutRef?.current);
      seekTimeoutRef.current = setTimeout(() => {
        setVideoState(prev => ({
          ...prev,
          isSeeking: false,
        }));
      }, 500);
    },
    [setVideoState],
  );

  const onChangeResizeSetting = useCallback(
    (value: boolean) => {
      setControlState(prev => ({
        ...prev,
        showResizeSetting: value,
      }));
    },
    [setControlState],
  );

  const onChangeShowChats = useCallback(() => {
    setControlState(prev => ({
      ...prev,
      showChats: !prev.showChats,
    }));
  }, [setControlState]);

  const onChangeResizeMode = useCallback(
    (value: ResizeMode) => {
      setVideoState(prev => ({
        ...prev,
        resizeMode: value,
      }));
    },
    [setVideoState],
  );

  const toggleControls = useCallback(() => {
    setControlState(prev => ({
      ...prev,
      showControl: !prev.showControl,
    }));
  }, [setControlState]);

  const toggleSetting = useCallback(() => {
    setControlState(prev => ({
      ...prev,
      showSetting: !prev.showSetting,
    }));
  }, [setControlState]);

  const toggleFullscreen = useCallback(() => {
    if (videoState.fullscreen) {
      setVideoState(prev => ({...prev, fullscreen: false}));
      Orientation.lockToPortrait();
      // SystemNavigationBar.stickyImmersive(false);
      videoRef.current?.dismissFullscreenPlayer();
    } else {
      setVideoState(prev => ({...prev, fullscreen: true}));
      Orientation.lockToLandscape();
      // SystemNavigationBar.stickyImmersive();
      videoRef.current?.presentFullscreenPlayer();
    }
  }, [videoState.fullscreen, setVideoState]);

  const onVideoParams = useCallback(
    (
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
    },
    [setVideoInfo],
  );

  const updateRecordOnProgress = useCallback(async () => {
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
  }, [
    videoInfo.episodeId,
    videoInfo.id,
    videoInfo.animeInfo,
    videoState.currentTime,
    videoState.duration,
    videoInfo.episodeNum,
    videoInfo.provider,
  ]);

  const onPlaybackStateChanged = useCallback(() => {
    // console.log(e);
  }, []);
  // VideoPlayer Events Start
  //onLoadStart
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLoadStart = useCallback((data: OnLoadStartData) => {
    // console.log(JSON.stringify(data, null, 2));
    // console.log('onLoadStart Called');
  }, []);

  const onLoadCallback = useCallback(async () => {
    if (!videoInfo.episodeId) return;
    const resp = await getAsyncData(videoInfo.episodeId);
    if (!resp) return;
    // console.log(resp);
    onSeek(JSON.parse(resp));
    // setVideoState(prev => ({
    //   ...prev,
    //   currentTime: JSON.parse(resp),
    // }));
  }, [videoInfo.episodeId, onSeek]);

  //onLoad
  const onLoad = useCallback(
    (data: OnLoadData) => {
      // console.log(JSON.stringify(data, null, 2));
      // console.log('onLoad Called');
      let findQuality;
      if (setting.isWifi) {
        findQuality = data.videoTracks?.find(
          item => item.height === setting.wifiQuality,
        );
      } else {
        findQuality = data.videoTracks?.find(
          item => item.height === setting.mobileQuality,
        );
      }
      // console.log(findQuality);
      setVideoState(prev => ({
        ...prev,
        currentTime: data.currentTime,
        duration: data.duration,
        videoTracks: data.videoTracks,
        selectedVideoTrack: {
          ...prev.selectedVideoTrack,
          type: findQuality
            ? SelectedVideoTrackType.RESOLUTION
            : SelectedVideoTrackType.AUTO,
          value: findQuality ? findQuality?.height : 0,
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
    },
    [
      setting.isWifi,
      setting.mobileQuality,
      setting.wifiQuality,
      setControlState,
      setVideoState,
    ],
  );

  //onBuffer
  const onBuffer = useCallback(
    (data: OnBufferData) => {
      // console.log(JSON.stringify(data, null, 2));
      setVideoState(prev => ({
        ...prev,
        isBuffering: data.isBuffering,
      }));
      // console.log('onLoadStart Called');
    },
    [setVideoState],
  );

  //togglePlayPause
  const onPressPlayPause = useCallback(() => {
    if (videoState.paused) {
      videoRef.current?.resume();
      setVideoState(prev => ({...prev, paused: false}));
    } else {
      videoRef.current?.pause();
      setVideoState(prev => ({...prev, paused: true}));
    }
  }, [videoState.paused, setVideoState]);

  const updateProgressCunter = useCallback(() => {
    if (videoState.paused) {
      progressCounterRef.current = 0;
    } else {
      if (
        progressCounterRef.current > 3 &&
        controlState.showControl &&
        !videoState.isSeeking
      ) {
        toggleControls();
        progressCounterRef.current = 0;
      } else if (controlState.showControl && !videoState.isSeeking) {
        progressCounterRef.current += 1;
      }
    }
  }, [
    videoState.paused,
    controlState.showControl,
    toggleControls,
    videoState.isSeeking,
  ]);

  //onProgress
  const onProgress = useCallback(
    (data: OnProgressData) => {
      setVideoState(prev => ({
        ...prev,
        currentTime: data.currentTime,
        playableDuration: data.playableDuration,
        seekableDuration: data.seekableDuration,
      }));
      updateProgressCunter();
      clearTimeout(updateTimerRef?.current);
      updateTimerRef.current = setTimeout(() => {
        updateRecordOnProgress();
      }, 500);
    },
    [updateRecordOnProgress, setVideoState, updateProgressCunter],
  );
  const onEnd = useCallback(
    (handleNext: () => void) => {
      //end
      if (controlState.autoPlayNext) {
        //b
        handleNext();
      }
    },
    [controlState.autoPlayNext],
  );
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

  const qualitySettingOp = useCallback(
    (ops: boolean = false) => {
      setControlState(prev => ({...prev, showQualitySetting: ops}));
    },
    [setControlState],
  );

  const playbackRateSettingOp = useCallback(
    (ops: boolean = false) => {
      setControlState(prev => ({...prev, showPlayBackRateSetting: ops}));
    },
    [setControlState],
  );

  const resizeModeSettingOp = useCallback(
    (ops: boolean = false) => {
      setControlState(prev => ({...prev, showResizeSetting: ops}));
    },
    [setControlState],
  );

  const settingOp = useCallback(
    (ops: boolean = false) => {
      setControlState(prev => ({...prev, showSetting: ops}));
    },
    [setControlState],
  );

  const setResizeVideo = useCallback(
    (resize: resizeModeType) => {
      setVideoState(prev => ({...prev, resizeMode: resize}));
    },
    [setVideoState],
  );

  const onChangeAutoPlay = useCallback(
    (value: boolean) => {
      setControlState(prev => ({
        ...prev,
        autoPlayNext: value,
      }));
      Toast.success(`AutoPlay ${value === true ? 'on' : 'off'}`, 'top');
    },
    [setControlState],
  );

  const toggleAutoPlay = useCallback(() => {
    setControlState(prev => ({
      ...prev,
      autoPlayNext: !prev.autoPlayNext,
    }));
    Toast.success(
      `AutoPlay ${controlState.autoPlayNext ? 'on' : 'off'}`,
      'top',
    );
  }, [controlState.autoPlayNext, setControlState]);

  useEffect(() => {
    if (!controlState.initialLoaded) return;
    if (videoState.duration <= 0) return;
    onLoadCallback();
  }, [controlState.initialLoaded, onLoadCallback, videoState.duration]);

  return {
    videoRef,
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
    toggleAutoPlay,
    onEnd,
    onPlaybackStateChanged,
  };
};

export default useVideo;
