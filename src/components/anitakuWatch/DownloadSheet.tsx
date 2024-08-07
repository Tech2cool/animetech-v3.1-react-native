import React, {memo} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import Theme from '../../utils/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Toast} from 'toastify-react-native';

const color = Theme.DARK;
interface DsheetProps {
  source: SourceQuery;
}
const DownloadSheet: React.FC<DsheetProps> = ({source}) => {
  const handleShare = async () => {
    try {
      await Linking.openURL(source?.downloadURL);
    } catch (error: any) {
      Toast.error(error?.message, 'top');
    }
  };
  // renders
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{gap: 10, alignItems: 'center'}}>
          <Text style={{color: color.Red, fontSize: 14}}>
            External Download page Contains ads
          </Text>
          <Text style={{color: color.Yellow, fontSize: 14}}>
            thos ads nothing do with us.
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{color: color.White, fontSize: 16}}
              onPress={handleShare}>
              Open with Browser
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginHorizontal: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  btn: {
    width: 150,
    height: 50,
    backgroundColor: color.Orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default memo(DownloadSheet);
