import {
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {RequestedScreenProps} from '../../../utils/types';
import Theme from '../../../utils/Theme';
import {fetchEpisodes} from '../../../api/anitaku';
import {useQuery} from '@tanstack/react-query';
import {Toast} from 'toastify-react-native';
import FastImage from 'react-native-fast-image';
import useAnime from '../../../hooks/useAnime';
import LinearGradient from 'react-native-linear-gradient';
import RandomColorCard from '../../../components/RandomColorCard';
import HeaderInfo from './HeaderInfo';
import {SERVER_BASE_URL} from '../../../utils/constant';
import {useSetting} from '../../../context/SettingContext';
import EpisodesSheet from '../../../components/EpisodesSheet';

const color = Theme.DARK;
const font = Theme.FONTS;
const colors = ['transparent', color.DarkBackGround];
const RequestedInfo: React.FC<RequestedScreenProps> = ({route}) => {
  const {anime} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const {setting} = useSetting();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // queryClient.invalidateQueries({queryKey: ['Episodes']});

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const {memoizedPoster, memoizedTitle} = useAnime();

  const {
    data: episodesInfo,
    isLoading: isLoadingEpisodes,
    error: errorEpisode,
  } = useQuery<episodeQuery>({
    queryKey: ['Episodes', anime?.animeId, refreshing],
    queryFn: () => fetchEpisodes(anime?.animeId),
  });

  const handleShare = useCallback(async () => {
    try {
      const url =
        SERVER_BASE_URL +
        '/share' +
        `?type=anime&id=${anime?.animeId}&provider=${setting.provider}`;
      const title = memoizedTitle(anime);
      const message = memoizedTitle(anime) + '\n' + '\n' + url;

      await Share.share({
        title: title,
        url: url,
        message: message,
      });
    } catch (err: any) {
      Toast.error(err?.message, 'top');
    }
  }, [anime, memoizedTitle, setting.provider]);

  if (errorEpisode) {
    Toast.error(errorEpisode?.message, 'top');
  }

  // return <></>;
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <LoadingInfo isLoading={isLoading} /> */}

        {/* Poster wrapper */}
        <LinearGradient colors={colors} style={styles.linearGradient}>
          <FastImage
            source={{uri: memoizedPoster(anime)}}
            style={styles.poster}
          />
        </LinearGradient>
        {/* Poster wrapper end */}

        {/* card wrapper */}
        <View style={styles.infoWrapper}>
          <Text style={styles.titleText}>{memoizedTitle(anime)}</Text>
          <View style={styles.genreWrapper}>
            {anime?.genres?.map((genre: string) => (
              <RandomColorCard title={genre} key={genre} />
            ))}
            <RandomColorCard title={anime?.type} />
            <RandomColorCard title={anime?.releasedDate || anime?.year || ''} />
            <RandomColorCard title={anime?.status} />
            <RandomColorCard
              title={
                'Total Episodes ' +
                (anime?.totalEpisodes || `${episodesInfo?.episodes?.length}`)
              }
            />
          </View>
          <View style={styles.otherNameWrapper}>
            <RandomColorCard title={anime?.req_status || ''} />
          </View>
          <View style={styles.descWrapper}>
            <RandomColorCard
              title={'Description: ' + (anime?.synopsis || anime?.description)}
            />
          </View>
        </View>
        {/* card wrapper end*/}

        <EpisodesSheet
          id={anime?.animeId}
          anime={anime}
          episodesInfo={episodesInfo!}
          isLoading={isLoadingEpisodes}
        />

        <HeaderInfo handleShare={handleShare} />
      </ScrollView>
    </View>
  );
};

export default RequestedInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    position: 'relative',
  },
  linearGradient: {
    flex: 1,
  },
  poster: {
    aspectRatio: 9 / 13,
  },
  infoWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 5,
  },
  titleText: {
    fontFamily: font.OpenSansBold,
    color: color.Orange,
    fontSize: 14,
  },
  descText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    fontSize: 12,
  },
  genreWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
    rowGap: 8,
    columnGap: 5,
  },
  otherNameWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  descWrapper: {
    paddingHorizontal: 5,
  },
});
