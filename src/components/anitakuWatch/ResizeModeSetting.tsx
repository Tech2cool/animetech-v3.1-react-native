import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
import {MCIcon, MIcon} from '../../utils/constant';
import {ResizeMode} from 'react-native-video';
const color = Theme.DARK;
const font = Theme.FONTS;
const resizeList = [
  ResizeMode.NONE,
  ResizeMode.CONTAIN,
  ResizeMode.COVER,
  ResizeMode.STRETCH,
];
const ResizeModeSetting = () => {
  const {videoState, controlState, setControlState, onChangeResizeMode} =
    useVideo();

  const handleGOBack = () => {
    setControlState(prev => ({
      ...prev,
      showSetting: true,
      showPlayBackRateSetting: false,
      showQualitySetting: false,
      showResizeSetting: false,
    }));
  };

  return (
    controlState.showResizeSetting && (
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={handleGOBack}
          style={[
            styles.Btn,
            {
              // paddingHorizontal:5,
            },
          ]}>
          <MIcon name="arrow-back-ios" size={20} color={color.White} />
          <Text style={styles.btnText}>Resize Mode</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <ScrollView>
            {resizeList?.map((resize: ResizeMode) => (
              <TouchableOpacity
                key={resize}
                onPress={() => onChangeResizeMode(resize)}
                style={[
                  styles.Btn,
                  {
                    backgroundColor:
                      videoState.resizeMode === resize
                        ? color.Orange
                        : undefined,
                  },
                ]}>
                <MCIcon name={'motion-play'} size={25} color={color.White} />
                <Text style={[styles.btnText]}>{resize}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  );
};

export default memo(ResizeModeSetting);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 8,
    flex: 1,
  },
  Btn: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // justifyContent:"center",
    alignItems: 'center',
    borderBottomColor: color.LighterGray,
    // paddingVertical:10,
    borderRadius: 5,
  },
  btnText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
    fontSize: 15,
  },
});
