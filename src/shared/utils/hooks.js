import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform, Dimensions } from 'react-native';

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setSize({
          width: window.width,
          height: window.height,
        });
      });

      return () => subscription.remove();
    }
  }, []);

  return size;
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useThrottle = (value, limit) => {
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setThrottledValue(value);
    }, limit);

    return () => {
      clearTimeout(timer);
    };
  }, [value, limit]);

  return throttledValue;
};

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (Platform.OS === 'web') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      if (Platform.OS === 'web') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
};

export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (Platform.OS === 'web') {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      if (Platform.OS === 'web') {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = (e) => setMatches(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    return undefined;
  }, [query]);

  return matches;
};

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(
    Platform.OS === 'web' ? navigator.onLine : true
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
    return undefined;
  }, []);

  return isOnline;
};

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'web' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    }
  }, []);

  return { location, error };
};

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleOrientationChange = () => {
        setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      };

      window.addEventListener('resize', handleOrientationChange);
      handleOrientationChange();

      return () => window.removeEventListener('resize', handleOrientationChange);
    }
    return undefined;
  }, []);

  return orientation;
}; 