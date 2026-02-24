import { Platform } from 'react-native';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useNavigation, useRoute } from '@react-navigation/native';
import { analytics } from './analytics';

class Router {
  constructor() {
    this.routes = new Map();
    this.navigationListeners = new Set();
  }

  registerRoute(path, component) {
    this.routes.set(path, component);
  }

  unregisterRoute(path) {
    this.routes.delete(path);
  }

  getRoute(path) {
    return this.routes.get(path);
  }

  addNavigationListener(listener) {
    this.navigationListeners.add(listener);
    return () => this.navigationListeners.delete(listener);
  }

  notifyNavigationListeners(route, params = {}) {
    this.navigationListeners.forEach(listener => {
      listener(route, params);
    });
  }

  trackNavigation(route, params = {}) {
    analytics.trackPageView(route, params);
  }
}

export const router = new Router();

export const useRouter = () => {
  const navigate = useCallback((route, params = {}) => {
    if (Platform.OS === 'web') {
      const searchParams = new URLSearchParams(params);
      const queryString = searchParams.toString();
      const path = `${route}${queryString ? `?${queryString}` : ''}`;
      window.history.pushState({}, '', path);
    } else {
      // Handle native navigation
      const navigation = useNavigation();
      navigation.navigate(route, params);
    }

    router.notifyNavigationListeners(route, params);
    router.trackNavigation(route, params);
  }, []);

  const goBack = useCallback(() => {
    if (Platform.OS === 'web') {
      window.history.back();
    } else {
      const navigation = useNavigation();
      navigation.goBack();
    }
  }, []);

  const goForward = useCallback(() => {
    if (Platform.OS === 'web') {
      window.history.forward();
    } else {
      const navigation = useNavigation();
      navigation.goForward();
    }
  }, []);

  const replace = useCallback((route, params = {}) => {
    if (Platform.OS === 'web') {
      const searchParams = new URLSearchParams(params);
      const queryString = searchParams.toString();
      const path = `${route}${queryString ? `?${queryString}` : ''}`;
      window.history.replaceState({}, '', path);
    } else {
      const navigation = useNavigation();
      navigation.replace(route, params);
    }

    router.notifyNavigationListeners(route, params);
    router.trackNavigation(route, params);
  }, []);

  const reset = useCallback((route, params = {}) => {
    if (Platform.OS === 'web') {
      const searchParams = new URLSearchParams(params);
      const queryString = searchParams.toString();
      const path = `${route}${queryString ? `?${queryString}` : ''}`;
      window.history.pushState({}, '', path);
    } else {
      const navigation = useNavigation();
      navigation.reset({
        index: 0,
        routes: [{ name: route, params }],
      });
    }

    router.notifyNavigationListeners(route, params);
    router.trackNavigation(route, params);
  }, []);

  return {
    navigate,
    goBack,
    goForward,
    replace,
    reset,
  };
};

export const useRouteParams = () => {
  if (Platform.OS === 'web') {
    return useParams();
  }
  const route = useRoute();
  return route.params;
};

export const useSearchParams = () => {
  if (Platform.OS === 'web') {
    return useSearchParams();
  }
  const route = useRoute();
  return route.params;
};

export const useLocation = () => {
  if (Platform.OS === 'web') {
    return useLocation();
  }
  const route = useRoute();
  return {
    pathname: route.name,
    search: '',
    hash: '',
    state: route.params,
  };
};

export const useNavigationState = () => {
  if (Platform.OS === 'web') {
    return {
      index: window.history.length - 1,
      routes: [{ name: window.location.pathname }],
    };
  }
  const navigation = useNavigation();
  return navigation.getState();
};

export const useIsFocused = () => {
  if (Platform.OS === 'web') {
    return true;
  }
  const navigation = useNavigation();
  return navigation.isFocused();
};

export const useNavigationEvents = (listener) => {
  useEffect(() => {
    const unsubscribe = router.addNavigationListener(listener);
    return () => unsubscribe();
  }, [listener]);
};

export const withRouter = (Component) => {
  return (props) => {
    const routerProps = useRouter();
    return <Component {...props} {...routerProps} />;
  };
};

export const RouterProvider = ({ children }) => {
  useEffect(() => {
    const handlePopState = () => {
      const route = window.location.pathname;
      const params = Object.fromEntries(new URLSearchParams(window.location.search));
      router.notifyNavigationListeners(route, params);
      router.trackNavigation(route, params);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return children;
};

export const useRouteGuard = (guard) => {
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    const checkGuard = async () => {
      const shouldAllow = await guard(location);
      if (!shouldAllow) {
        router.replace('/unauthorized');
      }
    };

    checkGuard();
  }, [location, guard, router]);
};

export const useRouteTransition = (transition) => {
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    const handleTransition = async () => {
      await transition(location);
    };

    handleTransition();
  }, [location, transition]);
}; 