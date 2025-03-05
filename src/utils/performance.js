// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy load images
export const lazyLoadImage = (image) => {
  if ('loading' in HTMLImageElement.prototype) {
    image.loading = 'lazy';
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
};

// Intersection Observer for infinite scroll
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};

// Memoize function for expensive computations
export const memoize = (func) => {
  const cache = new Map();
  return function executedFunction(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

// Performance monitoring
export const measurePerformance = (label, callback) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
    const result = callback();
    console.timeEnd(label);
    return result;
  }
  return callback();
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.entries(hint).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('ServiceWorker registration successful');
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
};

// Cache management
export const clearCache = async () => {
  if ('caches' in window) {
    try {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map(key => caches.delete(key)));
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
};

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if (window.performance) {
    const metrics = {
      navigation: performance.getEntriesByType('navigation')[0],
      resources: performance.getEntriesByType('resource'),
      paint: performance.getEntriesByType('paint'),
      longTask: performance.getEntriesByType('longtask')
    };

    // Send metrics to analytics
    if (process.env.NODE_ENV === 'production') {
      // Implement your analytics logic here
      console.log('Performance metrics:', metrics);
    }

    return metrics;
  }
  return null;
}; 