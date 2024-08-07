import React from 'react';
import PlayBackRateSetting from './PlayBackRateSetting';
import useVideo from '../../hooks/useVideo';
import SettingCard from './SettingsCard';
import QualitySettings from './QualitySettings';
import AllChats from './AllChats';
import DownloadSheet from './DownloadSheet';
import ResizeModeSetting from './ResizeModeSetting';
import BSheet from '../Custom/BSheet';

interface BsheetProps {
  isLoadingChats: boolean;
  allChats: chatsItems[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  source: SourceQuery;
}
const BSheetHolder: React.FC<BsheetProps> = ({
  isLoadingChats,
  allChats,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
  source,
}) => {
  const {
    controlState,
    settingOp,
    qualitySettingOp,
    playbackRateSettingOp,
    onChangeDownloadSheet,
    onChangeResizeSetting,
    onChangeShowChats,
    videoState,
  } = useVideo();
  return (
    <>
      {/* SettingSheet */}
      <BSheet
        enabled={controlState.showSetting}
        onChange={settingOp}
        fullscreen={videoState.fullscreen}
        maxHeight="70%">
        <SettingCard setShowSettingSheet={settingOp} />
      </BSheet>
      {/* Quality Setting */}
      <BSheet
        enabled={controlState.showQualitySetting}
        onChange={qualitySettingOp}
        fullscreen={videoState.fullscreen}
        maxHeight="70%">
        <QualitySettings />
      </BSheet>

      {/* PlaybackRate Setting */}
      <BSheet
        enabled={controlState.showPlayBackRateSetting}
        onChange={playbackRateSettingOp}
        fullscreen={videoState.fullscreen}
        maxHeight="70%">
        <PlayBackRateSetting />
      </BSheet>

      {/* Chats */}
      <BSheet
        enabled={controlState.showChats}
        onChange={onChangeShowChats}
        fullscreen={videoState.fullscreen}
        maxHeight="70%">
        <AllChats
          isLoading={isLoadingChats}
          list={allChats!}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
        />
      </BSheet>

      {/* Download */}
      <BSheet
        enabled={controlState.showDownloadSheet}
        onChange={onChangeDownloadSheet}
        fullscreen={videoState.fullscreen}
        maxHeight="70%">
        <DownloadSheet source={source} />
      </BSheet>

      {/* Download */}
      <BSheet
        enabled={controlState.showResizeSetting}
        onChange={onChangeResizeSetting}
        fullscreen={videoState.fullscreen}
        maxHeight="70%">
        <ResizeModeSetting />
      </BSheet>
    </>
  );
};

export default BSheetHolder;
