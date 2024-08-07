import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'dark';
if (colorScheme === 'dark') {
  // Use dark color scheme
  // console.log('dark');
}

export default {
  DARK: {
    DarkBackGround: isDarkMode ? '#171717' : '#e8e8e8',
    DarkBackGround2: isDarkMode ? '#222222' : '#dddddd',
    Black: isDarkMode ? '#0b0b0b' : '#f4f4f4',
    DarkGray: isDarkMode ? '#333333' : '#cccccc',
    White: isDarkMode ? '#FFFFFF' : '#000000',
    Orange: '#ff7b00',
    LighterGray: '#444444',
    LightGray: '#CCCCCC',
    AccentBlue: '#3498db',
    AccentGreen: '#2ecc71',
    Red: 'red',
    Yellow: 'rgba(255, 240, 0, 1)',
    Cyan: '#00bcd4',
    LighterGray2: '#555555',
    LimeGreen: 'rgb(0,255,0)',
  },
  FONTS: {
    MontserratBold: 'Montserrat-Bold',
    MontserratMedium: 'Montserrat-Medium',
    MontserratRegular: 'Montserrat-Regular',
    MontserratSemiBold: 'Montserrat-SemiBold',

    OpenSansExtraBold: 'OpenSans-ExtraBold',
    OpenSansBold: 'OpenSans-Bold',
    OpenSansMedium: 'OpenSans-Medium',
    OpenSansRegular: 'OpenSans-Regular',
    OpenSansSemiBold: 'OpenSans-SemiBold',

    RobotoBold: 'Roboto-Bold',
    RobotoMedium: 'Roboto-Medium',
    RobotoRegular: 'Roboto-Regular',
    RobotoLight: 'Roboto-Light',
  },
};
