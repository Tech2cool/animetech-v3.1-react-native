import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useVideo from '../../hooks/useVideo';

const SettingsWrapper = () => {
  const {controlState, videoState, settingOp} = useVideo();
  return (
    <Modal transparent visible={controlState.showSetting}>
      <View style={styles.container}>
        <View
          style={videoState.fullscreen ? styles.contentFulll : styles.content}>
          <Text onPress={() => settingOp(false)}>afaf</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'red',
    height: '70%',
  },
  contentFulll: {
    backgroundColor: 'red',
    height: '100%',
    width: '50%',
    alignSelf: 'flex-end',
  },
});
