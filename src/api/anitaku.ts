import axios from 'axios';
import {SERVER_BASE_URL} from '../utils/constant';
import {Toast} from 'toastify-react-native';
const API = axios.create({
  baseURL: SERVER_BASE_URL,
});
type pageQuery = number;
type idQuery = string | undefined;
interface moviesParams {
  page: pageQuery;
  alphabet?: string | null;
}
interface sourceParams {
  id: idQuery;
  streamServer?: string;
  subtype?: string;
}

interface searchParams {
  page: pageQuery;
  query?: string;
  genre?: string;
  status?: string;
  subtype?: string;
  type?: string;
  season?: string;
  year?: string;
}
interface upcomingParams {
  page: pageQuery;
  type?: string;
}
interface seasonParams {
  page: pageQuery;
  season: string;
}
interface chatsParams {
  id: idQuery;
  cursor?: string;
}

export const fetchRecentRelease = async (page: pageQuery = 1) => {
  try {
    const resp = await API.get(`/recent?page=${page}`);
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchDbHome = async () => {
  try {
    const resp = await API.get('/db/home');
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchTrending = async (page: pageQuery = 1) => {
  try {
    const resp = await API.get(`/top-airing?page=${page}`);

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchPopular = async (page: pageQuery = 1) => {
  try {
    const resp = await API.get(`/popular?page=${page}`);
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchMovies = async ({page = 1, alphabet}: moviesParams) => {
  try {
    let url = `${SERVER_BASE_URL}/movies?page=${page}`;
    if (alphabet) {
      url += `&alphabet=${alphabet}`;
    }
    const resp = await API.get(url);

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const fetchInfo = async (id: idQuery) => {
  try {
    const resp = await API.get(`/anime-details/${id}`);

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const fetchInfoV2 = async (id: idQuery) => {
  try {
    const resp = await API.get(`/anime-details/v2/${id}`);
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const fetchTrailerInfo = async (id: idQuery) => {
  try {
    const resp = await API.get(`/trailer/${id}`);

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const fetchEpisodes = async (id: idQuery) => {
  try {
    const resp = await API.get(`/episodes/${id}`);

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchSource = async ({
  id,
  streamServer,
  subtype,
}: sourceParams) => {
  try {
    const resp = await API.get(
      `${SERVER_BASE_URL}/source/${id}?streamServer=${streamServer}&subtype=${subtype}`,
    );

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const searchAnime = async ({
  page = 1,
  query,
  genre,
  status,
  subtype,
  type,
  season,
  year,
}: searchParams) => {
  try {
    let url = `${SERVER_BASE_URL}/search?query=${query}&page=${page}`;
    if (genre) {
      url += `&genre=${encodeURIComponent(genre)}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (subtype) {
      url += `&subtype=${subtype}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    if (season) {
      url += `&season=${season}`;
    }
    if (year) {
      url += `&year=${encodeURIComponent(year)}`;
    }

    const resp = await API.get(url);

    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export async function fetchVersion() {
  try {
    const response = await API.get(`${SERVER_BASE_URL}/version`);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
}

export async function fetchNotices() {
  try {
    const response = await API.get(`${SERVER_BASE_URL}/notices`);
    return response?.data;
  } catch (error: any) {
    throw error;
  }
}

export const fetchRandom = async (id: string | number) => {
  try {
    const resp = await API.get(`${SERVER_BASE_URL}/random?id=${id}`);
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const fetchHome = async () => {
  try {
    const resp = await API.get('/home');
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const fetchUpcoming = async ({
  type = undefined,
  page = 1,
}: upcomingParams) => {
  try {
    let url = `${SERVER_BASE_URL}/upcoming-anime`;
    if (type) {
      url = `${SERVER_BASE_URL}/upcoming-anime/${type}?page=${page}`;
    }
    const resp = await API.get(url);
    // console.log(resp.data)
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchSeasonalAnime = async ({season, page = 1}: seasonParams) => {
  try {
    const resp = await API.get(
      `${SERVER_BASE_URL}/season/${season}?page=${page}`,
    );
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchRequestedAnime = async (page: pageQuery = 1) => {
  try {
    const resp = await API.get(`/requested-list?page=${page}`);
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchChats = async ({id, cursor = undefined}: chatsParams) => {
  try {
    let url = `${SERVER_BASE_URL}/chats/${id}`;

    if (cursor) {
      url += `/${cursor}`;
    }
    const resp = await API.get(url);
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const fetchReaction = async (id: idQuery) => {
  try {
    const resp = await API.get(`${SERVER_BASE_URL}/reaction/${id}`);

    // console.log(resp.data)
    return resp.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const updateHomeData = async () => {
  try {
    const recent = await API.get(`${SERVER_BASE_URL}/db/recent`);
    const topAiring = await API.get(`${SERVER_BASE_URL}/db/top-airing`);
    const popular = await API.get(`${SERVER_BASE_URL}/db/popular`);
    const trending = await API.get(`${SERVER_BASE_URL}/db/trending`);
    const top10 = await API.get(`${SERVER_BASE_URL}/db/top-10`);
    const movies = await API.get(`${SERVER_BASE_URL}/db/movies`);
    const upcoming = await API.get(`${SERVER_BASE_URL}/db/upcoming`);
    const home = await API.get(`${SERVER_BASE_URL}/db/home-up`);
    // console.log('updated');
    return {message: 'updated'};
  } catch (error: any) {
    // console.log('error', error);

    throw error?.response?.data;
  }
};
