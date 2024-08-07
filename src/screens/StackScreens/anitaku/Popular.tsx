import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {PopularScreenProps} from '../../../utils/types';
import Theme from '../../../utils/Theme';
import useAnime from '../../../hooks/useAnime';
import VerticalCard from '../../../components/VerticalCard';
import Pagination from '../../../components/Pagination';
import {fetchPopular} from '../../../api/anitaku';
import {Toast} from 'toastify-react-native';
import {useQuery} from '@tanstack/react-query';

const color = Theme.DARK;
const Popular: React.FC<PopularScreenProps> = () => {
  const {keyExtractor, onPressAnime} = useAnime();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const {data, isLoading, error} = useQuery({
    queryKey: ['Popular', page, refreshing],
    queryFn: () => fetchPopular(page),
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
  if (error) {
    Toast.error(error?.message, 'top');
  }
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
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

export default Popular;

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
});
