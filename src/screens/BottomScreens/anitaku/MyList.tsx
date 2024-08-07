import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import Theme from '../../../utils/Theme';
import {MyListScreenProps} from '../../../utils/types';
import {deleteTable, getManyItems} from '../../../api/sqlLite';
import {IIcon} from '../../../utils/constant';
import ImportExportModule from '../../../components/ImportExportModule';
import HorizontalCard from '../../../components/HorizontalCard';
const color = Theme.DARK;
const font = Theme.FONTS;
interface customProps extends animeInfo {
  episodeIdGogo?: string;
  episodeIdAniwatch?: string;
  episodeIdAnilist?: string;
  english?: string;
  english_jp?: string;
  currentTime?: number;
  duration?: number;
  provider?: string;
}

const MyList: React.FC<MyListScreenProps> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [list, setList] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const {data, error, isLoading} = useQuery({
    queryKey: ['sqlLite_animeList', refreshing],
    queryFn: () => SQLLiteQuery(),
  });

  const SQLLiteQuery = async () => {
    try {
      const items = await getManyItems();
      // console.log(items)
      return items;
    } catch (err: any) {
      throw err;
    }
  };
  const SQLLiteQueryDelte = async () => {
    try {
      const items = await deleteTable();
      return items;
    } catch (err: any) {
      Alert.alert('error', err?.message);
    }
  };

  const gotoVideo = (item: customProps) => {
    navigation.navigate('Watch', {
      id: item.id,
      episodeId: item.episodeIdGogo!,
      episodeNum: item.episodeNum,
      provider: item.provider!,
    });
  };
  if (error) {
    Alert.alert('error', error?.message);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={SQLLiteQueryDelte}>
          <Text style={styles.textDelete}>Delete List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal(!modal)}>
          <IIcon name="options-outline" size={32} color={color.White} />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <ActivityIndicator
          color={'red'}
          size={30}
          style={{alignSelf: 'center'}}
        />
      )}
      <View style={{flex: 1, paddingBottom: 30}}>
        {data
          ?.sort((a, b) => b?.timestamp - a?.timestamp)
          ?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => gotoVideo(item)}
              activeOpacity={0.8}>
              <HorizontalCard item={item} />
            </TouchableOpacity>
          ))}
      </View>
      <ImportExportModule
        modal={modal}
        setModal={setModal}
        list={list}
        setList={setList}
        onRefresh={onRefresh}
      />
    </ScrollView>
  );
};

export default MyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Black,
    gap: 10,
    padding: 10,
  },
  textDelete: {
    fontFamily: font.OpenSansBold,
    color: color.Red,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
