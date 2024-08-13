import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Theme from '../../utils/Theme';
import FastImage from 'react-native-fast-image';
import {stripHtmlTags} from '../../utils/helperFunctions';
import Skeleton from '../Skeleton';
const color = Theme.DARK;
const font = Theme.FONTS;

interface WatchChatsProps {
  list: chatsItems[];
  source: SourceQuery;
  isLoading: boolean;
  onClick: () => void;
}
const WatchChats: React.FC<WatchChatsProps> = ({
  list,
  source,
  isLoading = true,
  onClick,
}) => {
  const imgUrl =
    list?.length > 0
      ? list[0]?.author?.avatar?.permalink ||
        list[0]?.author?.avatar?.xlarge?.permalink
      : '';

  const textMsg =
    list?.length > 0 ? list[0]?.message && stripHtmlTags(list[0]?.message) : '';
  // console.log('watch chats rendered');

  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <View style={styles.comentsHeading}>
        <Text style={styles.textHeading}>Comments</Text>
        <Text style={styles.textInfo}>{source?.thread?.posts}</Text>
      </View>
      {isLoading ? (
        <>
          <Skeleton width={'100%'} height={50} borderRadius={5} />
        </>
      ) : (
        <View style={styles.commentOne}>
          <View style={styles.imageContainer}>
            <FastImage
              style={{flex: 1}}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: imgUrl,
              }}
            />
          </View>
          <Text
            numberOfLines={3}
            style={[styles.textInfo, {flex: 1, fontSize: 12}]}>
            {textMsg}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(WatchChats);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: color.DarkBackGround2,
    borderRadius: 10,
    marginVertical: 5,
    marginBottom: 10,
    marginHorizontal: 8,
    gap: 5,
    overflow: 'hidden',
  },
  comentsHeading: {
    // flex: 1,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  textHeading: {
    // fontWeight: '600',
    fontSize: 15,
    color: color.White,
    opacity: 0.9,
    fontFamily: font.RobotoBold,
  },
  textInfo: {
    fontSize: 14,
    opacity: 0.8,
    color: color.LightGray,
    fontFamily: font.RobotoRegular,
  },
  commentOne: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    width: 35,
    height: 35,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
