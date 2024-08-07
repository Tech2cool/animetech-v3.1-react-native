import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackScreenProps} from '../utils/types';
import {screenOptions, screens} from '../models/BottomNavigationModel';
import {View} from 'react-native';
const BTab = createBottomTabNavigator<RootStackParamList>();
const BottomNavigation: React.FC<HomeStackScreenProps> = () => {
  return (
    <View style={{flex: 1}}>
      <BTab.Navigator screenOptions={screenOptions}>
        {screens.map((screen, index) => (
          <BTab.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            initialParams={screen.initialParams}
            options={{
              tabBarLabel: screen.label,
              tabBarIcon: screen.icon,
              tabBarItemStyle: screen.tabBarItemStyle,
              ...screen.headerOptions,
            }}
          />
        ))}
      </BTab.Navigator>
    </View>
  );
};

export default BottomNavigation;
