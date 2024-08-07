import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Theme from '../../utils/Theme';
import {TimerPickerModal} from 'react-native-timer-picker';
import {useSetting} from '../../context/SettingContext';
import {convertMilliseconds} from '../../utils/helperFunctions';

const color = Theme.DARK;
const font = Theme.FONTS;

const GeneralSetting = () => {
  const [showPicker, setShowPicker] = useState(false);
  const {setting, setSetting} = useSetting();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      setShowPicker(!showPicker);
    }
  };

  const onConfirm = (pickedDuration: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    const hourMil = pickedDuration.hours * 60 * 60 * 1000;
    const minMil = pickedDuration.minutes * 60 * 1000;
    const secMil = pickedDuration.seconds * 1000;
    const totalMilisecond = hourMil + minMil + secMil;
    setSetting(prev => ({
      ...prev,
      breakReminder: totalMilisecond,
    }));
    setShowPicker(false);
  };
  useEffect(() => {
    if (setting.breakReminder > 0) {
      setIsEnabled(true);
    }
  }, []);
  const memoziedBreakTime = useMemo(() => {
    return convertMilliseconds(setting.breakReminder);
  }, [setting.breakReminder]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.Btn,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <View>
          <Text style={styles.BtnText}>Remind me to take a break</Text>
          <Text style={styles.BtnSubText}>
            {setting.breakReminder > 0 && isEnabled
              ? `${memoziedBreakTime.hours}hr : ${memoziedBreakTime.minutes}m`
              : 'Off'}
          </Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#767577'}}
          thumbColor={isEnabled ? color.Orange : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </TouchableOpacity>

      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={onConfirm}
        secondsPickerIsDisabled
        hideSeconds
        modalTitle="Set Reminder"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        styles={{
          theme: 'dark',
        }}
        modalProps={{
          overlayOpacity: 0,
        }}
      />
    </View>
  );
};

export default GeneralSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: color.AccentBlue,
  },
  Btn: {
    gap: 2,
  },
  BtnText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    fontSize: 15,
  },
  BtnSubText: {
    fontFamily: font.OpenSansMedium,
    color: color.LightGray,
    fontSize: 13,
  },
});
