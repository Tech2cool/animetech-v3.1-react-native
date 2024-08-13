interface ParamListBase {
  [key: string]: object | undefined;
}

interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Random: {randomize: number | string};
  Search: undefined;
  MyList: undefined;
  Setting: undefined;
  Splash: undefined;
  HomeStack: undefined;
  RecentRelease: undefined;
  Popular: undefined;
  Movies: undefined;
  GeneralSetting: undefined;
  AutoplaySetting: undefined;
  QualitySetting: undefined;
  AnimeInfo: {id: string; type?: number};
  TrailerInfo: {id: string};
  Watch: {id: string; episodeId: string; episodeNum: number; provider: string};
  Upcoming: {type: string; routeName: string};
  RequestedInfo: {anime: animeInfo};
}

interface animeInfo {
  animeId: string;
  animeID: string;
  gogoId: string;
  kitsuId: string | null;
  malId: string | null;
  anilistId: string | null;
  aniwatchId: string | null;
  averageScore: string | null;
  _id: string;
  id: string;
  index: number;
  genres?: string[];
  description: string;
  synopsis?: string;
  animeImg: string;
  episodeId: string;
  episodeNum: number;
  number?: string;
  released: string;
  year?: string;
  releasedDate?: string;
  req_status?: string;
  rating?: string;
  rank?: string;
  isDub: boolean;
  season: null;
  status: string;
  totalEpisodes: 10;
  type: string;
  updatedAt: string;
  episodes: {
    sub: number;
    dub: number;
  };
  relations: [];
  animeTitle: {
    english: string | null;
    english_jp: string | null;
    japanese: string | null;
    gogo_title: string | null;
  };
  title: {
    english: string | null;
    english_jp: string | null;
    japanese: string | null;
    gogo_title: string | null;
  };
  bannerImage?: {
    provider: string;
    url: string;
  };
  coverImage: {
    provider: string;
    extraLarge: string;
    large: string;
    medium: string;
    _id: string;
  }[];
  posterImage: {
    provider: string;
    extraLarge: string;
    large: string;
    medium: string;
    _id: string;
  }[];
}

interface episodeInfo {
  id: string;
  episodeNum?: number;
  number: number;
  title: string;
  isDub: boolean;
}
interface pageType {
  index: number;
  page: number;
  title: string;
}

interface episodeQuery {
  code: number;
  message?: string;
  pages: pageType[];
  episodes: episodeInfo[];
  list: episodeInfo[][];
}

interface sourceProps {
  url: string;
  quality: string;
  provider: string;
}
interface MultiLinkProps {
  server: string;
  name: string;
  link: string;
}
interface threadProps {
  feed: string;
  clean_title: string;
  dislikes: number;
  likes: number;
  message: string;
  ratingsEnabled: boolean;
  isSpam: boolean;
  isDeleted: boolean;
  category: string;
  adsDisabled: boolean;
  author: string;
  id: string;
  signedLink: string;
  createdAt: string;
  hasStreaming: boolean;
  raw_message: string;
  isClosed: boolean;
  link: string;
  slug: string;
  forum: string;
  identifiers: [];
  posts: number;
  moderators: number[];
  validateAllPosts: boolean;
  title: string;
  highlightedPost: string | null;
  frame: string;
  plyr: {
    main: string;
    backup: string;
  };
  nspl: {
    main: string;
    backup: string;
  };
}

interface SourceQuery {
  code: number;
  message: string;
  downloadURL: string;
  sources: sourceProps[];
  multiLinks: MultiLinkProps[];
  subtitles: [];
  audio: [];
  thread: threadProps;
  intro: {
    start: number;
    end: number;
  };
  outro: {
    start: number;
    end: number;
  };
}

interface reaction {
  votes: number;
  dateAdded: string;
  text: string;
  imageUrl: string;
  id: number;
  template: number;
  image: null | string;
  order: number;
}

interface avatarT {
  permalink: string;
  xlarge: {
    permalink: string;
    cache: string;
  };
  cache: string;
  large: {
    permalink: string;
    cache: string;
  };
  small: {
    permalink: string;
    cache: string;
  };
  isCustom: boolean;
}
interface autherT {
  username: string;
  about: string;
  name: string;
  disable3rdPartyTrackers: boolean;
  isPowerContributor: boolean;
  joinedAt: string;
  profileUrl: string;
  url: string;
  location: string;
  isPrivate: boolean;
  signedUrl: string;
  isPrimary: boolean;
  isAnonymous: boolean;
  id: string;
  avatar: avatarT;
}
interface chatsItems {
  message: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  editableUntil: string;
  dislikes: number;
  thread: string;
  numReports: number;
  likes: number;
  message: string;
  id: string;
  createdAt: string;
  author: autherT;
}
