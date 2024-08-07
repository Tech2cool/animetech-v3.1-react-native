import React from 'react';
import {
  fetchChats,
  fetchEpisodes,
  fetchInfo,
  fetchReaction,
  fetchSource,
} from '../api/anitaku';
import useVideo from './useVideo';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {Toast} from 'toastify-react-native';

interface useAPIProps {
  id?: string;
  episodeId?: string;
}
const useApi = ({id, episodeId}: useAPIProps) => {
  const {resetVideoAndControlsState} = useVideo();
  const fetchSources = async () => {
    resetVideoAndControlsState();
    const resp = await fetchSource({id: episodeId});
    return resp;
  };

  const {
    data: dataInfo,
    isLoading: isLoadingInfo,
    error: errorInfo,
  } = useQuery({
    queryKey: ['info', id],
    queryFn: () => fetchInfo(id),
  });

  const {
    data: dataSource,
    isLoading: isLoadingSource,
    error: errorSource,
  } = useQuery<SourceQuery>({
    queryKey: ['watch', episodeId],
    queryFn: fetchSources,
  });

  const {
    data: dataReaction,
    isLoading: isLoadingReaction,
    error: errorReaction,
  } = useQuery({
    queryKey: ['Reactions', dataSource?.thread?.id],
    queryFn: () => fetchReaction(dataSource?.thread?.id),
  });

  const {
    data: episodesInfo,
    isLoading: isLoadingEpisodes,
    error: errorEpisodes,
  } = useQuery<episodeQuery>({
    queryKey: ['Episodes', id],
    queryFn: () => fetchEpisodes(id),
  });

  const fkchats = async ({pageParam = undefined}) => {
    const resp = await fetchChats({
      id: dataSource?.thread?.id,
      cursor: pageParam,
    });
    return resp;
  };

  const {
    data: dataChats,
    error: errorChats,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading: isLoadingChats,
  } = useInfiniteQuery({
    queryKey: ['chats-infinite', dataSource?.thread?.id],
    queryFn: fkchats,
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      if (lastPage.cursor.hasNext) {
        return lastPage.cursor.next;
      }
      return undefined;
    },
    enabled: !!dataSource?.thread?.id,
  });
  if (errorSource) {
    Toast.error(errorSource?.message, 'top');
  }
  if (errorInfo) {
    Toast.error(errorInfo?.message, 'top');
  }
  if (errorEpisodes) {
    Toast.error(errorEpisodes?.message, 'top');
  }
  if (errorReaction) {
    Toast.error(errorReaction?.message, 'top');
  }
  if (errorChats) {
    Toast.error(errorChats?.message, 'top');
  }

  return {
    dataChats,
    errorChats,
    dataSource,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingChats,
    episodesInfo,
    isLoadingEpisodes,
    errorEpisodes,
    dataReaction,
    isLoadingReaction,
    errorReaction,
    isLoadingSource,
    errorSource,
    dataInfo,
    isLoadingInfo,
    errorInfo,
  };
};

export default useApi;
