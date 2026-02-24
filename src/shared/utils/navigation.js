import { Platform } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@react-navigation/native';

export const useSharedNavigation = () => {
  const webNavigate = Platform.OS === 'web' ? useNavigate() : null;
  const nativeNavigate = Platform.OS === 'native' ? useNavigation() : null;

  const navigate = (route, params = {}) => {
    if (Platform.OS === 'web') {
      webNavigate(route);
    } else {
      nativeNavigate.navigate(route, params);
    }
  };

  const goBack = () => {
    if (Platform.OS === 'web') {
      webNavigate(-1);
    } else {
      nativeNavigate.goBack();
    }
  };

  const reset = (route, params = {}) => {
    if (Platform.OS === 'web') {
      webNavigate(route, { replace: true });
    } else {
      nativeNavigate.reset({
        index: 0,
        routes: [{ name: route, params }],
      });
    }
  };

  return {
    navigate,
    goBack,
    reset,
  };
};

export const createSharedNavigation = (navigation) => {
  return {
    navigate: (route, params = {}) => {
      if (Platform.OS === 'web') {
        navigation(route);
      } else {
        navigation.navigate(route, params);
      }
    },
    goBack: () => {
      if (Platform.OS === 'web') {
        navigation(-1);
      } else {
        navigation.goBack();
      }
    },
    reset: (route, params = {}) => {
      if (Platform.OS === 'web') {
        navigation(route, { replace: true });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: route, params }],
        });
      }
    },
  };
}; 