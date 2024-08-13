import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {MCIcon} from '../../utils/constant';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
import Skeleton from '../Skeleton';

const color = Theme.DARK;
const font = Theme.FONTS;

interface VideoBtns {
  list: [];
  shareToTwitter: () => void;
  shareToFacebook: () => void;
  shareToWhatsApp: () => void;
  onPressShare: () => void;
  isLoading: boolean;
}
const WatchBtnsCards: React.FC<VideoBtns> = ({
  list = [],
  shareToTwitter,
  shareToFacebook,
  shareToWhatsApp,
  onPressShare,
  isLoading,
}) => {
  const {onChangeDownloadSheet, controlState} = useVideo();
  const [liked, setLiked] = useState<string | undefined>(undefined);

  const onTouchLike = (item: any) => {
    if (item.text === liked) {
      setLiked(undefined);
    } else {
      setLiked(item?.text);
    }
  };
  if (isLoading) {
    return (
      <View style={{gap: 10}}>
        <View style={[styles.container, {gap: 10}]}>
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
        </View>
        <View style={[styles.container, {gap: 10}]}>
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
          <Skeleton width={60} height={35} borderRadius={10} opacity={1} />
        </View>
      </View>
    );
  }

  return (
    <View>
      <ScrollView horizontal>
        <View style={styles.container}>
          {list?.map((item: reaction, index) => (
            <TouchableOpacity
              onPress={() => onTouchLike(item)}
              key={index}
              style={[
                styles.btnContainer,
                liked === item?.text ? styles.activeBtn : undefined,
              ]}>
              <FastImage
                source={{uri: `https:${item?.imageUrl}`}}
                style={styles.imgPic}
              />
              <Text style={styles.btnText}>
                {liked === item?.text ? item?.votes + 1 : item?.votes}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              onChangeDownloadSheet(!controlState.showDownloadSheet)
            }
            style={styles.btnContainer}>
            <MCIcon name="download-outline" size={20} color={color.LightGray} />
            <Text style={styles.btnText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressShare} style={styles.btnContainer}>
            <MCIcon name="share-outline" size={20} color={color.LightGray} />
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareToWhatsApp}
            style={styles.btnContainer}>
            <MCIcon name="whatsapp" size={20} color={color.LightGray} />
            <Text style={styles.btnText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareToFacebook}
            style={styles.btnContainer}>
            <MCIcon name="facebook" size={20} color={color.LightGray} />
            <Text style={styles.btnText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={shareToTwitter}
            style={styles.btnContainer}>
            <MCIcon name="twitter" size={20} color={color.LightGray} />
            <Text style={styles.btnText}>Twitter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(WatchBtnsCards);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: color.LighterGray,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    gap: 5,
    maxHeight: 40,
    // flex: 1,
  },
  activeBtn: {
    backgroundColor: color.Orange,
  },
  btnText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
    fontSize: 12,
  },
  imgPic: {
    width: 25,
    height: 25,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
