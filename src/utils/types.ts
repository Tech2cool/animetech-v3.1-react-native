import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
export type HomeStackScreenProps = StackScreenProps<
  RootStackParamList,
  'HomeStack'
>;

export type AnimeInfoScreenProps = StackScreenProps<
  RootStackParamList,
  'AnimeInfo'
>;
export type RequestedScreenProps = StackScreenProps<
  RootStackParamList,
  'RequestedInfo'
>;
export type TrailerScreenProps = StackScreenProps<
  RootStackParamList,
  'TrailerInfo'
>;

export type WatchScreenProps = StackScreenProps<RootStackParamList, 'Watch'>;
export type RecentReleaseScreenProps = StackScreenProps<
  RootStackParamList,
  'RecentRelease'
>;
export type TopAiringScreenProps = StackScreenProps<
  RootStackParamList,
  'TopAiring'
>;
export type PopularScreenProps = StackScreenProps<
  RootStackParamList,
  'Popular'
>;
export type UpcomingScreenProps = StackScreenProps<
  RootStackParamList,
  'Upcoming'
>;

export type MoviesScreenProps = StackScreenProps<RootStackParamList, 'Movies'>;

export type HomeScreenProps = BottomTabScreenProps<RootStackParamList, 'Home'>;
export type SearchScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Search'
>;
export type RandomScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Random'
>;
export type MyListScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'MyList'
>;
export type SettingsScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Settings'
>;
// Type for navigation prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
