/* eslint-disable react/react-in-jsx-scope */
import {createContext, useContext, useState} from 'react';
import {
  SelectedVideoTrack,
  SelectedVideoTrackType,
  VideoTrack,
} from 'react-native-video';

export interface videoStateProps {
  url: string | undefined;
  currentTime: number;
  duration: number;
  paused: boolean;
  isBuffering: boolean;
  isSeeking: boolean;
  fullscreen: boolean;
  resizeMode: 'none' | 'contain' | 'cover' | 'stretch';
  videoTracks: VideoTrack[];
  playbackRate: number;
  quality: string;
  selectedVideoTrack: SelectedVideoTrack;
  playableDuration: number;
  seekableDuration: number;
}
export interface controlProps {
  showControl: boolean;
  showSetting: boolean;
  showResizeSetting: boolean;
  showQualitySetting: boolean;
  showPlayBackRateSetting: boolean;
  showDownloadSheet: boolean;
  showChats: boolean;
  initialLoaded: boolean;
  autoPlayNext: boolean;
  autoPlayDelay: number;
}
interface videoProps {
  id: string | undefined;
  episodeId: string | undefined;
  episodeNum: number | undefined;
  animeInfo: animeInfo | undefined;
  provider: string | undefined;
}

interface childernProp {
  children: React.ReactNode;
}

interface contextType {
  videoState: videoStateProps;
  controlState: controlProps;
  videoInfo: videoProps;
  setVideoState: React.Dispatch<React.SetStateAction<videoStateProps>>;
  setControlState: React.Dispatch<React.SetStateAction<controlProps>>;
  setVideoInfo: React.Dispatch<React.SetStateAction<videoProps>>;
}

export const initialStateVideoState: videoStateProps = {
  url: undefined,
  paused: false,
  fullscreen: false,
  isBuffering: false,
  isSeeking: false,
  currentTime: 0,
  duration: 0,
  playableDuration: 0,
  seekableDuration: 0,
  videoTracks: [],
  resizeMode: 'none',
  playbackRate: 1,
  quality: 'default',
  selectedVideoTrack: {
    type: SelectedVideoTrackType.AUTO,
    value: 0,
  },
};

export const initialStateControlState: controlProps = {
  showControl: false,
  showSetting: false,
  showResizeSetting: false,
  showQualitySetting: false,
  showPlayBackRateSetting: false,
  showDownloadSheet: false,
  showChats: false,
  initialLoaded: false,
  autoPlayNext: false,
  autoPlayDelay: 0,
};
export const initialStateVideoProps: videoProps = {
  id: undefined,
  episodeId: undefined,
  episodeNum: undefined,
  animeInfo: undefined,
  provider: undefined,
};

const VideoStateContext = createContext<contextType | undefined>(undefined);

export const VideoStateContextProvider: React.FC<childernProp> = ({
  children,
}) => {
  const [videoState, setVideoState] = useState<videoStateProps>(
    initialStateVideoState,
  );
  const [controlState, setControlState] = useState<controlProps>(
    initialStateControlState,
  );
  const [videoInfo, setVideoInfo] = useState<videoProps>(
    initialStateVideoProps,
  );

  return (
    <VideoStateContext.Provider
      value={{
        videoState,
        controlState,
        videoInfo,
        setVideoInfo,
        setVideoState,
        setControlState,
      }}>
      {children}
    </VideoStateContext.Provider>
  );
};

export const useVideoState = () => {
  const context = useContext<contextType | undefined>(VideoStateContext);

  if (!context) {
    throw new Error(
      'useVideoState must be used within a VideoStateContextProvider',
    );
  }

  return context;
};
