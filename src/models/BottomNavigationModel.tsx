import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Home from '../screens/BottomScreens/anitaku/Home';
import MyList from '../screens/BottomScreens/anitaku/MyList';
import Random from '../screens/BottomScreens/anitaku/Random';
import Search from '../screens/BottomScreens/anitaku/Search';
import Setting from '../screens/BottomScreens/anitaku/Setting';
import {EntIcon, F5Icon, MIcon} from '../utils/constant';
import Theme from '../utils/Theme';
interface ScreenConfig {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>; // Adjusting component type to be more flexible
  label: string;
  icon: (props: {color: string; size: number}) => React.ReactNode;
  initialParams?: object;
  tabBarItemStyle?: object;
  headerOptions?: BottomTabNavigationOptions;
}

const color = Theme.DARK;
const font = Theme.FONTS;
export const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveBackgroundColor: color.DarkBackGround,
  tabBarInactiveBackgroundColor: color.DarkBackGround,
  tabBarInactiveTintColor: color.LightGray,
  tabBarActiveTintColor: color.Orange,
  tabBarStyle: {
    borderColor: color.LighterGray,
    borderTopWidth: 0.5,
    backgroundColor: color.DarkBackGround,
  },
};

export const screens: ScreenConfig[] = [
  {
    name: 'Home',
    component: Home,
    label: 'Home',
    icon: ({color, size}) => <MIcon name="home" color={color} size={size} />,
  },
  {
    name: 'Search',
    component: Search,
    label: 'Search',
    icon: ({color, size}) => <MIcon name="search" color={color} size={size} />,
  },
  {
    name: 'Random',
    component: Random,
    label: 'Random',
    icon: ({color, size}) => <F5Icon name="random" color={color} size={size} />,
    initialParams: {randomize: new Date().getTime()},
    tabBarItemStyle: {
      top: -25,
      height: 70,
      width: 70,
      borderRadius: 999,
    },
  },
  {
    name: 'MyList',
    component: MyList,
    label: 'MyList',
    icon: ({color, size}) => <EntIcon name="list" color={color} size={size} />,
    headerOptions: {
      headerShown: false,
      headerTitle: 'watchlist',
      headerTitleStyle: {
        fontFamily: 'MontserratBold', // replace font.MontserratBold
        fontSize: 18,
        color: '#ffffff', // replace color.White
      },
      headerStyle: {
        backgroundColor: '#1c1c1c', // replace color.DarkBackGround
      },
    },
  },
  {
    name: 'Settings',
    component: Setting,
    label: 'Settings',
    icon: ({color, size}) => (
      <MIcon name="settings" color={color} size={size} />
    ),
    headerOptions: {
      headerShown: true,
      // headerTitle: 'watchlist',
      headerTitleStyle: {
        fontFamily: 'MontserratBold', // replace font.MontserratBold
        fontSize: 18,
        color: '#ffffff', // replace color.White
      },
      headerStyle: {
        backgroundColor: '#1c1c1c', // replace color.DarkBackGround
      },
    },
  },
];
