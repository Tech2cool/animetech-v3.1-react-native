import React from 'react';
import {fetchPopular} from '../../api/anitaku';
import {useQuery} from '@tanstack/react-query';
import HorizontalSlider from '../HorizontalSlider';
import {Toast} from 'toastify-react-native';
interface PopularProps {
  refreshing: boolean;
}

const Popular: React.FC<PopularProps> = ({refreshing}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['PopularRelease', 1, refreshing],
    queryFn: () => fetchPopular(1),
  });

  if (error) {
    Toast.error(error?.message, 'top');
  }

  return (
    <HorizontalSlider
      title="Popular"
      list={data?.list}
      onPressAll={'Popular'}
      isLoading={isLoading}
    />
  );
};

export default Popular;
