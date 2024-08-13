import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {HomeScreenProps} from '../../../utils/types';
import BigImageSlider from '../../../components/anitakuHome/BigImageSlider';
import Theme from '../../../utils/Theme';
import RecentRelease from '../../../components/anitakuHome/RecentRelease';
import Popular from '../../../components/anitakuHome/Popular';
import TopAiring from '../../../components/anitakuHome/TopAiring';
import Movies from '../../../components/anitakuHome/Movies';
import SmallImageSlider from '../../../components/anitakuHome/SmallImageSlider';
import Upcoming from '../../../components/anitakuHome/Upcoming';
import HeaderHome from '../../../components/anitakuHome/HeaderHome';
import VersionChecker from '../../../components/VersionChecker';
import {useQuery} from '@tanstack/react-query';
import {fetchHome} from '../../../api/anitaku';
import BannerSlider from '../../../components/anitakuHome/BannerSlider';
import HorizontalSlider from '../../../components/HorizontalSlider';
const color = Theme.DARK;
const Home: React.FC<HomeScreenProps> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const {
    data: gogotaku,
    isLoading: isLoadingGogotaku,
    error: errorGogotaku,
  } = useQuery({
    queryKey: ['gogotaku_home', refreshing],
    queryFn: () => fetchHome(),
  });

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.Red]}
          />
        }>
        <HeaderHome />
        <BigImageSlider refreshing={refreshing} />
        <RecentRelease refreshing={refreshing} />
        <TopAiring refreshing={refreshing} />
        <SmallImageSlider refreshing={refreshing} />
        <Popular refreshing={refreshing} />
        <Movies refreshing={refreshing} />
        <BannerSlider
          title={'Trending'}
          list={gogotaku?.banners}
          isLoading={isLoadingGogotaku}
          error={errorGogotaku}
        />
        <HorizontalSlider
          title={gogotaku?.season_releases?.title}
          list={gogotaku?.season_releases?.list}
          isLoading={isLoadingGogotaku}
          onPressAll="Home"
          onPressCardParams={{type: 2}}
        />
        <HorizontalSlider
          title={'Requested Animes'}
          list={gogotaku?.requested_list}
          isLoading={isLoadingGogotaku}
          onPressAll="Home"
          onPressCardParamsLocation="requested-anime"
        />

        <BannerSlider
          title={'Trailers'}
          list={gogotaku?.trailers}
          isLoading={isLoadingGogotaku}
          error={errorGogotaku}
          onPressCardParamsLocation="trailer"
        />
        <Upcoming refreshing={refreshing} />

        <VersionChecker />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    // gap: 5,
  },
});
