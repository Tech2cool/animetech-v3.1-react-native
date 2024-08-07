import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SearchScreenProps} from '../../../utils/types';
import Theme from '../../../utils/Theme';
import {IIcon} from '../../../utils/constant';
import useSearch from '../../../hooks/useSearch';
import useAnime from '../../../hooks/useAnime';
import VerticalCard from '../../../components/VerticalCard';
import Pagination from '../../../components/Pagination';
import FilterCard from '../../../components/FilterCard';

const color = Theme.DARK;
const font = Theme.FONTS;
const {width} = Dimensions.get('window');
const Search: React.FC<SearchScreenProps> = () => {
  const [search, setSearch] = useState<string>('');
  const {
    data,
    list,
    isLoading,
    onChangePage,
    showFilters,
    toggleFilter,
    appliedFilter,
    showAllGenres,
    showAllYears,
    handleApply,
    handleReset,
    toggleShowAllGenres,
    toggleShowAllYears,
    onPressSort,
    onPressType,
    onPressGenre,
    onPressSeason,
    onPressStatus,
    onPressSubDub,
    onPressYear,
  } = useSearch(search);
  const {keyExtractor, onPressAnime} = useAnime();

  const onChangeText = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: animeInfo}) => {
      return (
        <TouchableOpacity onPress={() => onPressAnime(item)}>
          <VerticalCard
            item={item}
            moreheight={true}
            style={{width: width * 0.45, height: 220}}
          />
        </TouchableOpacity>
      );
    },
    [onPressAnime],
  );

  const ListFooterComponent = useCallback(() => {
    return <Pagination pages={data?.pages!} onPressPage={onChangePage} />;
  }, [data, onChangePage]);
  // console.log(list);
  const ListEmptyComponent = useCallback(() => {
    return (
      <View>
        <Text style={styles.emptyText}>
          Search eg. one piece, solo leveling
        </Text>
      </View>
    );
  }, []);

  const ListHeaderComponent = useCallback(() => {
    if (
      appliedFilter.sort ||
      appliedFilter.season ||
      appliedFilter.suborDub ||
      appliedFilter.status ||
      appliedFilter.type ||
      appliedFilter.year.length > 0 ||
      appliedFilter.genre.length > 0
    ) {
      return (
        <View style={styles.appliedFilterContainer}>
          <ScrollView horizontal>
            <View style={styles.filterTitleWrapper}>
              <Text style={styles.applyFilterText}>Filters:</Text>
            </View>
            {appliedFilter.sort && (
              <TouchableOpacity style={styles.applyFilterBtn}>
                <Text style={styles.applyFilterText}>{appliedFilter.sort}</Text>
              </TouchableOpacity>
            )}
            {appliedFilter.suborDub && (
              <TouchableOpacity style={styles.applyFilterBtn}>
                <Text style={styles.applyFilterText}>
                  {appliedFilter.suborDub}
                </Text>
              </TouchableOpacity>
            )}
            {appliedFilter.status && (
              <TouchableOpacity style={styles.applyFilterBtn}>
                <Text style={styles.applyFilterText}>
                  {appliedFilter.status}
                </Text>
              </TouchableOpacity>
            )}
            {appliedFilter.type && (
              <TouchableOpacity style={styles.applyFilterBtn}>
                <Text style={styles.applyFilterText}>{appliedFilter.type}</Text>
              </TouchableOpacity>
            )}
            {appliedFilter.season && (
              <TouchableOpacity style={styles.applyFilterBtn}>
                <Text style={styles.applyFilterText}>
                  {appliedFilter.season}
                </Text>
              </TouchableOpacity>
            )}
            {appliedFilter.genre.length > 0 &&
              appliedFilter.genre.map(genre => (
                <TouchableOpacity key={genre} style={styles.applyFilterBtn}>
                  <Text style={styles.applyFilterText}>{genre}</Text>
                </TouchableOpacity>
              ))}
            {appliedFilter.year.length > 0 &&
              appliedFilter.year.map(year => (
                <TouchableOpacity key={year} style={styles.applyFilterBtn}>
                  <Text style={styles.applyFilterText}>{year}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      );
    }
    return <></>;
  }, [
    appliedFilter.sort,
    appliedFilter.suborDub,
    appliedFilter.status,
    appliedFilter.type,
    appliedFilter.season,
    appliedFilter.genre,
    appliedFilter.year,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <View style={styles.inputWrapper}>
          <IIcon name="search" size={22} color={color.White} />
          <TextInput
            value={search}
            onChangeText={onChangeText}
            style={styles.input}
            placeholder="eg. one piece"
          />
        </View>
        <TouchableOpacity style={styles.option} onPress={toggleFilter}>
          <IIcon name="options-outline" size={30} color={color.Orange} />
        </TouchableOpacity>
      </View>
      <View style={styles.listWrapper}>
        {isLoading && <ActivityIndicator color={color.Red} size={25} />}
        <FlatList
          numColumns={2}
          data={list}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          columnWrapperStyle={{gap: 8}}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{gap: 8, alignItems: 'center'}}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      <FilterCard
        enabled={showFilters}
        toggleFilter={toggleFilter}
        appliedFilter={appliedFilter}
        showAllGenres={showAllGenres}
        showAllYears={showAllYears}
        toggleShowAllGenres={toggleShowAllGenres}
        toggleShowAllYears={toggleShowAllYears}
        onPressSort={onPressSort}
        onPressType={onPressType}
        onPressGenre={onPressGenre}
        onPressSeason={onPressSeason}
        onPressStatus={onPressStatus}
        onPressSubDub={onPressSubDub}
        onPressYear={onPressYear}
        handleApply={handleApply}
        handleReset={handleReset}
      />
    </View>
  );
};

export default Search;

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
  appliedFilterContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  applyFilterBtn: {
    backgroundColor: color.Orange,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginHorizontal: 5,
  },
  applyFilterText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
  },
  filterTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  emptyText: {
    color: color.LightGray,
  },
});
