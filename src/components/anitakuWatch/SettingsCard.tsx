import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MCIcon, MIcon, qualityPrefs} from '../../utils/constant';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
const color = Theme.DARK;
const font = Theme.FONTS;
interface SettingCardProps {
  setShowSettingSheet: (enabled: boolean) => void;
}
const SettingCard: React.FC<SettingCardProps> = ({setShowSettingSheet}) => {
  const {controlState, setControlState, videoState} = useVideo();

  const handleQualityBtn = () => {
    setControlState(prev => ({
      ...prev,
      showSetting: false,
      showQualitySetting: true,
      showPlayBackRateSetting: false,
    }));
  };

  const handlePlayBackRateBtn = () => {
    setControlState(prev => ({
      ...prev,
      showSetting: false,
      showPlayBackRateSetting: true,
      showQualitySetting: false,
    }));
  };

  const handleResizeModeBtn = () => {
    setControlState(prev => ({
      ...prev,
      showSetting: false,
      showPlayBackRateSetting: false,
      showQualitySetting: false,
      showResizeSetting: true,
    }));
  };

  return (
    controlState.showSetting && (
      <View>
        <TouchableOpacity
          style={[styles.backBtn]}
          onPress={() => {
            setShowSettingSheet(false);
            setControlState(prev => ({
              ...prev,
              showSetting: false,
              showPlayBackRateSetting: false,
              showQualitySetting: false,
            }));
          }}>
          <MIcon name="arrow-back-ios" size={20} color={color.White} />
          <Text style={styles.btnText}>Setting</Text>
        </TouchableOpacity>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.Btn} onPress={handleQualityBtn}>
            <MCIcon name="quality-high" size={25} color={color.White} />
            <View style={styles.itemWrapper}>
              <Text style={styles.btnText}>Quality</Text>
              <View style={styles.subItemWrapper}>
                <Text
                  style={[
                    styles.btnText,
                    {color: color.Orange, fontFamily: font.OpenSansBold},
                  ]}>
                  {videoState.quality === qualityPrefs._default
                    ? 'Auto'
                    : videoState.quality}
                </Text>
                <MIcon
                  name="arrow-forward-ios"
                  size={15}
                  color={color.Orange}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.Btn]}
            onPress={handlePlayBackRateBtn}>
            <MCIcon name="play-speed" size={25} color={color.White} />
            <View style={styles.itemWrapper}>
              <Text style={styles.btnText}>PlayBack Rate</Text>
            </View>
            <View style={styles.subItemWrapper}>
              <Text style={[styles.btnText, styles.btnOrange]}>
                {videoState.playbackRate}x
              </Text>
              <MIcon name="arrow-forward-ios" size={15} color={color.Orange} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.Btn]} onPress={handleResizeModeBtn}>
            <MCIcon name="resize" size={25} color={color.White} />
            <View style={styles.itemWrapper}>
              <Text style={styles.btnText}>Resize Mode</Text>
            </View>
            <View style={styles.subItemWrapper}>
              <Text style={[styles.btnText, styles.btnOrange]}>
                {videoState.resizeMode}
              </Text>
              <MIcon name="arrow-forward-ios" size={15} color={color.Orange} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  Btn: {
    flexDirection: 'row',
    gap: 10,
    // justifyContent:"center",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: color.LighterGray,
    paddingVertical: 2,
  },
  backBtn: {
    flexDirection: 'row',
    // justifyContent:"center",
    alignItems: 'center',
    borderBottomColor: color.LighterGray,
    paddingVertical: 2,
    paddingHorizontal: 20,
    gap: 0,
    justifyContent: 'flex-start',
  },
  btnText: {
    color: color.White,
    fontSize: 15,
  },
  btnWrapper: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    gap: 10,
  },
  subItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  btnOrange: {
    color: color.Orange,
    fontFamily: font.OpenSansBold,
  },
});
