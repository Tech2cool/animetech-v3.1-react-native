import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Theme from '../../../utils/Theme';

import RandomColorCard from '../../../components/RandomColorCard';
import {useQuery} from '@tanstack/react-query';
import YoutubePlayer from 'react-native-youtube-iframe';
import {TrailerScreenProps} from '../../../utils/types';
import {fetchTrailerInfo} from '../../../api/anitaku';
import {Toast} from 'toastify-react-native';

const color = Theme.DARK;
const font = Theme.FONTS;
const {width} = Dimensions.get('window');
const TrailerInfo: React.FC<TrailerScreenProps> = ({route}) => {
  const {id} = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);
  const {
    data: anime,
    isLoading: isLoading,
    error: error,
  } = useQuery({
    queryKey: ['Info', id, refreshing],
    queryFn: () => fetchTrailerInfo(id),
  });

  const [playing, setPlaying] = useState(false);
  const iFrameId = anime?.iframe_link?.split('embed/')[1]?.split('?')[0];
  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flex: 1, paddingBottom: 10}}>
        <YoutubePlayer
          width={width}
          height={width / (16 / 9)}
          play={playing}
          videoId={iFrameId}
          onChangeState={onStateChange}
        />
        <View style={{flex: 1, paddingHorizontal: 4}}>
          <Text style={styles.titleText}>{anime?.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 5,
              paddingVertical: 5,
            }}>
            <RandomColorCard title={anime?.req_status} />
            <RandomColorCard title={anime?.status} />

            {anime?.genres?.length > 0 &&
              anime?.genres?.map(genre => (
                <RandomColorCard title={genre} key={genre} />
              ))}
            {anime?.genre && <RandomColorCard title={anime?.genre} />}
            <RandomColorCard title={anime?.type} />
            <RandomColorCard title={anime?.releasedDate} />
            <RandomColorCard title={anime?.released} />
            {anime?.totalEpisodes && (
              <RandomColorCard
                title={'Total Episodes ' + anime?.totalEpisodes}
              />
            )}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 5,
              paddingVertical: 5,
            }}>
            {anime?.otherNames?.length > 0 && (
              <RandomColorCard
                title={
                  'OtherNames: ' +
                  anime?.otherNames?.join()?.replaceAll(',', ', ')
                }
              />
            )}
          </View>
          <View style={{paddingHorizontal: 2, gap: 10}}>
            <RandomColorCard title={anime?.desc_short} />
            {anime?.summary.map((item, i) => (
              <Text
                key={i}
                style={{
                  fontFamily: font.OpenSansMedium,
                  color: color.White,
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                {item}
              </Text>
            ))}
            {/* <RandomColorCard title={anime?.summary} /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TrailerInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  epBtn: {
    padding: 10,
    marginVertical: 4,
    borderColor: color.Orange,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    fontSize: 12,
  },
});
