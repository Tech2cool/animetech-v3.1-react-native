import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import {screenOptions} from '../models/StackNavigationModel';
import SplashScreen from '../screens/StackScreens/SplashScreen';
import useHomeAnime from '../hooks/useHomeAnime';
import AnimeInfo from '../screens/StackScreens/anitaku/AnimeInfo';
import Watch from '../screens/StackScreens/anitaku/Watch';
import RecentRelease from '../screens/StackScreens/anitaku/RecentRelease';
import TopAiring from '../screens/StackScreens/anitaku/TopAiring';
import Popular from '../screens/StackScreens/anitaku/Popular';
import Movies from '../screens/StackScreens/anitaku/Movies';
import Upcoming from '../screens/StackScreens/anitaku/Upcoming';
import NetInfo from '@react-native-community/netinfo';
import {useSetting} from '../context/SettingContext';
import AutoplaySetting from '../screens/StackScreens/AutoplaySetting';
import GeneralSetting from '../screens/StackScreens/GeneralSetting';
import QualitySetting from '../screens/StackScreens/QualitySetting';
import RequestedInfo from '../screens/StackScreens/anitaku/RequestedInfo';
import TrailerInfo from '../screens/StackScreens/anitaku/TrailerInfo';
const Stack = createStackNavigator<RootStackParamList>();
const StackNavigation: React.FC = () => {
  const {isLoading} = useHomeAnime();
  const {setSetting} = useSetting();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      // console.log('Is Wifi?', state.isWifiEnabled);
      // console.log('Is isInternetReachable?', state.isInternetReachable);

      setSetting(prev => ({
        ...prev,
        isWifi: state.isWifiEnabled!,
      }));
    });
    // Unsubscribe
    return () => unsubscribe();
  }, [setSetting]);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="HomeStack" component={BottomNavigation} />
        <Stack.Screen name="AnimeInfo" component={AnimeInfo} />
        <Stack.Screen name="RequestedInfo" component={RequestedInfo} />
        <Stack.Screen name="TrailerInfo" component={TrailerInfo} />
        <Stack.Screen name="Watch" component={Watch} />
        <Stack.Screen
          name="RecentRelease"
          component={RecentRelease}
          options={{headerShown: true, title: 'Recent Releases'}}
        />
        <Stack.Screen
          name="TopAiring"
          component={TopAiring}
          options={{headerShown: true, title: 'Top Airing'}}
        />
        <Stack.Screen
          name="Popular"
          component={Popular}
          options={{headerShown: true, title: 'Popular'}}
        />

        <Stack.Screen
          name="Movies"
          component={Movies}
          options={{headerShown: true, title: 'Movies'}}
        />
        <Stack.Screen
          name="Upcoming"
          component={Upcoming}
          options={{headerShown: true, title: 'Upcoming Animes'}}
        />
        <Stack.Screen
          name="AutoplaySetting"
          component={AutoplaySetting}
          options={{headerShown: true, title: 'Autoplay Setting'}}
        />
        <Stack.Screen
          name="GeneralSetting"
          component={GeneralSetting}
          options={{headerShown: true, title: 'General Settings'}}
        />
        <Stack.Screen
          name="QualitySetting"
          component={QualitySetting}
          options={{headerShown: true, title: 'Quality Setting'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
