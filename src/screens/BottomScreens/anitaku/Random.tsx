import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {useQuery} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import VerticalCard from '../../../components/VerticalCard';
import {F5Icon} from '../../../utils/constant';
import Theme from '../../../utils/Theme';
import {fetchRandom} from '../../../api/anitaku';
import LoadingImage from '../../../assets/images/gif2.gif';
import useAnime from '../../../hooks/useAnime';
import {RandomScreenProps} from '../../../utils/types';
const color = Theme.DARK;
const font = Theme.FONTS;
const {width} = Dimensions.get('window');
const Random: React.FC<RandomScreenProps> = ({route, navigation}) => {
  const {randomize} = route.params;
  const {keyExtractor} = useAnime();
  const {data, isLoading, error} = useQuery({
    queryKey: ['random', randomize],
    queryFn: () => fetchRandomAndGo(),
  });
  const fetchRandomAndGo = async () => {
    try {
      const resp = await fetchRandom(randomize);
      return resp;
    } catch (err) {
      throw err;
    }
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchRandomAndGo();
  //   }, []),
  // );

  if (error) {
    Alert.alert('error', error?.message);
  }
  const renderItem = useCallback(
    ({item}: {item: animeInfo}) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AnimeInfo', {
              id: item?.animeId || item?.animeID,
            })
          }>
          <VerticalCard
            item={item}
            style={{
              width: width * 0.45,
            }}
          />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <>
          <Text style={styles.generatingText}>Generating Random Anime...</Text>
          <FastImage source={LoadingImage} style={styles.loadingImg} />
        </>
      )}
      {!isLoading && (
        <FlatList
          horizontal={false}
          numColumns={2}
          data={data?.list?.sort(
            (a: animeInfo, b: animeInfo) => a?.index - b?.index,
          )}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Random', {
            randomize: new Date().getTime(),
          })
        }
        style={styles.randamoizeBtn}>
        <F5Icon name="random" color={color.Orange} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Random;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  generatingText: {
    fontSize: 20,
    color: color.White,
    fontFamily: font.OpenSansMedium,
  },
  randamoizeBtn: {
    paddingVertical: 12,
    borderColor: color.Orange,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 999,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 10,
  },
  loadingImg: {
    width: 150,
    height: 150,
  },
  columnWrapper: {
    gap: 10,
    padding: 5,
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
});
