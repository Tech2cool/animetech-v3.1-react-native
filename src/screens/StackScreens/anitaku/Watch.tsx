import {Linking, ScrollView, Share, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {WatchScreenProps} from '../../../utils/types';
import Theme from '../../../utils/Theme';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import WatchInfo from '../../../components/anitakuWatch/WatchInfo';
import {SERVER_BASE_URL} from '../../../utils/constant';
import useAnime from '../../../hooks/useAnime';
import {useSetting} from '../../../context/SettingContext';
import WatchBtnsCards from '../../../components/anitakuWatch/WatchBtnsCards';
import WatchPrevNextBtns from '../../../components/anitakuWatch/WatchPrevNextBtns';
import EpisodesSheet from '../../../components/EpisodesSheet';
import WatchChats from '../../../components/anitakuWatch/WatchChats';
import BSheetHolder from '../../../components/anitakuWatch/BSheetHolder';
import useApi from '../../../hooks/useApi';
import {Toast} from 'toastify-react-native';
import useVideo from '../../../hooks/useVideo';

const color = Theme.DARK;
const Watch: React.FC<WatchScreenProps> = ({navigation, route}) => {
  const {id, episodeId, episodeNum} = route.params;
  const {memoizedTitle} = useAnime();
  const {setting} = useSetting();
  const {
    dataChats,
    dataSource,
    dataInfo,
    dataReaction,
    episodesInfo,
    isLoadingChats,
    isLoadingEpisodes,
    isLoadingInfo,
    isLoadingReaction,
    isLoadingSource,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useApi({id, episodeId});
  const {onVideoParams, controlState, onChangeShowChats} = useVideo();

  useEffect(() => {
    if (!dataInfo) return;
    onVideoParams(id, episodeId, episodeNum, dataInfo, setting.provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInfo, episodeId, id, episodeNum]);
  const allItems = useMemo(
    () =>
      dataChats?.pages?.flatMap(fkItems => {
        return fkItems?.response ?? [];
      }),
    [dataChats],
  );

  const getDefaultUrl = useCallback(() => {
    const defaultSource = dataSource?.sources.find(
      (source: sourceProps) => source.quality === 'default',
    );
    return defaultSource;
  }, [dataSource]);

  const handleShare = useCallback(async () => {
    try {
      const url =
        SERVER_BASE_URL +
        '/share' +
        `?type=episode&id=${id}&episodeId=${episodeId}&episodeNum=${episodeNum}&provider=${setting.provider}`;
      const title = memoizedTitle(dataInfo);
      const message = title + '\n' + 'Episode ' + episodeNum + '\n' + url;

      await Share.share({
        title: title,
        url: url,
        message: message,
      });
    } catch (err: any) {
      Toast.error(err?.message, 'top');
    }
  }, [episodeId, dataInfo, episodeNum, id, setting.provider, memoizedTitle]);

  const shareToWhatsApp = useCallback(async () => {
    const url =
      SERVER_BASE_URL +
      '/share' +
      `?type=episode&id=${id}&episodeId=${episodeId}&episodeNum=${episodeNum}&provider=${setting.provider}`;
    const imageUrl = dataInfo?.animeImg;

    const message =
      memoizedTitle(dataInfo) +
      '\n' +
      'Episode ' +
      episodeNum +
      '\n' +
      url +
      '\n' +
      imageUrl;

    await Linking.openURL(`whatsapp://send?text=${message}`).catch(err =>
      Toast.error(err?.message, 'top'),
    );
  }, [episodeId, dataInfo, episodeNum, id, setting.provider, memoizedTitle]);

  const shareToTwitter = useCallback(async () => {
    const url =
      SERVER_BASE_URL +
      '/share' +
      `?type=episode&id=${id}&episodeId=${episodeId}&episodeNum=${episodeNum}&provider=${setting.provider}`;
    const imageUrl = dataInfo?.animeImg;

    const message =
      memoizedTitle(dataInfo) +
      '\n' +
      'Episode ' +
      episodeNum +
      '\n' +
      url +
      '\n' +
      imageUrl;
    // const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message,
    )}`;

    // await Linking.openURL(twitterUrl);
    await Linking.openURL(twitterUrl).catch(err =>
      Toast.error(err?.message, 'top'),
    );
  }, [episodeId, dataInfo, episodeNum, id, setting.provider, memoizedTitle]);

  const shareToFacebook = useCallback(async () => {
    const url =
      SERVER_BASE_URL +
      '/share' +
      `?type=episode&id=${id}&episodeId=${episodeId}&episodeNum=${episodeNum}&provider=${setting.provider}`;
    const imageUrl = dataInfo?.animeImg;

    const message =
      memoizedTitle(dataInfo) +
      '\n' +
      'Episode ' +
      episodeNum +
      '\n' +
      url +
      '\n' +
      imageUrl;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}&description=${message}&quote=${encodeURIComponent(message)}`;

    await Linking.openURL(facebookUrl).catch(err =>
      Toast.error(err?.message, 'top'),
    );
  }, [episodeId, dataInfo, episodeNum, id, setting.provider, memoizedTitle]);

  const handleNextBtn = useCallback(() => {
    const findNextEpIndex = episodesInfo?.episodes?.findIndex(
      (ep: episodeInfo) => ep.id === episodeId,
    );
    if (
      findNextEpIndex &&
      findNextEpIndex !== -1 &&
      findNextEpIndex + 1 < episodesInfo?.episodes?.length!
    ) {
      // setVideoState({...videoState, url: undefined});
      const episode = episodesInfo?.episodes[findNextEpIndex + 1];
      navigation.navigate('Watch', {
        id: id,
        episodeId: episode?.id!,
        episodeNum: episode?.episodeNum || episode?.number!,
        provider: 'anitaku',
      });
    }
  }, [episodeId, episodesInfo?.episodes, id, navigation]);

  const handlePrevBtn = useCallback(() => {
    // console.log('called prev');
    const findNextEpIndex = episodesInfo?.episodes?.findIndex(
      (ep: episodeInfo) => ep?.id === episodeId,
    );
    if (findNextEpIndex && findNextEpIndex !== -1 && findNextEpIndex - 1 >= 0) {
      // setVideoState({...videoState, url: undefined});

      const episode = episodesInfo?.episodes[findNextEpIndex - 1];

      navigation.navigate('Watch', {
        id: id,
        episodeId: episode?.id!,
        episodeNum: episode?.episodeNum || episode?.number!,
        provider: 'anitaku',
      });
    }
  }, [episodeId, episodesInfo?.episodes, id, navigation]);

  return (
    <View style={styles.container}>
      <VideoPlayer url={getDefaultUrl()?.url} isLoading={isLoadingSource} />
      <ScrollView>
        <WatchInfo
          anime={dataInfo}
          episodeNum={episodeNum}
          isLoading={isLoadingInfo}
        />
        <WatchPrevNextBtns
          onPressNext={handleNextBtn}
          onPressPrev={handlePrevBtn}
          isLoading={isLoadingEpisodes}
          disablePrevBtn={episodeNum <= 1}
          disableNextBtn={episodeNum >= episodesInfo?.episodes?.length!}
        />
        <WatchBtnsCards
          list={dataReaction?.reactions?.sort(
            (a: reaction, b: reaction) => a?.order - b?.order,
          )}
          shareToFacebook={shareToFacebook}
          shareToTwitter={shareToTwitter}
          shareToWhatsApp={shareToWhatsApp}
          onPressShare={handleShare}
          isLoading={isLoadingReaction}
        />
        <WatchChats
          list={allItems || []}
          source={dataSource!}
          isLoading={isLoadingChats}
          onClick={() => onChangeShowChats(!controlState.showChats)}
        />
        <EpisodesSheet
          episodesInfo={episodesInfo!}
          id={id}
          isLoading={isLoadingEpisodes}
          episodeId={episodeId}
          anime={dataInfo}
        />
      </ScrollView>
      <BSheetHolder
        isLoadingChats={isLoadingChats}
        allChats={allItems!}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        source={dataSource!}
      />
    </View>
  );
};

export default Watch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
  },
});
