import React from 'react';
import {fetchTrending} from '../../api/anitaku';
import {useQuery} from '@tanstack/react-query';
import HorizontalSlider from '../HorizontalSlider';
import {Toast} from 'toastify-react-native';
interface TopAiringProps {
  refreshing: boolean;
}

const TopAiring: React.FC<TopAiringProps> = ({refreshing}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['trending', 1, refreshing],
    queryFn: () => fetchTrending(1),
  });

  if (error) {
    Toast.error(error?.message, 'top');
  }

  return (
    <HorizontalSlider
      title="Top Airing"
      list={data?.list}
      onPressAll={'TopAiring'}
      isLoading={isLoading}
    />
  );
};

export default TopAiring;
