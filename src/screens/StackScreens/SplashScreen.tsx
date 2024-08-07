import {View, ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOutLeft,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import RocketGif from '../../assets/images/rocket_up_2.gif';
import Theme from '../../utils/Theme';
const color = Theme.DARK;
const font = Theme.FONTS;

const {width, height} = Dimensions.get('window');
const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgImageWrapper}>
        <FastImage
          source={RocketGif}
          style={{width: width, height: height}}
          resizeMode={FastImage.resizeMode.cover}
          pointerEvents="none"
        />
      </View>
      <View style={styles.wrapper}>
        <Animated.Text
          entering={FadeInRight.delay(100)}
          exiting={FadeOutLeft.delay(100)}
          style={styles.heading1}>
          AnimeTech
        </Animated.Text>
        <Animated.Text
          entering={FadeInRight.delay(300)}
          exiting={FadeOutLeft.delay(300)}
          style={styles.heading2}>
          Anime Streaming App
        </Animated.Text>

        <Animated.Text
          entering={FadeInRight.delay(500)}
          exiting={FadeOutLeft}
          style={styles.heading3}>
          Powered By
        </Animated.Text>

        <View style={styles.cardWrapper}>
          <Animated.Text
            entering={FadeInRight.delay(800)}
            exiting={FadeOutLeft}
            style={styles.card}>
            Anitaku
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.delay(1200)}
            exiting={FadeOutLeft}
            style={[styles.card, styles.card2]}>
            Aniwatch
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.delay(1600)}
            exiting={FadeOutLeft}
            style={[styles.card, styles.card3]}>
            Anilist
          </Animated.Text>
        </View>
      </View>
      <View style={styles.bgIndicatorWrapper}>
        <Animated.View entering={FadeIn.delay(1200)}>
          <ActivityIndicator
            size={40}
            color={color.Red}
            style={styles.indicator}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImageWrapper: {
    position: 'absolute',
    bottom: 0,
    top: 0,
  },
  bgIndicatorWrapper: {
    position: 'absolute',
    bottom: '15%',
    left: 0,
    right: 0,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
    padding: 10,
    width: width,
  },
  heading1: {
    color: color.Orange,
    fontFamily: font.OpenSansBold,
    fontSize: 25,
  },
  heading2: {
    color: color.White,
    fontFamily: font.OpenSansBold,
    fontSize: 18,
  },
  heading3: {
    color: color.Orange,
    fontFamily: font.OpenSansBold,
    fontSize: 20,
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    color: color.AccentBlue,
    fontFamily: font.RobotoMedium,
    fontSize: 16,
    borderColor: color.AccentBlue,
    borderWidth: 2,
    padding: 5,
    textAlign: 'center',
    borderRadius: 99,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  card2: {
    borderColor: color.Orange,
    color: color.Orange,
  },
  card3: {
    borderColor: color.AccentGreen,
    color: color.AccentGreen,
  },
  indicator: {
    alignSelf: 'center',
    paddingTop: 20,
  },
});
