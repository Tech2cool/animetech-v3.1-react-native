import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import useAnime from '../hooks/useAnime';
import VerticalCard from './VerticalCard';
import Theme from '../utils/Theme';
import {useNavigation} from '../hooks/useNavigation';
import {useSetting} from '../context/SettingContext';
import Skeleton from './Skeleton';

interface HorizProps {
  list: animeInfo[];
  title: string;
  isVideo?: boolean;
  isLoading?: boolean;
  onPressAll: string;
  onPressAllParams?: any;
}
const color = Theme.DARK;
const font = Theme.FONTS;
const HorizontalSlider: React.FC<HorizProps> = ({
  title,
  list,
  isVideo = false,
  isLoading,
  onPressAll,
  onPressAllParams,
}) => {
  const {keyExtractor} = useAnime();
  const {setting} = useSetting();
  const navigation = useNavigation();
  const onPressCard = useCallback(
    (item: animeInfo) => {
      isVideo
        ? navigation.navigate('Watch', {
            id: item.animeId,
            episodeId: item.episodeId,
            episodeNum: item.episodeNum,
            provider: setting.provider,
          })
        : navigation.navigate('AnimeInfo', {
            id: item.animeId,
          });
    },
    [isVideo, navigation, setting.provider],
  );

  const renderItem = useCallback(
    ({item}: {item: animeInfo}) => {
      return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onPressCard(item)}>
          <VerticalCard item={item} />
        </TouchableOpacity>
      );
    },
    [onPressCard],
  );
  const ListEmptyComponent = useCallback(() => {
    if (isLoading) return <></>;
    return <Text style={styles.noFoundText}>No Anime Found</Text>;
  }, [isLoading]);

  const onPressSeeAll = () => {
    navigation.navigate(onPressAll, {...onPressAllParams});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={styles.titleSeeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <Skeleton key={item} width={145} height={210} />
          ))}
        </View>
      )}
      <FlatList
        horizontal={true}
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: color.White,
    fontFamily: font.OpenSansBold,
  },
  titleSeeAll: {
    color: color.Orange,
    fontFamily: font.OpenSansBold,
  },
  contentContainerStyle: {
    gap: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  noFoundText: {
    color: color.Red,
    fontFamily: font.OpenSansBold,
    textAlign: 'center',
  },
});
