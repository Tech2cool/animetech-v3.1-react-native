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
const color = Theme.DARK;
const Home: React.FC<HomeScreenProps> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
        <Popular refreshing={refreshing} />
        <SmallImageSlider refreshing={refreshing} />
        <Movies refreshing={refreshing} />
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
    gap: 5,
  },
});
