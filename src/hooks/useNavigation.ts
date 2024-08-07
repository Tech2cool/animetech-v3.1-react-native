import {useNavigation as useNativeNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../utils/types';

export function useNavigation<T extends keyof RootStackParamList>() {
  return useNativeNavigation<RootStackNavigationProp<T>>();
}
