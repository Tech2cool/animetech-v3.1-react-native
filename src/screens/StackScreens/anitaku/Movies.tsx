import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {MoviesScreenProps} from '../../../utils/types';
import Theme from '../../../utils/Theme';
import useAnime from '../../../hooks/useAnime';
import VerticalCard from '../../../components/VerticalCard';
import Pagination from '../../../components/Pagination';
import {fetchMovies} from '../../../api/anitaku';
import {Toast} from 'toastify-react-native';
import {useQuery} from '@tanstack/react-query';
import {MoviesListItem} from '../../../utils/constant';

const color = Theme.DARK;
const font = Theme.FONTS;
interface alphabetType {
  name: string;
  value: undefined | string | null;
}
const Movies: React.FC<MoviesScreenProps> = () => {
  const {keyExtractor, onPressAnime} = useAnime();
  const [page, setPage] = useState(1);
  const [alphabet, setAlphabet] = useState<alphabetType>({
    name: 'All',
    value: undefined,
  });
  const [refreshing, setRefreshing] = useState(false);
  const {data, isLoading, error} = useQuery({
    queryKey: ['MovieRelease', page, refreshing],
    queryFn: () => fetchMovies({page, alphabet: alphabet.value}),
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const renderItem = useCallback(
    ({item}: {item: animeInfo}) => {
      return (
        <TouchableOpacity onPress={() => onPressAnime(item)}>
          <VerticalCard
            item={item}
            moreheight={true}
            style={{width: 160, height: 220}}
          />
        </TouchableOpacity>
      );
    },
    [onPressAnime],
  );

  const onChangePage = (page: number) => {
    setPage(page);
  };
  const onChangeAlphabet = (prop: alphabetType) => {
    if (alphabet.name === prop.name) {
      setAlphabet({
        name: 'All',
        value: undefined,
      });
    }
    setAlphabet(prop);
    if (page !== 1) {
      setPage(1);
    }
  };

  const ListFooterComponent = useCallback(() => {
    return <Pagination pages={data?.pages} onPressPage={onChangePage} />;
  }, [data]);
  // console.log(list);
  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <View style={styles.filterWrapper}>
          <Text style={styles.filterTextHeading}>Filter: </Text>
          <ScrollView horizontal>
            {alphabet && (
              <TouchableOpacity
                style={styles.filterBtnActive}
                onPress={() => onChangeAlphabet(alphabet)}>
                <Text style={styles.filterText}>{alphabet.name}</Text>
              </TouchableOpacity>
            )}

            {MoviesListItem.map((item: alphabetType) => (
              <TouchableOpacity
                key={item.name}
                style={
                  alphabet.name === item.name ? styles.none : styles.filterBtn
                }
                onPress={() => onChangeAlphabet(item)}>
                <Text style={styles.filterText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {isLoading && <ActivityIndicator color={color.Red} size={25} />}
        <FlatList
          numColumns={2}
          data={data?.list?.sort(
            (a: animeInfo, b: animeInfo) => a?.index - b?.index,
          )}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          columnWrapperStyle={{gap: 15}}
          contentContainerStyle={{gap: 10, alignItems: 'center'}}
          ListFooterComponent={ListFooterComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.Red]}
            />
          }
        />
      </View>
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    paddingHorizontal: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color.LighterGray,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 20,
    flex: 2,
    gap: 2,
  },
  input: {
    color: color.White,
    flex: 1,
  },
  option: {
    backgroundColor: color.DarkBackGround,
    borderRadius: 50,
    padding: 5,
  },
  listWrapper: {
    flex: 1,
    padding: 5,
  },
  filterWrapper: {
    flexDirection: 'row',
    // gap: 10,
    paddingVertical: 10,
  },
  filterBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.Orange,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    minWidth: 40,
  },
  none: {
    display: 'none',
    opacity: 0,
  },
  filterBtnActive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.Orange,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    minWidth: 40,
    backgroundColor: color.Orange,
  },

  filterText: {
    color: color.White,
  },
  filterTextHeading: {
    color: color.White,
    fontFamily: font.OpenSansBold,
    alignSelf: 'center',
  },
});
