import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Theme from '../../utils/Theme';
import useAnime from '../../hooks/useAnime';
import Skeleton from '../Skeleton';

const color = Theme.DARK;
const font = Theme.FONTS;
interface WatchInfoProps {
  anime: animeInfo;
  episodeNum: string | number;
  isLoading: boolean;
}
const WatchInfo: React.FC<WatchInfoProps> = ({
  anime,
  episodeNum,
  isLoading,
}) => {
  const {memoizedTitle, onPressAnime} = useAnime();
  // console.log('watch Info rendered');

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <Skeleton width={'95%'} height={18} opacity={1} />
          <Skeleton width={'80%'} height={18} opacity={1} />
        </View>
      )}
      <TouchableOpacity onPress={()=> onPressAnime(anime)}>
        <View style={styles.infoWrapper}>
          <Text numberOfLines={2} style={styles.animeTitle}>
            {memoizedTitle(anime)}
          </Text>
          <Text style={styles.animeEpisodeNum}>Episode {episodeNum}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(WatchInfo);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: color.Orange,
    paddingVertical: 4,
    // flex: 1,
  },
  loadingWrapper: {
    paddingTop: 10,
    gap: 5,
  },
  infoWrapper: {
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  animeTitle: {
    fontFamily: font.OpenSansBold,
    color: color.Orange,
    fontSize: 13,
  },
  animeEpisodeNum: {
    fontFamily: font.OpenSansBold,
    color: color.White,
    fontSize: 13,
  },
});
