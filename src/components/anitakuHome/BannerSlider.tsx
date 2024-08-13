import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Theme from '../../utils/Theme';
import {useSetting} from '../../context/SettingContext';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {MCIcon} from '../../utils/constant';
import {Toast} from 'toastify-react-native';
import useAnime from '../../hooks/useAnime';
import Skeleton from '../Skeleton';
import {useNavigation} from '../../hooks/useNavigation';
const {width} = Dimensions.get('window');
const color = Theme.DARK;
const font = Theme.FONTS;
const colors = ['transparent', color.DarkBackGround];
interface bigSliderProps {
  isLoading: boolean;
  list: animeInfo[];
  error: any;
  sliderStyle?: ViewStyle;
  title?: String;
  onPressCardParamsLocation?: string;
  onPressCardParams?: any;
}
const BannerSlider: React.FC<bigSliderProps> = ({
  list = [],
  isLoading,
  error,
  sliderStyle,
  title = '',
  onPressCardParamsLocation,
  onPressCardParams,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const {setting} = useSetting();
  const navigation = useNavigation();
  const {memoizedBannerOrPoster, memoizedTitle, keyExtractor, getItemLayout} =
    useAnime();

  const onPressCard = useCallback(
    (item: animeInfo) => {
      if (onPressCardParamsLocation === 'requested-anime') {
        navigation.navigate('RequestedInfo', {
          anime: item,
        });
      } else if (onPressCardParamsLocation === 'trailer') {
        navigation.navigate('TrailerInfo', {
          id: item.id,
        });
      } else {
        navigation.navigate('AnimeInfo', {
          id: item?.animeId || item?.animeID || item?.id,
          ...onPressCardParams,
        });
      }
    },
    [navigation, onPressCardParams, onPressCardParamsLocation],
  );

  const renderItem = useCallback(
    ({item}: {item: animeInfo}) => {
      return (
        <TouchableOpacity
          style={[styles.slider, sliderStyle]}
          activeOpacity={0.8}
          onPress={() => onPressCard(item)}>
          <FastImage
            source={{uri: memoizedBannerOrPoster(item)}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.overlay}>
            <LinearGradient colors={colors} style={styles.linearGradient}>
              <Text numberOfLines={2} style={styles.titleText}>
                {memoizedTitle(item)}
              </Text>
              <View style={styles.infoWrapper}>
                {item?.genres?.map(genre => (
                  <View key={genre} style={styles.infoCard}>
                    <MCIcon
                      name="star-three-points-outline"
                      color={color.White}
                      size={12}
                    />
                    <Text numberOfLines={3} style={styles.descText}>
                      {genre}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      );
    },
    [memoizedBannerOrPoster, memoizedTitle, onPressCard, sliderStyle],
  );

  useEffect(() => {
    // setInterval Bugs sometime in android
    if (currentIndex >= 0 && list?.length > 0) {
      const sid = setTimeout(() => {
        flatListRef?.current?.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
        setCurrentIndex(prev => (prev < list?.length - 1 ? prev + 1 : 0));
      }, setting.sliderIntervalTime || 5000);
      return () => clearTimeout(sid);
    }
  }, [currentIndex, list?.length, setting.sliderIntervalTime]);

  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 5}}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {isLoading && (
        <>
          <Skeleton
            width={width}
            style={{
              aspectRatio: 10 / 5,
              ...sliderStyle,
            }}
          />
        </>
      )}
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={list?.sort((a: animeInfo, b: animeInfo) => a?.index - b?.index)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  slider: {
    aspectRatio: 10 / 5,
    width: width,
    position: 'relative',
  },
  image: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  titleText: {
    fontFamily: font.OpenSansBold,
    color: color.Orange,
    fontSize: 14,
  },
  descText: {
    fontFamily: font.OpenSansRegular,
    color: color.White,
    fontSize: 12,
  },
  linearGradient: {
    paddingBottom: 10,
    gap: 5,
    paddingHorizontal: 5,
  },
  infoWrapper: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
