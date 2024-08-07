/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {memo, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import Theme from '../utils/Theme';
import {useSetting} from '../context/SettingContext';
const color = Theme.DARK;
const font = Theme.FONTS;

interface verCardProps {
  item: animeInfo;
  style?: ViewStyle;
  overlayStyle?: ViewStyle;
  moreheight?: boolean;
  showEpisode?: boolean;
}

const VerticalCard: React.FC<verCardProps> = ({
  item,
  style,
  overlayStyle,
  moreheight = false,
  showEpisode = false,
}) => {
  const {setting} = useSetting();

  const memoizedPoster = useMemo(() => {
    if (
      item?.coverImage &&
      item?.coverImage?.length > 0 &&
      item?.coverImage[0]?.extraLarge
    ) {
      return item?.coverImage[0]?.extraLarge;
    } else if (
      item?.coverImage &&
      item?.coverImage?.length > 0 &&
      item?.coverImage[0]?.large
    ) {
      return item?.coverImage[0]?.large;
    } else if (item?.animeImg) {
      return item?.animeImg;
    }
  }, [item?.animeImg, item?.coverImage]);

  const memoizedTitle = useMemo(() => {
    if (setting.language === 'en') {
      if (item?.animeTitle?.english) {
        return item?.animeTitle?.english;
      } else if (item?.title?.english) {
        return item?.title?.english;
      } else if (item?.animeTitle?.english_jp) {
        return item?.animeTitle?.english_jp;
      }
    } else {
      if (item?.animeTitle?.english_jp) {
        return item?.animeTitle?.english_jp;
      } else if (item?.title?.english_jp) {
        return item?.title?.english_jp;
      } else if (item?.animeTitle?.english) {
        return item?.animeTitle?.english;
      }
    }
  }, [
    item?.animeTitle?.english,
    item?.animeTitle?.english_jp,
    setting.language,
    item?.title?.english,
    item?.title?.english_jp,
  ]);

  const memoizedEpisodeNum = useMemo(() => {
    if (showEpisode || item?.episodeNum) {
      if (item?.episodeNum) {
        return (
          <Text numberOfLines={1} style={styles.episodeText}>
            Episode {item?.episodeNum}
          </Text>
        );
      } else if (item?.number) {
        return (
          <Text numberOfLines={1} style={styles.episodeText}>
            Episode {item?.number}
          </Text>
        );
      } else if (item?.episodes?.sub) {
        return (
          <Text numberOfLines={1} style={styles.episodeText}>
            Episode {item?.episodes?.sub}
          </Text>
        );
      } else if (item?.episodes?.dub) {
        return (
          <Text numberOfLines={1} style={styles.episodeText}>
            Episode {item?.episodes?.dub}
          </Text>
        );
      }
    }
  }, [
    item?.episodeNum,
    item?.number,
    item?.episodes?.sub,
    item?.episodes?.dub,
    showEpisode,
  ]);

  const memoizedYear = useMemo(() => {
    if (item?.year) {
      return (
        <Text numberOfLines={1} style={styles.episodeText}>
          Released: {item?.year}
        </Text>
      );
    } else if (item?.releasedDate) {
      return (
        <Text numberOfLines={1} style={styles.episodeText}>
          Released: {item?.releasedDate}
        </Text>
      );
    } else if (item?.released) {
      return (
        <Text numberOfLines={1} style={styles.episodeText}>
          Released: {item?.released}
        </Text>
      );
    }
  }, [item?.year, item?.releasedDate, item?.released]);

  const memoizedDub = useMemo(() => {
    if (item?.isDub === true) {
      return <Text style={[styles.cardText, styles.dubText]}>Dub</Text>;
    } else if (item?.isDub === false) {
      return <Text style={[styles.cardText, styles.dubText]}>Sub</Text>;
    }
  }, [item?.isDub]);

  const memoizedStatus = useMemo(() => {
    if (item?.status === 'RELEASING') {
      return (
        <Text style={[styles.episodeText, {textTransform: 'capitalize'}]}>
          Status: Ongoing
        </Text>
      );
    } else if (item?.status) {
      return (
        <Text style={[styles.episodeText, {textTransform: 'capitalize'}]}>
          Status: {item?.status}
        </Text>
      );
    }
  }, [item?.status]);

  const memoizedWaitingStatus = useMemo(() => {
    if (item?.req_status) {
      return (
        <Text numberOfLines={1} style={styles.cardText}>
          {item?.req_status}
        </Text>
      );
    }
  }, [item?.req_status]);

  const memoizedType = useMemo(() => {
    if (item?.type) {
      return (
        <Text
          numberOfLines={1}
          style={[
            styles.cardText,
            {
              borderColor: color.Orange,
              color: color.Orange,
              paddingHorizontal: 10,
            },
          ]}>
          {item?.type}
        </Text>
      );
    }
  }, [item?.type]);

  const memoizedRating = useMemo(() => {
    if (item?.rating) {
      return (
        <Text
          numberOfLines={1}
          style={[
            styles.cardText,
            {
              borderColor: color.Red,
              color: color.Red,
            },
          ]}>
          {item?.rating}
        </Text>
      );
    }
  }, [item?.rating]);

  const memoizedRank = useMemo(() => {
    if (item?.rank) {
      return (
        <Text
          numberOfLines={1}
          style={[
            styles.cardText,
            {
              borderColor: color.Red,
              color: color.Red,
            },
          ]}>
          #{item?.rank}
        </Text>
      );
    }
  }, [item?.rank]);

  return (
    <View style={[styles.container, {...style}]}>
      <FastImage source={{uri: memoizedPoster}} style={{flex: 1}} />
      <View
        style={[
          styles.overlay,
          {height: moreheight ? '40%' : '30%', ...overlayStyle},
        ]}>
        <Text numberOfLines={moreheight ? 3 : 2} style={styles.titleText}>
          {memoizedTitle}
        </Text>
        {memoizedEpisodeNum}
        {memoizedYear}
        {memoizedStatus}
      </View>
      <View style={styles.cardWrapper}>
        <View style={item?.rating ? styles.rating : styles.none}>
          {memoizedRating}
        </View>

        <View style={item?.isDub !== undefined ? styles.rating : styles.none}>
          {memoizedDub}
        </View>

        <View style={item?.type ? styles.rating : styles.none}>
          {memoizedType}
        </View>

        <View style={item?.req_status ? styles.rating : styles.none}>
          {memoizedWaitingStatus}
        </View>

        <View style={item?.rank ? styles.rating : styles.none}>
          {memoizedRank}
        </View>
      </View>
    </View>
  );
};

export default memo(VerticalCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 145,
    height: 210,
    position: 'relative',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: color.LighterGray,
    borderWidth: 0.4,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 2,
  },
  titleText: {
    fontFamily: font.OpenSansMedium,
    fontSize: 13,
    color: color.White,
    textAlign: 'center',
  },
  episodeText: {
    fontFamily: font.OpenSansBold,
    fontSize: 13,
    color: color.Orange,
    textAlign: 'center',
  },
  cardText: {
    borderColor: color.Yellow,
    borderWidth: 1,
    fontFamily: font.OpenSansMedium,
    fontSize: 12,
    flex: 0,
    borderRadius: 10,
    padding: 5,
    color: color.Yellow,
    textAlign: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    top: 2,
    right: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    paddingHorizontal: 4,
  },
  rating: {
    borderColor: color.Orange,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  none: {
    display: 'none',
  },
  dubText: {
    borderColor: color.Orange,
    color: color.Orange,
    paddingHorizontal: 10,
  },
});
