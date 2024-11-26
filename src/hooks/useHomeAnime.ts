import {useQueries, useQuery} from '@tanstack/react-query';
import {
  fetchMovies,
  fetchPopular,
  fetchRecentRelease,
  fetchTrending,
  pingServer,
} from '../api/anitaku';
import {useState} from 'react';
import axios from 'axios';

const useHomeAnime = () => {
  // const {loading} = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['trending', 1],
  //       queryFn: () => fetchTrending(1),
  //     },
  //     {
  //       queryKey: ['recentRelease', 1],
  //       queryFn: () => fetchRecentRelease(1),
  //     },
  //     {
  //       queryKey: ['PopularRelease', 1],
  //       queryFn: () => fetchPopular(1),
  //     },
  //     {
  //       queryKey: ['MovieRelease', 1],
  //       queryFn: () => fetchMovies({page: 1}),
  //     },
  //   ],
  //   combine: results => {
  //     return {
  //       data: results.map(result => result.data),
  //       loading: results.some(result => result.isPending),
  //     };
  //   },
  // });
  const {data, isLoading, error} = useQuery({
    queryKey: ['ping'],
    queryFn: () => pingServer(),
  });

  const retryPing = () => {
    const {data, isLoading, error} = useQuery({
      queryKey: ['ping'],
      queryFn: () => pingServer(),
    });
  };

  // const {data, isLoading, error, isFetched} = useQuery({
  //   queryKey: ['db-home'],
  //   queryFn: () => fetchDbHome(),
  // });
  // useEffect(() => {
  //   const fetchUpdateData = async () => {
  //     try {
  //       const resp = await updateHomeData();
  //       console.log(resp);
  //       return resp;
  //     } catch (err: any) {
  //       console.log(err?.mesage);
  //     }
  //   };
  //   if (isFetched) {
  //     fetchUpdateData();
  //   }
  // }, [isFetched]);
  return {isLoading: isLoading, serverReady: data, retryPing};
};

export default useHomeAnime;
