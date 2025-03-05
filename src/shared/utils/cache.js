import { Platform } from 'react-native';
import { storage } from './storage';
import { logger } from './logging';

class Cache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100; // Maximum number of items to store
    this.defaultTTL = 3600000; // 1 hour in milliseconds
  }

  async set(key, value, ttl = this.defaultTTL) {
    try {
      const item = {
        value,
        timestamp: Date.now(),
        ttl,
      };

      // Store in memory
      this.cache.set(key, item);

      // Store in persistent storage
      await storage.setItem(`cache_${key}`, JSON.stringify(item));

      // Check cache size
      if (this.cache.size > this.maxSize) {
        this.evictOldest();
      }

      return true;
    } catch (error) {
      logger.error('Failed to set cache item:', error);
      return false;
    }
  }

  async get(key) {
    try {
      // Try memory cache first
      let item = this.cache.get(key);

      // If not in memory, try persistent storage
      if (!item) {
        const stored = await storage.getItem(`cache_${key}`);
        if (stored) {
          item = JSON.parse(stored);
          this.cache.set(key, item);
        }
      }

      // Check if item exists and is not expired
      if (item && !this.isExpired(item)) {
        return item.value;
      }

      // Item is expired or doesn't exist
      await this.remove(key);
      return null;
    } catch (error) {
      logger.error('Failed to get cache item:', error);
      return null;
    }
  }

  async remove(key) {
    try {
      // Remove from memory
      this.cache.delete(key);

      // Remove from persistent storage
      await storage.removeItem(`cache_${key}`);

      return true;
    } catch (error) {
      logger.error('Failed to remove cache item:', error);
      return false;
    }
  }

  async clear() {
    try {
      // Clear memory cache
      this.cache.clear();

      // Clear persistent storage cache
      const keys = await storage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await storage.multiRemove(cacheKeys);

      return true;
    } catch (error) {
      logger.error('Failed to clear cache:', error);
      return false;
    }
  }

  isExpired(item) {
    return Date.now() - item.timestamp > item.ttl;
  }

  evictOldest() {
    let oldestKey = null;
    let oldestTimestamp = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTimestamp) {
        oldestKey = key;
        oldestTimestamp = item.timestamp;
      }
    }

    if (oldestKey) {
      this.remove(oldestKey);
    }
  }

  async setMultiple(items) {
    try {
      const results = await Promise.all(
        items.map(({ key, value, ttl }) => this.set(key, value, ttl))
      );
      return results.every(result => result === true);
    } catch (error) {
      logger.error('Failed to set multiple cache items:', error);
      return false;
    }
  }

  async getMultiple(keys) {
    try {
      const results = await Promise.all(keys.map(key => this.get(key)));
      return results;
    } catch (error) {
      logger.error('Failed to get multiple cache items:', error);
      return keys.map(() => null);
    }
  }

  async removeMultiple(keys) {
    try {
      const results = await Promise.all(keys.map(key => this.remove(key)));
      return results.every(result => result === true);
    } catch (error) {
      logger.error('Failed to remove multiple cache items:', error);
      return false;
    }
  }

  async has(key) {
    try {
      const value = await this.get(key);
      return value !== null;
    } catch (error) {
      logger.error('Failed to check cache item:', error);
      return false;
    }
  }

  async keys() {
    try {
      const keys = await storage.getAllKeys();
      return keys
        .filter(key => key.startsWith('cache_'))
        .map(key => key.replace('cache_', ''));
    } catch (error) {
      logger.error('Failed to get cache keys:', error);
      return [];
    }
  }

  async size() {
    try {
      return this.cache.size;
    } catch (error) {
      logger.error('Failed to get cache size:', error);
      return 0;
    }
  }

  setMaxSize(size) {
    this.maxSize = size;
    while (this.cache.size > this.maxSize) {
      this.evictOldest();
    }
  }

  setDefaultTTL(ttl) {
    this.defaultTTL = ttl;
  }

  async getStats() {
    try {
      return {
        size: this.cache.size,
        maxSize: this.maxSize,
        defaultTTL: this.defaultTTL,
      };
    } catch (error) {
      logger.error('Failed to get cache stats:', error);
      return null;
    }
  }

  async preload(keys) {
    try {
      const items = await this.getMultiple(keys);
      return items.filter(item => item !== null);
    } catch (error) {
      logger.error('Failed to preload cache items:', error);
      return [];
    }
  }

  async invalidate(pattern) {
    try {
      const keys = await this.keys();
      const matchingKeys = keys.filter(key => key.match(pattern));
      return this.removeMultiple(matchingKeys);
    } catch (error) {
      logger.error('Failed to invalidate cache items:', error);
      return false;
    }
  }
}

export const cache = new Cache();

export const useCache = () => {
  const set = useCallback((key, value, ttl) => {
    return cache.set(key, value, ttl);
  }, []);

  const get = useCallback((key) => {
    return cache.get(key);
  }, []);

  const remove = useCallback((key) => {
    return cache.remove(key);
  }, []);

  const clear = useCallback(() => {
    return cache.clear();
  }, []);

  const setMultiple = useCallback((items) => {
    return cache.setMultiple(items);
  }, []);

  const getMultiple = useCallback((keys) => {
    return cache.getMultiple(keys);
  }, []);

  const removeMultiple = useCallback((keys) => {
    return cache.removeMultiple(keys);
  }, []);

  const has = useCallback((key) => {
    return cache.has(key);
  }, []);

  const keys = useCallback(() => {
    return cache.keys();
  }, []);

  const size = useCallback(() => {
    return cache.size();
  }, []);

  const setMaxSize = useCallback((size) => {
    cache.setMaxSize(size);
  }, []);

  const setDefaultTTL = useCallback((ttl) => {
    cache.setDefaultTTL(ttl);
  }, []);

  const getStats = useCallback(() => {
    return cache.getStats();
  }, []);

  const preload = useCallback((keys) => {
    return cache.preload(keys);
  }, []);

  const invalidate = useCallback((pattern) => {
    return cache.invalidate(pattern);
  }, []);

  return {
    set,
    get,
    remove,
    clear,
    setMultiple,
    getMultiple,
    removeMultiple,
    has,
    keys,
    size,
    setMaxSize,
    setDefaultTTL,
    getStats,
    preload,
    invalidate,
  };
}; 