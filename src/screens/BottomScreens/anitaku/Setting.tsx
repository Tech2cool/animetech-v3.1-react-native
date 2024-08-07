import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Theme from '../../../utils/Theme';
import {SettingsScreenProps} from '../../../utils/types';

const color = Theme.DARK;
const font = Theme.FONTS;
const Setting: React.FC<SettingsScreenProps> = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => navigation.navigate('GeneralSetting')}>
        {/* <AIcon name="appstore-o" size={25} color={color.White} /> */}
        <Text style={styles.BtnText}>General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Btn}
        onPress={() => navigation.navigate('AutoplaySetting')}>
        {/* <MCIcon name="motion-play" size={25} color={color.White} /> */}
        <Text style={styles.BtnText}>Auto-play</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Btn}
        onPress={() => navigation.navigate('QualitySetting')}>
        {/* <MIcon name="display-settings" size={25} color={color.White} /> */}
        <Text style={styles.BtnText}>Video quality preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBackGround,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  Btn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    flexDirection: 'row',
    gap: 20,
  },
  BtnText: {
    color: color.White,
    fontFamily: font.OpenSansMedium,
    textTransform: 'capitalize',
    fontSize: 15,
  },
});
