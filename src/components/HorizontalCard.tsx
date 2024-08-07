import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import Theme from '../utils/Theme';
import {useSetting} from '../context/SettingContext';
import useAnime from '../hooks/useAnime';

const color = Theme.DARK;
const font = Theme.FONTS;
interface customProps extends animeInfo {
  episodeIdGogo?: string;
  episodeIdAniwatch?: string;
  episodeIdAnilist?: string;
  english?: string;
  english_jp?: string;
  currentTime?: number;
  duration?: number;
}
interface extraItem {
  item: customProps;
}
const HorizontalCard: React.FC<extraItem> = ({item}) => {
  const {setting} = useSetting();
  const {memoizedPoster} = useAnime();

  const memoizedTitle = useMemo(() => {
    if (setting.language === 'en') {
      if (item?.english) {
        return item?.english;
      } else if (item?.english_jp) {
        return item?.english_jp;
      }
    } else {
      if (item?.english_jp) {
        return item?.english_jp;
      } else if (item?.english) {
        return item?.english;
      }
    }
  }, [item?.english, item?.english_jp, setting.language]);

  const memoizedEpisodeNum = useMemo(() => {
    if (item?.episodeNum) {
      return 'Episode ' + item?.episodeNum;
    } else if (item?.number) {
      return 'Episode ' + item?.number;
    }
  }, [item?.episodeNum, item?.number]);

  const memoizedGogoId = useMemo(() => {
    if (item?.episodeIdGogo) {
      return (
        <Text numberOfLines={1} style={styles.cardText}>
          Anitaku
        </Text>
      );
    }
  }, [item?.episodeIdGogo]);

  const memoizedAniwatchId = useMemo(() => {
    if (item?.episodeIdAniwatch) {
      return (
        <Text numberOfLines={1} style={styles.cardText}>
          Aniwatch
        </Text>
      );
    }
  }, [item?.episodeIdAniwatch]);

  const memoizedAnilistId = useMemo(() => {
    if (item?.episodeIdAnilist) {
      return (
        <Text numberOfLines={1} style={styles.cardText}>
          AniList
        </Text>
      );
    }
  }, [item?.episodeIdAnilist]);

  const memoizedWatchTime = useMemo(() => {
    if (!item?.currentTime || !item?.duration) return 'Watched(0%)';
    let currentTime = item?.currentTime;
    let duration = item?.duration;
    if (typeof item?.currentTime === 'string') {
      currentTime = parseInt(item?.currentTime);
    }
    if (typeof item?.duration === 'string') {
      duration = parseInt(item?.duration);
    }

    const time = Math.floor((currentTime / duration) * 100);

    if (
      isNaN(item?.currentTime) ||
      isNaN(item?.duration) ||
      isNaN(time) ||
      !isFinite(time)
    ) {
      return 'Watched(0%)';
    }

    return `Watched(${time}%)`;
  }, [item?.currentTime, item?.duration]);
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
        marginVertical: 5,
        borderColor: color.LighterGray,
        borderWidth: 0.5,
        borderRadius: 5,
      }}>
      <View style={{width: 120, height: 110}}>
        <FastImage
          source={{uri: memoizedPoster(item)}}
          style={{flex: 1}}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', gap: 10, paddingVertical: 5}}>
          {memoizedGogoId}
          {memoizedAniwatchId}
          {memoizedAnilistId}
        </View>
        <Text numberOfLines={2} style={styles.titleText}>
          {memoizedTitle}
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text numberOfLines={1} style={styles.episodeText}>
            {memoizedEpisodeNum}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.episodeText, {color: color.AccentGreen}]}>
            {memoizedWatchTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    fontSize: 13,
  },
  episodeText: {
    fontFamily: font.OpenSansMedium,
    color: color.Orange,
    fontSize: 13,
  },
  cardText: {
    borderColor: color.Orange,
    borderWidth: 1,
    fontFamily: font.OpenSansMedium,
    fontSize: 12,
    flex: 0,
    borderRadius: 10,
    padding: 5,
    color: color.Orange,
  },
});
