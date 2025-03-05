import { Platform } from 'react-native';
import { analytics } from './analytics';

class Logger {
  constructor() {
    this.enabled = process.env.NODE_ENV !== 'production';
    this.logLevels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    this.currentLevel = this.logLevels.info;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setLevel(level) {
    if (this.logLevels[level] !== undefined) {
      this.currentLevel = this.logLevels[level];
    }
  }

  shouldLog(level) {
    return this.enabled && this.logLevels[level] >= this.currentLevel;
  }

  formatMessage(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.map(arg => {
      if (typeof arg === 'object') {
        return JSON.stringify(arg, null, 2);
      }
      return arg;
    });
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${formattedArgs.join(' ')}`;
  }

  debug(message, ...args) {
    if (this.shouldLog('debug')) {
      if (Platform.OS === 'web') {
        console.debug(this.formatMessage('debug', message, ...args));
      } else {
        console.log(this.formatMessage('debug', message, ...args));
      }
    }
  }

  info(message, ...args) {
    if (this.shouldLog('info')) {
      if (Platform.OS === 'web') {
        console.info(this.formatMessage('info', message, ...args));
      } else {
        console.log(this.formatMessage('info', message, ...args));
      }
    }
  }

  warn(message, ...args) {
    if (this.shouldLog('warn')) {
      if (Platform.OS === 'web') {
        console.warn(this.formatMessage('warn', message, ...args));
      } else {
        console.warn(this.formatMessage('warn', message, ...args));
      }
    }
  }

  error(message, ...args) {
    if (this.shouldLog('error')) {
      if (Platform.OS === 'web') {
        console.error(this.formatMessage('error', message, ...args));
      } else {
        console.error(this.formatMessage('error', message, ...args));
      }

      // Track error in analytics
      analytics.trackError(new Error(message), {
        args,
      });
    }
  }

  group(name, callback) {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.group(name);
        callback();
        console.groupEnd();
      } else {
        this.info(`=== ${name} ===`);
        callback();
        this.info(`=== End ${name} ===`);
      }
    }
  }

  time(name, callback) {
    if (this.enabled) {
      const start = performance.now();
      callback();
      const duration = performance.now() - start;
      this.info(`${name} took ${duration.toFixed(2)}ms`);
    }
  }

  async timeAsync(name, callback) {
    if (this.enabled) {
      const start = performance.now();
      await callback();
      const duration = performance.now() - start;
      this.info(`${name} took ${duration.toFixed(2)}ms`);
    }
  }

  table(data) {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.table(data);
      } else {
        this.info(JSON.stringify(data, null, 2));
      }
    }
  }

  count(label = 'default') {
    if (this.enabled) {
      if (!this.counters) {
        this.counters = {};
      }
      this.counters[label] = (this.counters[label] || 0) + 1;
      this.info(`${label}: ${this.counters[label]}`);
    }
  }

  resetCount(label = 'default') {
    if (this.enabled) {
      if (this.counters) {
        this.counters[label] = 0;
      }
    }
  }

  assert(condition, message) {
    if (this.enabled && !condition) {
      this.error(`Assertion failed: ${message}`);
    }
  }

  dir(obj, depth = null) {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.dir(obj, { depth });
      } else {
        this.info(JSON.stringify(obj, null, 2));
      }
    }
  }

  trace(message) {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.trace(message);
      } else {
        this.info(`Trace: ${message}`);
      }
    }
  }

  profile(name, callback) {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.profile(name);
        callback();
        console.profileEnd(name);
      } else {
        this.time(name, callback);
      }
    }
  }

  async profileAsync(name, callback) {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.profile(name);
        await callback();
        console.profileEnd(name);
      } else {
        await this.timeAsync(name, callback);
      }
    }
  }

  memory() {
    if (this.enabled && Platform.OS === 'web' && performance.memory) {
      const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
      this.info('Memory Usage:', {
        used: `${Math.round(usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(jsHeapSizeLimit / 1024 / 1024)}MB`,
      });
    }
  }

  clear() {
    if (this.enabled) {
      if (Platform.OS === 'web') {
        console.clear();
      } else {
        // Clear console by printing newlines
        console.log('\n'.repeat(process.stdout.rows));
      }
    }
  }
}

export const logger = new Logger();

export const useLogger = () => {
  const debug = useCallback((message, ...args) => {
    logger.debug(message, ...args);
  }, []);

  const info = useCallback((message, ...args) => {
    logger.info(message, ...args);
  }, []);

  const warn = useCallback((message, ...args) => {
    logger.warn(message, ...args);
  }, []);

  const error = useCallback((message, ...args) => {
    logger.error(message, ...args);
  }, []);

  const group = useCallback((name, callback) => {
    logger.group(name, callback);
  }, []);

  const time = useCallback((name, callback) => {
    logger.time(name, callback);
  }, []);

  const timeAsync = useCallback((name, callback) => {
    return logger.timeAsync(name, callback);
  }, []);

  const table = useCallback((data) => {
    logger.table(data);
  }, []);

  const count = useCallback((label) => {
    logger.count(label);
  }, []);

  const resetCount = useCallback((label) => {
    logger.resetCount(label);
  }, []);

  const assert = useCallback((condition, message) => {
    logger.assert(condition, message);
  }, []);

  const dir = useCallback((obj, depth) => {
    logger.dir(obj, depth);
  }, []);

  const trace = useCallback((message) => {
    logger.trace(message);
  }, []);

  const profile = useCallback((name, callback) => {
    logger.profile(name, callback);
  }, []);

  const profileAsync = useCallback((name, callback) => {
    return logger.profileAsync(name, callback);
  }, []);

  const memory = useCallback(() => {
    logger.memory();
  }, []);

  const clear = useCallback(() => {
    logger.clear();
  }, []);

  return {
    debug,
    info,
    warn,
    error,
    group,
    time,
    timeAsync,
    table,
    count,
    resetCount,
    assert,
    dir,
    trace,
    profile,
    profileAsync,
    memory,
    clear,
  };
}; 