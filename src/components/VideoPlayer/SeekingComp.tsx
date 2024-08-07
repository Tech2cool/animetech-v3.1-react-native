import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../../utils/Theme';
import Ripple from 'react-native-material-ripple';

const color = Theme.DARK;
const font = Theme.FONTS;
interface SeekingCompProps {
  seekToWithTimeOut: (value: string) => void;
  totalSeekTime: number;
  seekType: string;
  seeking: boolean;
}

const SeekingComp: React.FC<SeekingCompProps> = ({
  seeking,
  totalSeekTime,
  seekType,
  seekToWithTimeOut,
}) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        seeking ? styles.seekWrapper : styles.none,
      ]}>
      <Ripple
        style={styles.seekOpacity}
        onPress={() => seekToWithTimeOut('LEFT')}>
        <Text style={seekType === 'LEFT' ? styles.textSeek : styles.textSeek0}>
          {totalSeekTime}
        </Text>
      </Ripple>
      <Ripple
        rippleOpacity={0.5}
        rippleColor={'rgba(255,255,255,.5)'}
        style={styles.seekOpacity}
        onPress={() => seekToWithTimeOut('RIGHT')}>
        <Text style={seekType === 'RIGHT' ? styles.textSeek : styles.textSeek0}>
          {totalSeekTime}
        </Text>
      </Ripple>
    </View>
  );
};

export default SeekingComp;

const styles = StyleSheet.create({
  seekWrapper: {
    flexDirection: 'row',
  },
  textSeek: {
    fontFamily: font.OpenSansBold,
    color: color.White,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 99,
    opacity: 1,
  },
  textSeek0: {
    opacity: 0,
  },
  none: {
    display: 'none',
  },
  seekOpacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
