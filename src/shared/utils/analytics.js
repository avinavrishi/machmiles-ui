import { Platform } from 'react-native';
import { storage } from './storage';

class Analytics {
  constructor() {
    this.enabled = true;
    this.userId = null;
    this.sessionId = null;
    this.events = [];
    this.maxEvents = 100;
  }

  async init(config = {}) {
    this.enabled = config.enabled !== false;
    this.userId = await storage.getItem('analytics_user_id');
    this.sessionId = this.generateSessionId();
    await this.flushEvents();
  }

  generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  setUserId(userId) {
    this.userId = userId;
    storage.setItem('analytics_user_id', userId);
  }

  track(eventName, properties = {}) {
    if (!this.enabled) return;

    const event = {
      eventName,
      properties: {
        ...properties,
        platform: Platform.OS,
        timestamp: new Date().toISOString(),
        userId: this.userId,
        sessionId: this.sessionId,
      },
    };

    this.events.push(event);

    if (this.events.length >= this.maxEvents) {
      this.flushEvents();
    }
  }

  async flushEvents() {
    if (this.events.length === 0) return;

    try {
      const events = [...this.events];
      this.events = [];

      // Here you would typically send the events to your analytics service
      // For example, using fetch or a specific analytics SDK
      await fetch('YOUR_ANALYTICS_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
      // Put events back in the queue if sending failed
      this.events = [...this.events, ...events];
    }
  }

  trackPageView(pageName, properties = {}) {
    this.track('page_view', {
      pageName,
      ...properties,
    });
  }

  trackUserAction(action, properties = {}) {
    this.track('user_action', {
      action,
      ...properties,
    });
  }

  trackError(error, properties = {}) {
    this.track('error', {
      errorMessage: error.message,
      errorStack: error.stack,
      ...properties,
    });
  }

  trackPerformance(metric, value, properties = {}) {
    this.track('performance', {
      metric,
      value,
      ...properties,
    });
  }

  trackUserProperty(key, value) {
    this.track('user_property', {
      key,
      value,
    });
  }

  trackTiming(category, variable, value, label = null) {
    this.track('timing', {
      category,
      variable,
      value,
      label,
    });
  }

  trackSocial(network, action, target) {
    this.track('social', {
      network,
      action,
      target,
    });
  }

  trackEcommerce(action, properties = {}) {
    this.track('ecommerce', {
      action,
      ...properties,
    });
  }

  trackSearch(term, properties = {}) {
    this.track('search', {
      term,
      ...properties,
    });
  }

  trackShare(contentType, method, properties = {}) {
    this.track('share', {
      contentType,
      method,
      ...properties,
    });
  }

  trackVideo(action, properties = {}) {
    this.track('video', {
      action,
      ...properties,
    });
  }

  trackForm(action, formName, properties = {}) {
    this.track('form', {
      action,
      formName,
      ...properties,
    });
  }

  trackCustomEvent(eventName, properties = {}) {
    this.track(eventName, properties);
  }
}

export const analytics = new Analytics();

export const useAnalytics = () => {
  const track = useCallback((eventName, properties = {}) => {
    analytics.track(eventName, properties);
  }, []);

  const trackPageView = useCallback((pageName, properties = {}) => {
    analytics.trackPageView(pageName, properties);
  }, []);

  const trackUserAction = useCallback((action, properties = {}) => {
    analytics.trackUserAction(action, properties);
  }, []);

  const trackError = useCallback((error, properties = {}) => {
    analytics.trackError(error, properties);
  }, []);

  const trackPerformance = useCallback((metric, value, properties = {}) => {
    analytics.trackPerformance(metric, value, properties);
  }, []);

  const trackUserProperty = useCallback((key, value) => {
    analytics.trackUserProperty(key, value);
  }, []);

  return {
    track,
    trackPageView,
    trackUserAction,
    trackError,
    trackPerformance,
    trackUserProperty,
  };
};

export const AnalyticsProvider = ({ children, config }) => {
  useEffect(() => {
    analytics.init(config);
  }, [config]);

  return children;
};

export const withAnalytics = (Component) => {
  return (props) => {
    const analyticsProps = useAnalytics();
    return <Component {...props} {...analyticsProps} />;
  };
}; 