import {Dimensions, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import Skeleton from '../../../components/Skeleton';
import Theme from '../../../utils/Theme';
const {width, height} = Dimensions.get('window');

const color = Theme.DARK;
interface loadingProps {
  isLoading: boolean;
}
const LoadingInfo: React.FC<loadingProps> = ({isLoading}) => {
  return (
    isLoading && (
      <View style={isLoading ? styles.container : styles.containerNone}>
        <Skeleton
          width={width}
          height={height * (9 / 12)}
          shimmerColors={[
            color.LighterGray,
            color.LighterGray,
            color.LighterGray,
          ]}
        />
        <Skeleton
          width={width * 0.95}
          height={20}
          shimmerColors={[
            color.LighterGray,
            color.LighterGray,
            color.LighterGray,
          ]}
          style={styles.skeleton}
        />
        <Skeleton
          width={width * 0.95}
          height={20}
          shimmerColors={[
            color.LighterGray,
            color.LighterGray,
            color.LighterGray,
          ]}
          style={styles.skeleton}
        />

        <View style={styles.wrapper}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(item => (
            <Skeleton
              key={item}
              width={80}
              height={35}
              shimmerColors={[
                color.LighterGray,
                color.LighterGray,
                color.LighterGray,
              ]}
              style={styles.skeleton}
              borderRadius={10}
            />
          ))}
        </View>

        <Skeleton
          width={width * 0.92}
          height={100}
          shimmerColors={[
            color.LighterGray,
            color.LighterGray,
            color.LighterGray,
          ]}
          style={styles.skeleton}
        />

        {/* <View style={styles.wrapper}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <Skeleton
              key={item}
              width={60}
              height={35}
              shimmerColors={[
                color.LighterGray,
                color.LighterGray,
                color.LighterGray,
              ]}
              style={styles.skeleton}
              borderRadius={10}
            />
          ))}
        </View> */}
      </View>
    )
  );
};

export default memo(LoadingInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DarkBackGround,
    gap: 8,
  },
  containerNone: {
    flex: 1,
    gap: 8,
    backgroundColor: color.DarkBackGround,
    display: 'none',
  },
  wrapper: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeleton: {
    alignSelf: 'center',
  },
});
