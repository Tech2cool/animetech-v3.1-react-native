import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../..//utils/Theme';
import {useSetting} from '../../context/SettingContext';
import SelectedRadioBtn from '../../components/SelectedRadioBtn';
import {setAsyncData} from '../../utils/helperFunctions';

const color = Theme.DARK;
const font = Theme.FONTS;
const qualityData = [
  {
    title: 'Auto (Recommended)',
    selected: true,
    subTitle: 'Best experience for your condtions',
    value: 'default',
  },
  {
    title: '1080P',
    selected: false,
    subTitle: 'Best quality experience',
    value: 1080,
  },
  {
    title: '720P',
    selected: false,
    subTitle: 'Good quality experience',
    value: 720,
  },
  {
    title: '480P',
    selected: false,
    subTitle: 'Good quality experience and reduce data consumption',
    value: 480,
  },
  {
    title: '360P',
    selected: false,
    subTitle: 'Less quality experience and less data consumption',
    value: 360,
  },
];
const QualitySetting = () => {
  const {setting, setSetting} = useSetting();
  const setQuality = async (quality: number | string, type: string) => {
    if (type === 'mobile') {
      setSetting(prev => ({
        ...prev,
        mobileQuality: quality,
      }));
      await setAsyncData('quality_mobile', JSON.stringify(quality));
    } else if (type === 'wifi') {
      setSetting(prev => ({
        ...prev,
        wifiQuality: quality,
      }));
      await setAsyncData('quality_wifi', JSON.stringify(quality));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <Text style={styles.subText}>
          Select your default streaming quality for all videos.
        </Text>
        <Text style={styles.subText}>
          You can change streaming quality in player options for single videos.
        </Text>
        <Text style={styles.subText}>
          If Selected Quality unvailable it chooses Auto quality
        </Text>
      </View>

      <View style={styles.border} />

      <View style={{paddingHorizontal: 10, paddingVertical: 10, gap: 15}}>
        <Text
          style={[
            styles.Text,
            {textTransform: 'uppercase', paddingVertical: 5},
          ]}>
          Video quality on mobile networks
        </Text>
        {qualityData.map(item => (
          <SelectedRadioBtn
            key={`${item.title}-mobile`}
            title={item.title}
            selected={setting.mobileQuality === item?.value ? true : false}
            subTitle={item.subTitle}
            onPress={() => setQuality(item?.value, 'mobile')}
          />
        ))}
      </View>

      <View style={styles.border} />

      <View style={{paddingHorizontal: 10, paddingVertical: 10, gap: 15}}>
        <Text
          style={[
            styles.Text,
            {textTransform: 'uppercase', paddingVertical: 5},
          ]}>
          Video quality on wifi
        </Text>
        {qualityData.map(item => (
          <SelectedRadioBtn
            key={`${item.title}-wifi`}
            title={item.title}
            selected={setting.wifiQuality === item?.value ? true : false}
            subTitle={item.subTitle}
            onPress={() => setQuality(item?.value, 'wifi')}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default QualitySetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
  },
  subText: {
    fontFamily: font.OpenSansRegular,
    fontSize: 13,
    color: color.LightGray,
  },
  Text: {
    fontFamily: font.OpenSansSemiBold,
    fontSize: 15,
    color: color.White,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: color.LighterGray,
    paddingVertical: 2,
  },
});
