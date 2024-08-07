import React from 'react';
import {fetchMovies} from '../../api/anitaku';
import {useQuery} from '@tanstack/react-query';
import HorizontalSlider from '../HorizontalSlider';
import {Toast} from 'toastify-react-native';
interface MoviesProps {
  refreshing: boolean;
}

const Movies: React.FC<MoviesProps> = ({refreshing}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['MovieRelease', 1, refreshing],
    queryFn: () => fetchMovies({page: 1}),
  });

  if (error) {
    Toast.error(error?.message, 'top');
  }

  return (
    <HorizontalSlider
      title="Movies"
      list={data?.list}
      onPressAll={'Movies'}
      isLoading={isLoading}
    />
  );
};

export default Movies;
