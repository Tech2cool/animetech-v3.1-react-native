import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IIcon} from '../../../utils/constant';
import {useNavigation} from '../../../hooks/useNavigation';
import Theme from '../../../utils/Theme';
const color = Theme.DARK;
interface headerInfoProps {
  handleShare: () => void;
}
const HeaderInfo: React.FC<headerInfoProps> = ({handleShare}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
        <IIcon name={'arrow-back'} size={30} color={color.White} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShare} style={styles.btn}>
        <IIcon name={'share-social'} size={30} color={color.White} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btn: {
    padding: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
