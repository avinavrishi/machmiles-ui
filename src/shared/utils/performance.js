import { Platform } from 'react-native';
import { analytics } from './analytics';

class Performance {
  constructor() {
    this.metrics = new Map();
    this.marks = new Map();
    this.observers = new Set();
  }

  mark(name) {
    const timestamp = performance.now();
    this.marks.set(name, timestamp);
    return timestamp;
  }

  measure(name, startMark, endMark) {
    const start = this.marks.get(startMark);
    const end = this.marks.get(endMark);

    if (!start || !end) {
      console.warn(`Performance marks not found for ${name}`);
      return null;
    }

    const duration = end - start;
    this.metrics.set(name, duration);

    // Track performance metric
    analytics.trackPerformance(name, duration);

    // Notify observers
    this.notifyObservers(name, duration);

    return duration;
  }

  getEntriesByName(name) {
    return Array.from(this.metrics.entries())
      .filter(([key]) => key === name)
      .map(([key, value]) => ({
        name: key,
        duration: value,
        entryType: 'measure',
        startTime: 0,
      }));
  }

  getEntriesByType(type) {
    if (type === 'measure') {
      return Array.from(this.metrics.entries()).map(([key, value]) => ({
        name: key,
        duration: value,
        entryType: 'measure',
        startTime: 0,
      }));
    }
    return [];
  }

  clearMarks(name) {
    if (name) {
      this.marks.delete(name);
    } else {
      this.marks.clear();
    }
  }

  clearMeasures(name) {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }

  observe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  notifyObservers(name, duration) {
    this.observers.forEach(callback => {
      callback({
        name,
        duration,
        entryType: 'measure',
        startTime: 0,
      });
    });
  }

  measureComponentPerformance(componentName, startMark, endMark) {
    return this.measure(`${componentName}_render`, startMark, endMark);
  }

  measureNetworkPerformance(name, startTime, endTime) {
    const duration = endTime - startTime;
    this.metrics.set(name, duration);
    analytics.trackPerformance(name, duration);
    this.notifyObservers(name, duration);
    return duration;
  }

  measureImageLoadPerformance(name, startTime, endTime) {
    const duration = endTime - startTime;
    this.metrics.set(name, duration);
    analytics.trackPerformance(name, duration);
    this.notifyObservers(name, duration);
    return duration;
  }

  measureAnimationPerformance(name, startTime, endTime) {
    const duration = endTime - startTime;
    this.metrics.set(name, duration);
    analytics.trackPerformance(name, duration);
    this.notifyObservers(name, duration);
    return duration;
  }

  measureUserInteractionPerformance(name, startTime, endTime) {
    const duration = endTime - startTime;
    this.metrics.set(name, duration);
    analytics.trackPerformance(name, duration);
    this.notifyObservers(name, duration);
    return duration;
  }

  measureMemoryUsage() {
    if (Platform.OS === 'web') {
      if (performance.memory) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
        this.metrics.set('memory_usage', {
          used: usedJSHeapSize,
          total: totalJSHeapSize,
          limit: jsHeapSizeLimit,
        });
        analytics.trackPerformance('memory_usage', {
          used: usedJSHeapSize,
          total: totalJSHeapSize,
          limit: jsHeapSizeLimit,
        });
      }
    }
  }

  measureFPS() {
    let lastTime = performance.now();
    let frames = 0;
    let lastFPSUpdate = performance.now();

    const measure = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime - lastFPSUpdate >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastFPSUpdate));
        this.metrics.set('fps', fps);
        analytics.trackPerformance('fps', fps);
        this.notifyObservers('fps', fps);

        frames = 0;
        lastFPSUpdate = currentTime;
      }

      lastTime = currentTime;
      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
  }

  measureResourceTiming() {
    if (Platform.OS === 'web') {
      const resources = performance.getEntriesByType('resource');
      resources.forEach(resource => {
        const { name, duration, startTime } = resource;
        this.metrics.set(`resource_${name}`, {
          duration,
          startTime,
        });
        analytics.trackPerformance(`resource_${name}`, duration);
      });
    }
  }

  measureNavigationTiming() {
    if (Platform.OS === 'web') {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const { loadEventEnd, domContentLoadedEventEnd, domInteractive } = navigation;
        this.metrics.set('navigation', {
          loadTime: loadEventEnd,
          domContentLoaded: domContentLoadedEventEnd,
          domInteractive,
        });
        analytics.trackPerformance('navigation', {
          loadTime: loadEventEnd,
          domContentLoaded: domContentLoadedEventEnd,
          domInteractive,
        });
      }
    }
  }
}

export const performance = new Performance();

export const usePerformance = () => {
  const measure = useCallback((name, startMark, endMark) => {
    return performance.measure(name, startMark, endMark);
  }, []);

  const mark = useCallback((name) => {
    return performance.mark(name);
  }, []);

  const observe = useCallback((callback) => {
    return performance.observe(callback);
  }, []);

  const measureComponent = useCallback((componentName, startMark, endMark) => {
    return performance.measureComponentPerformance(componentName, startMark, endMark);
  }, []);

  const measureNetwork = useCallback((name, startTime, endTime) => {
    return performance.measureNetworkPerformance(name, startTime, endTime);
  }, []);

  const measureImage = useCallback((name, startTime, endTime) => {
    return performance.measureImageLoadPerformance(name, startTime, endTime);
  }, []);

  const measureAnimation = useCallback((name, startTime, endTime) => {
    return performance.measureAnimationPerformance(name, startTime, endTime);
  }, []);

  const measureInteraction = useCallback((name, startTime, endTime) => {
    return performance.measureUserInteractionPerformance(name, startTime, endTime);
  }, []);

  return {
    measure,
    mark,
    observe,
    measureComponent,
    measureNetwork,
    measureImage,
    measureAnimation,
    measureInteraction,
  };
};

export const PerformanceProvider = ({ children }) => {
  useEffect(() => {
    performance.measureFPS();
    performance.measureMemoryUsage();
    performance.measureResourceTiming();
    performance.measureNavigationTiming();

    const interval = setInterval(() => {
      performance.measureMemoryUsage();
    }, 60000); // Measure memory usage every minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  return children;
}; 