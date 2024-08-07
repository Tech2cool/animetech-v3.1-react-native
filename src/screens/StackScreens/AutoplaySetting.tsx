import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import Theme from '../../utils/Theme';
import useVideo from '../../hooks/useVideo';
import SelectDropdown from 'react-native-select-dropdown';
import {setAsyncData} from '../../utils/helperFunctions';
import {IIcon} from '../../utils/constant';
const autoPlay_list = [
  {
    name: 'disabled',
    value: 0,
  },
  {
    name: '5 seconds',
    value: 5,
  },
  {
    name: '10 seconds',
    value: 10,
  },
  {
    name: '15 seconds',
    value: 15,
  },
  {
    name: '20 seconds',
    value: 20,
  },
  {
    name: '25 seconds',
    value: 25,
  },
  {
    name: '30 seconds',
    value: 30,
  },
];
const keyy = 'autoPlay_key';

const color = Theme.DARK;
const font = Theme.FONTS;
const AutoplaySetting = () => {
  const {controlState, setControlState} = useVideo();

  const toggleSwitch = (value: boolean) => {
    setControlState(prev => ({
      ...prev,
      autoPlayNext: value,
    }));
    if (value) {
      changeDelay(5);
    } else {
      changeDelay(0);
    }
  };
  const changeDelay = (delay: number) => {
    setControlState(prev => ({...prev, autoPlayDelay: delay}));
    const data = {
      autoplay: controlState.autoPlayNext,
      delay: delay,
    };
    setAsyncData(keyy, JSON.stringify(data));
  };

  const memozediDefaultValue = useMemo(() => {
    const resp = autoPlay_list.find(
      item => item.value === controlState.autoPlayDelay,
    );
    return resp;
  }, [controlState.autoPlayDelay]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.Btn}>
        <Text style={styles.BtnText}>Auto-play next video</Text>
        <Text style={styles.SubBtnText}>
          When you finish watching a video, another plays automatically in{' '}
          {controlState.autoPlayDelay}s.
        </Text>
      </TouchableOpacity>
      <View
        style={[
          styles.Btn,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <Text style={[styles.BtnText, {fontFamily: font.OpenSansRegular}]}>
          Mobile/tablet
        </Text>
        <Switch
          value={controlState.autoPlayNext}
          onValueChange={toggleSwitch}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.BtnText}>Delay:</Text>
        <SelectDropdown
          data={autoPlay_list}
          onSelect={selectedItem => {
            // console.log(selectedItem, index)
            changeDelay(selectedItem.value);
          }}
          renderDropdownIcon={() => (
            <IIcon name="chevron-down" color={color.Orange} size={16} />
          )}
          buttonStyle={{
            backgroundColor: color.DarkBackGround,
            // borderColor:color.White,
            borderRadius: 5,
            // borderWidth:0.5,
            width: 120,
            height: 30,
            // alignItems:"flex-start",
            // justifyContent:"flex-start"
          }}
          rowStyle={{
            backgroundColor: color.DarkBackGround,
            borderColor: 'transparent',
          }}
          rowTextStyle={{
            color: color.White,
            fontSize: 14,
            textTransform: 'lowercase',
          }}
          buttonTextStyle={{
            color: color.Orange,
            textAlign: 'right',
            fontSize: 14,
            textTransform: 'lowercase',
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          defaultValue={memozediDefaultValue}
          rowTextForSelection={item => {
            return item.name;
          }}
        />
      </View>
    </View>
  );
};

export default AutoplaySetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
  },
  Btn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 2,
  },
  BtnText: {
    fontFamily: font.OpenSansMedium,
    color: color.White,
    fontSize: 16,
  },
  SubBtnText: {
    fontFamily: font.OpenSansMedium,
    color: color.LightGray,
    fontSize: 12,
  },
});
