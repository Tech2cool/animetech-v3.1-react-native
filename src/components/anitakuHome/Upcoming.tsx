import React from 'react';
import {fetchUpcoming} from '../../api/anitaku';
import {useQuery} from '@tanstack/react-query';
import HorizontalSlider from '../HorizontalSlider';
import {Toast} from 'toastify-react-native';
import {View} from 'react-native';
interface UpcomingProps {
  refreshing: boolean;
}

const Upcoming: React.FC<UpcomingProps> = ({refreshing}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['Upcoming', 1, refreshing],
    queryFn: () => fetchUpcoming({page: 1}),
  });

  if (error) {
    Toast.error(error?.message, 'top');
  }

  return (
    <View>
      <HorizontalSlider
        title="Upcoming TV Series Anime"
        list={data?.tv_series?.sort(
          (a: animeInfo, b: animeInfo) => a?.index - b?.index,
        )}
        onPressAll={'Upcoming'}
        onPressAllParams={{
          type: 'tv-series',
          routeName: 'TV Series',
        }}
        isLoading={isLoading}
      />
      <HorizontalSlider
        title="Upcoming Special Anime"
        list={data?.special?.sort(
          (a: animeInfo, b: animeInfo) => a?.index - b?.index,
        )}
        // onPressAll={'special'}
        onPressAll={'Upcoming'}
        onPressAllParams={{
          type: 'special',
          routeName: 'Upcoming Special Series',
        }}
        isLoading={isLoading}
      />
      <HorizontalSlider
        title="Upcoming Movies"
        list={data?.movies?.sort(
          (a: animeInfo, b: animeInfo) => a?.index - b?.index,
        )}
        // onPressAll={'movie'}
        onPressAll={'Upcoming'}
        onPressAllParams={{
          type: 'movie',
          routeName: 'Upcoming Movies',
        }}
        isLoading={isLoading}
      />
      <HorizontalSlider
        title="Upcoming OVA"
        list={data?.ova?.sort(
          (a: animeInfo, b: animeInfo) => a?.index - b?.index,
        )}
        // onPressAll={'ova'}
        onPressAll={'Upcoming'}
        onPressAllParams={{
          type: 'ova',
          routeName: 'Upcoming OVA',
        }}
        isLoading={isLoading}
      />
      <HorizontalSlider
        title="Upcoming ONA"
        list={data?.ona?.sort(
          (a: animeInfo, b: animeInfo) => a?.index - b?.index,
        )}
        // onPressAll={'ona'}
        onPressAll={'Upcoming'}
        onPressAllParams={{
          type: 'ona',
          routeName: 'Upcoming ONA',
        }}
        isLoading={isLoading}
      />
    </View>
  );
};

export default Upcoming;
