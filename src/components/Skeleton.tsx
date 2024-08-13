import {TextStyle, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import Theme from '../utils/Theme';
const color = Theme.DARK;
interface SkeletonSliderProps {
  width: number | string;
  height?: number | string;
  opacity?: number;
  borderRadius?: number;
  shimmerColors?: string[];
  style?: ViewStyle | TextStyle;
}

const Skeleton: React.FC<SkeletonSliderProps> = ({
  width = 200,
  height,
  opacity,
  borderRadius = undefined,
  shimmerColors,
  style,
}) => {
  return (
    <ShimmerPlaceholder
      shimmerColors={
        shimmerColors
          ? shimmerColors
          : [color.LighterGray, color.LighterGray, color.LighterGray]
      }
      shimmerStyle={[
        {
          width: width,
          height: height,
          opacity: opacity,
          borderRadius: borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
    />
  );
};

export default memo(Skeleton);
