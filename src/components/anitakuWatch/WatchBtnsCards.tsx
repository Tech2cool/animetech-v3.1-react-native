import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {MCIcon} from '../../utils/constant';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';

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
  isLoading = false,
}) => {
  const {onChangeDownloadSheet, controlState} = useVideo();
  return (
    <>
      <ScrollView horizontal>
        <View style={styles.container}>
          {list?.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.show('Reactions coming soon!', ToastAndroid.SHORT);
              }}
              key={index}
              style={styles.btnContainer}>
              <FastImage
                source={{uri: `https:${item?.imageUrl}`}}
                style={styles.imgPic}
              />
              <Text style={styles.btnText}>{item?.votes}</Text>
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
    </>
  );
};

export default memo(WatchBtnsCards);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
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
    // flex: 1,
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
