import {useQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {searchAnime} from '../api/anitaku';
import useDebounce from './useDebounce';
import {Toast} from 'toastify-react-native';

interface dataResp {
  list: animeInfo[];
  pages: {
    page_link: string;
    page: number;
    name: string;
    is_current: boolean;
  }[];
  currentPage: number;
  totalPages: number;
  lastPage: number;
  hasNextPage: boolean;
}
interface appliedFilterType {
  sort: null | string;
  suborDub: null | string;
  type: null | string;
  year: number[];
  status: null | string;
  season: null | string;
  genre: string[];
}
const useSearch = (query: string) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredList, setFilteredList] = useState<animeInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllYears, setShowAllYears] = useState(false);
  const [searchbleFilter, setSearchbleFilter] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState<appliedFilterType>({
    sort: null,
    suborDub: null,
    type: null,
    year: [],
    status: null,
    season: null,
    genre: [],
  });

  const debouceSearch = useDebounce(query, 500);

  useEffect(() => {
    setPage(1);
  }, [debouceSearch]);
  function convertToParams(array: string[] | number[], key: string) {
    if (array?.length <= 0) return null;
    const resp = array?.map(arr => {
      return `${key}=${arr}`;
    });
    // console.log(resp.join(""))
    return resp.join('');
  }

  const searchData = async () => {
    const genre = convertToParams(appliedFilter.genre, '&genre[]')!;
    const year = convertToParams(appliedFilter.year, '&year[]')!;
    let sQuery = query ? query : ' ';
    try {
      const resp = await searchAnime({
        page: page,
        query: sQuery,
        genre: genre,
        year: year,
        status: appliedFilter.status!,
        season: appliedFilter.season!,
        subtype: appliedFilter.suborDub!,
        type: appliedFilter.type!,
      });

      return resp;
    } catch (err) {
      throw err;
    }
  };
  const onChangePage = useCallback((selectedPage: number) => {
    setPage(selectedPage);
  }, []);

  const toggleFilter = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  const {data, isLoading, error, isFetching, isPending, isRefetching} =
    useQuery<dataResp>({
      queryKey: ['search', debouceSearch, page, searchbleFilter],
      queryFn: searchData,
    });
  const onPressSort = useCallback(
    (value: string | null) => {
      setAppliedFilter(prev => ({
        ...prev,
        sort: value === appliedFilter.sort ? null : value,
      }));
    },
    [appliedFilter.sort],
  );

  const onPressType = useCallback(
    (type: string | null) => {
      if (appliedFilter.type === type) {
        setAppliedFilter(prev => ({
          ...prev,
          type: null,
        }));
      } else {
        setAppliedFilter(prev => ({
          ...prev,
          type: type,
        }));
      }
    },
    [appliedFilter.type],
  );

  const onPressSubDub = useCallback(
    (suborDub: string | null) => {
      if (appliedFilter.suborDub === suborDub) {
        setAppliedFilter(prev => ({
          ...prev,
          suborDub: null,
        }));
      } else {
        setAppliedFilter(prev => ({
          ...prev,
          suborDub: suborDub,
        }));
      }
    },
    [appliedFilter.suborDub],
  );

  const onPressStatus = useCallback(
    (status: string | null) => {
      if (appliedFilter.status === status) {
        setAppliedFilter(prev => ({
          ...prev,
          status: null,
        }));
      } else {
        setAppliedFilter(prev => ({
          ...prev,
          status: status,
        }));
      }
    },
    [appliedFilter.status],
  );

  const onPressSeason = useCallback(
    (season: string | null) => {
      if (appliedFilter.season === season) {
        setAppliedFilter(prev => ({
          ...prev,
          season: null,
        }));
      } else {
        setAppliedFilter(prev => ({
          ...prev,
          season: season,
        }));
      }
    },
    [appliedFilter.season],
  );

  const onPressYear = useCallback(
    (year: number) => {
      if (appliedFilter.year.includes(year)) {
        const filteryearRemove = appliedFilter.year.filter(yer => yer !== year);
        // console.log(filteryearRemove);
        setAppliedFilter(prev => ({
          ...prev,
          year: filteryearRemove.flat(),
        }));
      } else {
        setAppliedFilter(prev => ({
          ...prev,
          year: [...prev.year, year],
        }));
      }
    },
    [appliedFilter.year],
  );

  const applySort = useCallback(() => {
    if (!data) return;

    if (appliedFilter.sort === 'Year-asc') {
      const sortedList = data?.list?.sort(
        (a, b) => Number(a?.year) - Number(b?.year),
      );
      setFilteredList(sortedList);
    }
    if (appliedFilter.sort === 'Year-desc') {
      const sortedList = data?.list?.sort(
        (a, b) => Number(b?.year) - Number(a?.year),
      );
      setFilteredList(sortedList);
    }
  }, [appliedFilter.sort, data]);

  const onPressGenre = useCallback(
    (genre: string) => {
      if (appliedFilter.genre.includes(genre)) {
        const filterGenreRemove = appliedFilter.genre.filter(
          genr => genr !== genre,
        );

        setAppliedFilter(prev => ({
          ...prev,
          genre: filterGenreRemove.flat(),
        }));
      } else {
        setAppliedFilter(prev => ({
          ...prev,
          genre: [...prev.genre, genre],
        }));
      }
    },
    [appliedFilter.genre],
  );

  const toggleShowAllGenres = useCallback(() => {
    setShowAllGenres(!showAllGenres);
  }, [showAllGenres]);

  const toggleShowAllYears = useCallback(() => {
    setShowAllYears(!showAllYears);
  }, [showAllYears]);

  const handleReset = useCallback(() => {
    setAppliedFilter(prev => ({
      ...prev,
      sort: null,
      suborDub: null,
      type: null,
      year: [],
      status: null,
      season: null,
      genre: [],
    }));
    setFilteredList([]);
    setSearchbleFilter(!searchbleFilter);
  }, [searchbleFilter]);

  const handleApply = useCallback(() => {
    if (appliedFilter.sort) {
      applySort();
    }
    setShowFilters(false);
    setSearchbleFilter(!searchbleFilter);
  }, [applySort, appliedFilter.sort, searchbleFilter]);

  if (error) {
    Toast.error(error?.message, 'top');
  }
  const list: animeInfo[] =
    filteredList?.length > 0
      ? filteredList
      : data?.list?.sort((a: animeInfo, b: animeInfo) => a?.index - b?.index) ??
        [];

  const memoizedLoading = useMemo(() => {
    const loading = isLoading || isFetching || isPending || isRefetching;
    return loading;
  }, [isFetching, isLoading, isPending, isRefetching]);
  return {
    list,
    data,
    error,
    isLoading: memoizedLoading,
    appliedFilter,
    onChangePage,
    toggleFilter,
    showFilters,
    showAllGenres,
    showAllYears,
    toggleShowAllGenres,
    toggleShowAllYears,
    handleReset,
    handleApply,
    onPressSort,
    onPressType,
    onPressSubDub,
    onPressStatus,
    onPressSeason,
    onPressYear,
    onPressGenre,
  };
};

export default useSearch;
