import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import Theme from '../utils/Theme';
import {
  genresList,
  IIcon,
  seasonListItem,
  sortYearItem,
  StatusListItem,
  subDubItem,
  TypeListItem,
} from '../utils/constant';

interface filterProps {
  enabled: boolean;
  appliedFilter: any;
  showAllGenres: boolean;
  showAllYears: boolean;
  toggleFilter: () => void;
  handleApply: () => void;
  handleReset: () => void;
  onPressSort: (value: string | null) => void;
  onPressType: (value: string | null) => void;
  toggleShowAllGenres: () => void;
  toggleShowAllYears: () => void;
  onPressGenre: (value: string) => void;
  onPressSeason: (value: string | null) => void;
  onPressStatus: (value: string | null) => void;
  onPressSubDub: (value: string | null) => void;
  onPressYear: (value: number) => void;
}
const color = Theme.DARK;
const font = Theme.FONTS;
const FilterCard: React.FC<filterProps> = ({
  enabled,
  toggleFilter,
  appliedFilter,
  handleApply,
  handleReset,
  onPressSort,
  onPressType,
  showAllGenres,
  showAllYears,
  toggleShowAllGenres,
  toggleShowAllYears,
  onPressGenre,
  onPressSeason,
  onPressStatus,
  onPressSubDub,
  onPressYear,
}) => {
  const getAllYear = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1999;
    const yearsArray = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    return yearsArray;
  }, []);

  const memozedAllYears = useMemo(() => {
    const years = getAllYear()?.sort((a: number, b: number) => b - a);
    const filteredAllYears = showAllYears ? years : years?.slice(10);
    return filteredAllYears;
  }, [showAllYears, getAllYear]);

  const memozedAllGenres = useMemo(() => {
    const filteredAllYears = showAllGenres ? genresList : genresList?.slice(15);
    return filteredAllYears;
  }, [showAllGenres]);

  return (
    <Modal visible={enabled} transparent>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleFilter}>
              <IIcon
                name="arrow-back-circle-outline"
                size={35}
                color={color.White}
              />
            </TouchableOpacity>
          </View>
          {/* Sort Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={styles.FilterHeading}>Sort</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              {sortYearItem.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressSort(filter.value)}
                  style={
                    appliedFilter.sort === filter.value
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter.name}>
                  <Text style={styles.filterText}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Sort Filter End */}
          {/* Sub DUB Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={styles.FilterHeading}>Sub or Dub</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              {subDubItem.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressSubDub(filter.value)}
                  style={
                    appliedFilter.suborDub === filter.value
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter.name}>
                  <Text style={styles.filterText}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Sub DUB Filter End */}

          {/*Anime Type Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={styles.FilterHeading}>Type</Text>
            <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
              {TypeListItem.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressType(filter.value)}
                  style={
                    appliedFilter.type === filter.value
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter.name}>
                  <Text style={styles.filterText}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/*Anime Type Filter End */}

          {/*Anime Status Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={styles.FilterHeading}>Status</Text>
            <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
              {StatusListItem.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressStatus(filter.value)}
                  style={
                    appliedFilter.status === filter.value
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter.name}>
                  <Text style={styles.filterText}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/*Anime Status Filter End */}

          {/*Anime Season Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={styles.FilterHeading}>Season</Text>
            <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
              {seasonListItem.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressSeason(filter.value)}
                  style={
                    appliedFilter.season === filter.value
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter.name}>
                  <Text style={styles.filterText}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/*Anime Season Filter End */}

          {/*Anime Year Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.FilterHeading}>Year</Text>
              <TouchableOpacity onPress={toggleShowAllYears}>
                <Text style={styles.seeAllText}>
                  {!showAllYears ? 'Show All' : 'Show Less'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
              {memozedAllYears?.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressYear(filter)}
                  style={
                    appliedFilter.year.includes(filter)
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter}>
                  <Text style={styles.filterText}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/*Anime Year Filter End */}

          {/*Genres Filter start */}
          <View style={{gap: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.FilterHeading}>Genres</Text>
              <TouchableOpacity onPress={toggleShowAllGenres}>
                <Text style={styles.seeAllText}>
                  {!showAllGenres ? 'Show All' : 'Show Less'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
              {memozedAllGenres?.map(filter => (
                <TouchableOpacity
                  onPress={() => onPressGenre(filter)}
                  style={
                    appliedFilter?.genre?.includes(filter)
                      ? styles.FilterBtnActive
                      : styles.FilterBtn
                  }
                  key={filter}>
                  <Text style={styles.filterText}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/*Genres Filter End */}
        </ScrollView>
        <View style={styles.filterApplyContainer}>
          <TouchableOpacity style={styles.ResetBtn} onPress={handleReset}>
            <Text style={styles.filterTextAR}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ApplyBtn} onPress={handleApply}>
            <Text style={styles.filterTextAR}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.DarkBackGround,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterApplyContainer: {
    borderColor: color.LighterGray,
    borderWidth: 0.5,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: color.DarkBackGround,
    paddingHorizontal: 10,
    height: 100,
    overflow: 'hidden',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  ResetBtn: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: color.DarkGray,
    width: '50%',
    height: 60,
  },
  ApplyBtn: {
    borderColor: color.LighterGray,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: color.Orange,
    width: '50%',
    height: 60,
  },
  filterTextAR: {
    fontFamily: font.OpenSansBold,
    color: color.White,
    fontSize: 16,
  },

  FilterHeading: {
    fontFamily: font.OpenSansBold,
    color: color.White,
    fontSize: 15,
  },
  FilterBtn: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: color.LighterGray,
    flex: 0,
    alignSelf: 'flex-start',
    borderRadius: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  FilterBtnActive: {
    padding: 10,
    borderWidth: 0.5,
    backgroundColor: color.Orange,
    borderColor: color.LighterGray,
    flex: 0,
    alignSelf: 'flex-start',
    borderRadius: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  filterText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  seeAllText: {
    fontFamily: font.OpenSansBold,
    color: color.Orange,
    fontSize: 14,
  },
});
