import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const setAsyncData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const stripHtmlTags = (html: any) => {
  return html.replace(/<[^>]*>/g, '')?.replaceAll('\n', '');
};

export const convertMilliseconds = (ms: number) => {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= 60 * 60 * 1000;
  const minutes = Math.floor(ms / (60 * 1000));
  ms %= 60 * 1000;
  const seconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};
export function findIndexInPaginatedData(episodes = [], episodeId, pageSize) {
  if (episodes?.length > 0) {
    const episodeIndex = episodes.findIndex(ep => ep?.id === episodeId);
    const page = Math.ceil((episodeIndex + 1) / pageSize);
    const indexInPage = (episodeIndex + 1) % pageSize || pageSize;
    return {page, indexInPage};
  }
  return {page: 1, indexInPage: 0};
}
