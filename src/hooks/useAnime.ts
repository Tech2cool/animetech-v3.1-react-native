import {useCallback} from 'react';
import {useSetting} from '../context/SettingContext';
import {useNavigation} from './useNavigation';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const useAnime = () => {
  const {setting} = useSetting();
  const navigation = useNavigation();
  const memoizedPoster = useCallback((item: animeInfo) => {
    if (item?.coverImage && item?.coverImage[0].extraLarge) {
      return item?.coverImage[0].extraLarge;
    } else if (item?.coverImage && item?.coverImage[0].large) {
      return item?.coverImage[0].large;
    } else if (item?.animeImg) {
      return item.animeImg;
    }
  }, []);
  const memoizedBannerOrPoster = useCallback((item: animeInfo) => {
    if (item.bannerImage?.url) {
      return item.bannerImage?.url;
    } else if (item?.coverImage && item?.coverImage[0].extraLarge) {
      return item?.coverImage[0].extraLarge;
    } else if (item?.coverImage && item?.coverImage[0].large) {
      return item?.coverImage[0].large;
    } else if (item?.animeImg) {
      return item.animeImg;
    } else if (item?.img) {
      return item.img;
    }
  }, []);

  const memoizedTitle = useCallback(
    (item: animeInfo) => {
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
    },
    [setting.language],
  );
  const onPressAnime = useCallback(
    (item: animeInfo) => {
      navigation.navigate('AnimeInfo', {
        id: item.animeId || item.animeID,
      });
    },
    [navigation],
  );
  const keyExtractor = useCallback(
    (item: animeInfo, index: number) =>
      `${item?.animeID || item?.animeId || item?.id || index}`,
    [],
  );
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [],
  );

  return {
    memoizedPoster,
    memoizedTitle,
    onPressAnime,
    keyExtractor,
    getItemLayout,
    memoizedBannerOrPoster,
  };
};

export default useAnime;
