import Theme from '../utils/Theme';
import {TransitionPresets} from '@react-navigation/stack';

const color = Theme.DARK;
export const screenOptions = {
  headerShown: false,
  ...TransitionPresets.ModalFadeTransition, // Customize as needed
  headerStyle: {
    backgroundColor: color.DarkBackGround,
  },
  headerTintColor: color.White,
  cardStyle: {
    backgroundColor: color.DarkBackGround,
  },
  //   headerTitleStyle: {
  //     textTransform: 'capitalize',
  //   },
};
