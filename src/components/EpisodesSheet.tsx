import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Theme from '../utils/Theme';
import {useNavigation} from '../hooks/useNavigation';
import {useSetting} from '../context/SettingContext';
import {MCIcon} from '../utils/constant';
import Skeleton from './Skeleton';
import {findIndexInPaginatedData} from '../utils/helperFunctions';
const color = Theme.DARK;
const font = Theme.FONTS;
interface EpisodeProps {
  id: string;
  episodeId?: string;
  anime: animeInfo;
  episodesInfo: episodeQuery;
  isLoading: boolean;
}

const EpisodesSheet: React.FC<EpisodeProps> = ({
  id,
  anime,
  episodeId,
  episodesInfo,
  isLoading,
}) => {
  const navigation = useNavigation();
  const {setting} = useSetting();
  const [currentPage, setCurrentPage] = useState({
    index: 0,
    page: 1,
    title: '1-100',
  });

  const navigateVideo = useCallback(
    (item: episodeInfo) => {
      navigation.navigate('Watch', {
        id: id,
        episodeId: item?.id,
        episodeNum: item?.episodeNum || item?.number,
        provider: setting.provider,
      });
    },
    [navigation, id, setting.provider],
  );

  const renderitem = useCallback(
    ({item}: {item: episodeInfo}) => {
      return (
        <TouchableOpacity
          onPress={() => navigateVideo(item)}
          key={item?.id}
          style={[
            styles.epBtn,
            {
              backgroundColor:
                episodeId === item?.id ? color.Orange : undefined,
            },
          ]}>
          <Text style={{fontFamily: font.OpenSansMedium, color: color.White}}>
            {item?.title}
          </Text>
        </TouchableOpacity>
      );
    },
    [episodeId, navigateVideo],
  );

  const onSelectDropDown = useCallback((selectedItem: pageType) => {
    setCurrentPage(selectedItem);
  }, []);
  const buttonTextAfterSelection = useCallback(
    (selectedItem: pageType) => selectedItem?.title,
    [],
  );
  const rowTextForSelection = useCallback((item: pageType) => item?.title, []);
  const renderDropdownIcon = useCallback(
    () => <MCIcon name={'chevron-down'} color={color.Orange} size={25} />,
    [],
  );
  const memoziedList = useMemo(() => {
    if (episodesInfo?.list?.length > 0) {
      return episodesInfo?.list[currentPage?.index || 0];
    }
    return [];
  }, [episodesInfo?.list, currentPage]);
  useEffect(() => {
    if (episodesInfo?.episodes?.length > 0 && episodeId) {
      const {page} = findIndexInPaginatedData(
        episodesInfo?.episodes,
        episodeId,
        100,
      );
      setCurrentPage(episodesInfo?.pages[page - 1]);
    }
  }, [episodeId, episodesInfo]);

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
          <Skeleton
            key={item}
            width={60}
            height={40}
            opacity={1}
            borderRadius={10}
          />
        ))}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.totalEPHeader}>
          <Text style={{fontFamily: font.OpenSansBold, color: color.White}}>
            Total Episodes:
          </Text>

          <View style={styles.headerTotalEpisode}>
            <Text style={{fontFamily: font.OpenSansBold, color: color.White}}>
              {episodesInfo?.episodes?.length || anime?.totalEpisodes || 0}
            </Text>
          </View>
        </View>

        <SelectDropdown
          data={episodesInfo?.pages}
          renderDropdownIcon={renderDropdownIcon}
          buttonStyle={styles.buttonStyle}
          defaultButtonText="..."
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.rowTextStyle}
          rowStyle={styles.rowStyle}
          selectedRowTextStyle={styles.selectedRowTextStyle}
          selectedRowStyle={styles.selectedRowStyle}
          defaultValue={episodesInfo?.pages?.find(
            (pg: pageType) => pg?.page === currentPage?.page,
          )}
          onSelect={onSelectDropDown}
          buttonTextAfterSelection={buttonTextAfterSelection}
          rowTextForSelection={rowTextForSelection}
        />
      </View>
      <View style={styles.episodeWrapper}>
        {memoziedList?.map(item => renderitem({item}))}
        {(episodesInfo?.list?.length <= 0 || episodesInfo?.code === 404) && (
          <Text style={styles.noFoundText}>No Episodes Found</Text>
        )}
      </View>
    </View>
  );
};

export default memo(EpisodesSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    paddingHorizontal: 5,
  },
  rowTextStyle: {
    fontSize: 14,
    color: color.White,
    textTransform: 'uppercase',
  },
  selectedRowTextStyle: {
    fontSize: 14,
    color: color.White,
    textTransform: 'uppercase',
  },
  dropdownStyle: {
    borderRadius: 5,
    backgroundColor: color.DarkBackGround,
    elevation: 10,
    borderColor: color.LighterGray2,
    borderWidth: 0.2,
  },
  buttonTextStyle: {
    color: color.Orange,
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: font.OpenSansBold,
    textAlign: 'right',
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: color.DarkBackGround,
  },
  rowStyle: {
    borderColor: 'transparent',
  },
  selectedRowStyle: {
    backgroundColor: color.Orange,
  },
  epBtn: {
    padding: 8,
    borderColor: color.Orange,
    borderWidth: 1,
    borderRadius: 5,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingHorizontal: 5,
    borderColor: color.LighterGray,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTotalEpisode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalEPHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  loadingWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 7,
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderColor: color.LighterGray,
    borderWidth: 0.5,
    paddingVertical: 5,
  },
  episodeWrapper: {
    flexDirection: 'row',
    gap: 7,
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderColor: color.LighterGray,
    borderWidth: 0.5,
    paddingVertical: 5,
    flex: 1,
  },
  noFoundText: {
    fontFamily: font.OpenSansBold,
    fontSize: 14,
    color: color.Red,
    textAlign: 'center',
  },
});
