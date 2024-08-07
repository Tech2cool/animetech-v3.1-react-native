import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Theme from '../../utils/Theme';
import {FeaIcon} from '../../utils/constant';
import {stripHtmlTags} from '../../utils/helperFunctions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // ES 2015
dayjs.extend(relativeTime);

// import moment from 'moment';
const color = Theme.DARK;
const font = Theme.FONTS;

const ChatCard = memo(({item}: {item: chatsItems}) => {
  const [showFullComment, setShowFullComment] = useState(false);

  const memoziedImg = useMemo(() => {
    if (item?.author?.avatar?.xlarge?.permalink) {
      return item?.author?.avatar?.xlarge?.permalink;
    } else if (item?.author?.avatar?.large?.permalink) {
      return item?.author?.avatar?.large?.permalink;
    } else if (item?.author?.avatar?.small?.permalink) {
      return item?.author?.avatar?.small?.permalink;
    }

    return item?.author?.avatar?.permalink;
  }, [item?.author?.avatar]);

  const memoziedMsg = useMemo(() => {
    if (item?.message) {
      return stripHtmlTags(item?.message);
    }
  }, [item?.message]);

  const memoziedTime = useMemo(() => {
    if (item?.createdAt) {
      return dayjs(item?.createdAt).fromNow();
    }
  }, [item?.createdAt]);

  const memoziedAuthor = useMemo(() => {
    if (item?.author?.name) {
      return item?.author?.name;
    }
  }, [item?.author?.name]);

  const memoziedLikes = useMemo(() => {
    if (item?.likes) {
      return item?.likes;
    }
  }, [item?.likes]);

  const memoziedDislikes = useMemo(() => {
    if (item?.dislikes) {
      return item?.dislikes;
    }
  }, [item?.dislikes]);

  const handleClick = () => {
    setShowFullComment(!showFullComment);
  };
  return (
    <View style={styles.commentOne}>
      <View style={styles.imageContainer}>
        <FastImage
          style={{flex: 1}}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: memoziedImg,
          }}
        />
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.chatWrapper}>
          <Text numberOfLines={1} style={styles.textHeader}>
            @{memoziedAuthor}
          </Text>
          <Text>{`\u2022`}</Text>
          <Text style={styles.chatWrapper}>
            {memoziedTime}
            {/* {moment(item?.createdAt).fromNow()} */}
          </Text>
        </View>
        <TouchableOpacity onPress={handleClick}>
          <Text
            numberOfLines={showFullComment ? undefined : 3}
            style={styles.textInfo}>
            {memoziedMsg}
          </Text>
        </TouchableOpacity>
        <View style={styles.likesWrapper}>
          <View style={styles.wrapper}>
            <FeaIcon name={'thumbs-up'} size={18} color={color.LightGray} />
            <Text>{memoziedLikes}</Text>
          </View>
          <View style={styles.wrapper}>
            <FeaIcon name={'thumbs-down'} size={18} color={color.LightGray} />
            <Text>{memoziedDislikes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default ChatCard;

const styles = StyleSheet.create({
  textInfo: {
    flex: 1,
    fontSize: 12,
    opacity: 0.8,
    color: color.LightGray,
    fontFamily: font.RobotoRegular,
  },
  commentOne: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
  imageContainer: {
    width: 35,
    height: 35,
    borderRadius: 999,
    overflow: 'hidden',
  },
  infoWrapper: {
    flex: 1,
    gap: 5,
  },
  chatWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  likesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  textHeader: {
    opacity: 0.8,
    color: color.LightGray,
    fontSize: 12,
    fontFamily: font.RobotoBold,
  },
});
