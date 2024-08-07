import {StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import Theme from '../../utils/Theme';
import SelectDropdown from 'react-native-select-dropdown';
import {MCIcon} from '../../utils/constant';
// import {setAsyncData} from '../../utils/helperFunctions';
import {useSetting} from '../../context/SettingContext';

const color = Theme.DARK;
const font = Theme.FONTS;

const languages = ['en', 'jp'];
// const providerKey = 'providerControl_';

const HeaderHome = () => {
  const {setting, setSetting} = useSetting();
  //   const onSelectDropDown = useCallback((selectedItem:) => {
  //     setAsyncData(providerKey, selectedItem);
  //     setSetting(prev => ({
  //       ...prev,
  //       provider: selectedItem,
  //     }));
  //   }, []);
  const onSelectDropDownLanguage = useCallback((selectedItem: string) => {
    setSetting(prev => ({
      ...prev,
      language: selectedItem,
    }));
  }, []);

  const buttonTextAfterSelection = useCallback(
    (selectedItem: string) => selectedItem,
    [],
  );
  const rowTextForSelection = useCallback((item: string) => item, []);
  const renderDropdownIcon = useCallback(
    () => <MCIcon name={'chevron-down'} color={color.Orange} size={25} />,
    [],
  );
  const defaultLange = useMemo(() => {
    return languages?.find(item => item === setting.language);
  }, [setting.language]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 1,
        right: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 10,
      }}>
      {/* <SelectDropdown
        data={providers}
        renderDropdownIcon={renderDropdownIcon}
        buttonStyle={styles.buttonStyle}
        defaultButtonText="..."
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        rowStyle={styles.rowStyle}
        selectedRowTextStyle={styles.selectedRowTextStyle}
        selectedRowStyle={styles.selectedRowStyle}
        defaultValue={providers?.find(item => item === setting.provider)}
        //   defaultValueByIndex={0}
        onSelect={onSelectDropDown}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
      /> */}

      <SelectDropdown
        data={languages}
        renderDropdownIcon={renderDropdownIcon}
        buttonStyle={[
          styles.buttonStyle,
          {width: 80, backgroundColor: 'rgba(0,0,0,0.3)'},
        ]}
        defaultButtonText="..."
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        rowStyle={styles.rowStyle}
        selectedRowTextStyle={styles.selectedRowTextStyle}
        selectedRowStyle={styles.selectedRowStyle}
        defaultValue={defaultLange}
        onSelect={onSelectDropDownLanguage}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
      />
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  rowTextStyle: {
    fontSize: 16,
    color: color.White,
    textTransform: 'uppercase',
    fontFamily: font.RobotoBold,
  },
  selectedRowTextStyle: {
    fontSize: 14,
    color: color.White,
    fontFamily: font.RobotoBold,
    textTransform: 'uppercase',
  },
  dropdownStyle: {
    borderRadius: 5,
    backgroundColor: color.DarkBackGround,
    elevation: 10,
    borderColor: color.LighterGray2,
    borderWidth: 0.2,
  },
  buttonTextStyle: {
    color: color.Orange,
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: font.RobotoBold,
    textAlign: 'right',
  },
  buttonStyle: {
    width: 140,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 99,
  },
  rowStyle: {
    borderColor: 'rgba(255,255,255,0.5)',
  },
  selectedRowStyle: {
    backgroundColor: color.Orange,
  },
});
