import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {UpcomingScreenProps} from '../../../utils/types';
import Theme from '../../../utils/Theme';
import useAnime from '../../../hooks/useAnime';
import VerticalCard from '../../../components/VerticalCard';
import Pagination from '../../../components/Pagination';
import {fetchUpcoming} from '../../../api/anitaku';
import {Toast} from 'toastify-react-native';
import {useQuery} from '@tanstack/react-query';

const color = Theme.DARK;
const font = Theme.FONTS;
interface TagType {
  id: string | undefined | null;
  title: string | undefined | null;
}
const Upcoming: React.FC<UpcomingScreenProps> = ({route, navigation}) => {
  const {type, routeName} = route.params;
  navigation.setOptions({
    headerTitle: routeName ? routeName : 'Upcoming Animes',
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const memozedTypo = useMemo(() => {
    if (type === 'tv-series') {
      return 'tv_series';
    } else if (type === 'special') {
      return 'special';
    } else if (type === 'ova') {
      return 'ova';
    } else if (type === 'ona') {
      return 'ona';
    } else if (type === 'movie') {
      return 'movies';
    }
  }, [type]);
  const {keyExtractor, onPressAnime} = useAnime();
  const [page, setPage] = useState(1);
  const {data, isLoading, error} = useQuery({
    queryKey: ['Upcoming', page, type, refreshing],
    queryFn: () => fetchUpcoming({page, type}),
  });

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
  const ListFooterComponent = useCallback(() => {
    return <Pagination pages={data?.pages} onPressPage={onChangePage} />;
  }, [data]);
  // console.log(list);
  useEffect(() => {
    const setHeader = () => {
      navigation.setOptions({
        headerTitle: routeName ? routeName : 'Upcoming Animes',
      });
    };

    if (routeName) {
      setHeader();
    }
  }, [routeName]);
  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        {isLoading && <ActivityIndicator color={color.Red} size={25} />}
        <FlatList
          numColumns={2}
          data={data?.[memozedTypo!]?.sort(
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

export default Upcoming;

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
