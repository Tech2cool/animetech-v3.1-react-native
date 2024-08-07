import {useQueries} from '@tanstack/react-query';
import {
  fetchMovies,
  fetchPopular,
  fetchRecentRelease,
  fetchTrending,
} from '../api/anitaku';

const useHomeAnime = () => {
  const {loading} = useQueries({
    queries: [
      {
        queryKey: ['trending', 1],
        queryFn: () => fetchTrending(1),
      },
      {
        queryKey: ['recentRelease', 1],
        queryFn: () => fetchRecentRelease(1),
      },
      {
        queryKey: ['PopularRelease', 1],
        queryFn: () => fetchPopular(1),
      },
      {
        queryKey: ['MovieRelease', 1],
        queryFn: () => fetchMovies({page: 1}),
      },
    ],
    combine: results => {
      return {
        data: results.map(result => result.data),
        loading: results.some(result => result.isPending),
      };
    },
  });

  return {loading};
};

export default useHomeAnime;
