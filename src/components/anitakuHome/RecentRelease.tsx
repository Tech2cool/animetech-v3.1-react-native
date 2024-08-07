import React from 'react';
import {fetchRecentRelease} from '../../api/anitaku';
import {useQuery} from '@tanstack/react-query';
import HorizontalSlider from '../HorizontalSlider';
import {Toast} from 'toastify-react-native';
interface recentReleaseProps {
  refreshing: boolean;
}

const RecentRelease: React.FC<recentReleaseProps> = ({refreshing}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['recentRelease', 1, refreshing],
    queryFn: () => fetchRecentRelease(1),
  });

  if (error) {
    Toast.error(error?.message, 'top');
  }

  return (
    <HorizontalSlider
      title="Recent Releases"
      list={data?.list}
      onPressAll={'RecentRelease'}
      isLoading={isLoading}
      isVideo={true}
    />
  );
};

export default RecentRelease;
