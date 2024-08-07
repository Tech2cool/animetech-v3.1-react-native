import React, {memo, useCallback} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import Theme from '../.././utils/Theme';
import ChatCard from './ChatCard';
import {FlatList} from 'react-native-gesture-handler';

const color = Theme.DARK;
interface AllChats {
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  list: any[];
  fetchNextPage: () => void;
}
const AllChats: React.FC<AllChats> = ({
  isLoading = false,
  isFetchingNextPage,
  isFetching,
  list,
  fetchNextPage,
}) => {
  const renderItem = useCallback(({item}: {item: chatsItems}) => {
    return <ChatCard item={item} />;
  }, []);

  const onEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const ListFooterComponent = useCallback(() => {
    return (
      <View>
        {isLoading || isFetchingNextPage || isFetching ? (
          <ActivityIndicator size={30} color={color.Red} />
        ) : (
          <Text style={{textAlign: 'center'}}>
            {`\u2022 \u2022 \u2022`} THE END {`\u2022 \u2022 \u2022`}
          </Text>
        )}
      </View>
    );
  }, [isLoading, isFetchingNextPage, isFetching]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainerStyle: {
    paddingVertical: 30,
  },
});

export default memo(AllChats);
