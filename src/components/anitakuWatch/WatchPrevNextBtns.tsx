import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Skeleton from '../Skeleton';
import Theme from '../../utils/Theme';
const color = Theme.DARK;
const font = Theme.FONTS;
interface VideoBtns {
  prevBtnTitle?: string;
  nextBtnTitle?: string;
  disableNextBtn: boolean;
  disablePrevBtn: boolean;
  onPressNext: () => void;
  onPressPrev: () => void;
  isLoading: boolean;
}

const WatchPrevNextBtns: React.FC<VideoBtns> = ({
  prevBtnTitle = 'Prev',
  nextBtnTitle = 'Next',
  disableNextBtn = false,
  disablePrevBtn = false,
  onPressNext,
  onPressPrev,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <View style={[styles.container, {gap: 5}]}>
        <Skeleton width={'25%'} height={40} borderRadius={10} opacity={1} />
        <Skeleton width={'15%'} height={40} borderRadius={10} opacity={1} />
        <Skeleton width={'15%'} height={40} borderRadius={10} opacity={1} />
        <Skeleton width={'25%'} height={40} borderRadius={10} opacity={1} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.nextPrevBtn,
          {borderColor: disablePrevBtn ? color.LightGray : color.Orange},
        ]}
        onPress={onPressPrev}
        disabled={disablePrevBtn}>
        <Text
          style={[
            styles.nextPrevBtnText,
            {color: disablePrevBtn ? color.LightGray : color.Orange},
          ]}>
          {prevBtnTitle}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.nextPrevBtn,
          {borderColor: disableNextBtn ? color.LightGray : color.Orange},
        ]}
        onPress={onPressNext}
        disabled={disableNextBtn}>
        <Text
          style={[
            styles.nextPrevBtnText,
            {color: disableNextBtn ? color.LightGray : color.Orange},
          ]}>
          {nextBtnTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WatchPrevNextBtns;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    // flex: 1,
  },
  nextPrevBtn: {
    padding: 10,
    minWidth: 70,
    borderColor: color.Orange,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPrevBtnText: {
    color: color.Orange,
    fontFamily: font.OpenSansMedium,
    fontSize: 13,
  },
  ExtraBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ExtraBtnText: {
    fontFamily: font.OpenSansRegular,
    fontSize: 12,
    color: color.Orange,
  },
});
