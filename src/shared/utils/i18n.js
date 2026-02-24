import { Platform } from 'react-native';
import { storage } from './storage';

class I18n {
  constructor() {
    this.translations = {};
    this.currentLocale = 'en';
    this.defaultLocale = 'en';
  }

  async init(translations, defaultLocale = 'en') {
    this.translations = translations;
    this.defaultLocale = defaultLocale;
    this.currentLocale = await storage.getItem('locale') || defaultLocale;
  }

  setLocale(locale) {
    if (this.translations[locale]) {
      this.currentLocale = locale;
      storage.setItem('locale', locale);
    }
  }

  getLocale() {
    return this.currentLocale;
  }

  t(key, params = {}) {
    const translation = this.translations[this.currentLocale]?.[key] || 
                       this.translations[this.defaultLocale]?.[key] || 
                       key;

    return this.interpolate(translation, params);
  }

  interpolate(text, params) {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.currentLocale, options).format(number);
  }

  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }

  formatCurrency(amount, currency = 'USD', options = {}) {
    return new Intl.NumberFormat(this.currentLocale, {
      style: 'currency',
      currency,
      ...options,
    }).format(amount);
  }

  formatPercentage(number, options = {}) {
    return new Intl.NumberFormat(this.currentLocale, {
      style: 'percent',
      ...options,
    }).format(number);
  }

  formatPlural(key, count, params = {}) {
    const pluralKey = this.getPluralKey(count);
    return this.t(`${key}.${pluralKey}`, { count, ...params });
  }

  getPluralKey(count) {
    const rules = {
      en: (n) => n === 1 ? 'one' : 'other',
      fr: (n) => n > 1 ? 'plural' : 'one',
      ru: (n) => {
        if (n % 10 === 1 && n % 100 !== 11) return 'one';
        if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'few';
        return 'many';
      },
    };

    const rule = rules[this.currentLocale] || rules.en;
    return rule(count);
  }

  formatRelativeTime(date, now = new Date()) {
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return this.t('relativeTime.days', { count: days });
    }
    if (hours > 0) {
      return this.t('relativeTime.hours', { count: hours });
    }
    if (minutes > 0) {
      return this.t('relativeTime.minutes', { count: minutes });
    }
    return this.t('relativeTime.seconds', { count: seconds });
  }

  formatFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return this.formatNumber(size, { maximumFractionDigits: 1 }) + ' ' + units[unitIndex];
  }
}

export const i18n = new I18n();

export const useI18n = () => {
  const [locale, setLocale] = useState(i18n.getLocale());

  const changeLocale = useCallback((newLocale) => {
    i18n.setLocale(newLocale);
    setLocale(newLocale);
  }, []);

  return {
    t: i18n.t.bind(i18n),
    locale,
    changeLocale,
    formatNumber: i18n.formatNumber.bind(i18n),
    formatDate: i18n.formatDate.bind(i18n),
    formatCurrency: i18n.formatCurrency.bind(i18n),
    formatPercentage: i18n.formatPercentage.bind(i18n),
    formatPlural: i18n.formatPlural.bind(i18n),
    formatRelativeTime: i18n.formatRelativeTime.bind(i18n),
    formatFileSize: i18n.formatFileSize.bind(i18n),
  };
};

export const I18nProvider = ({ children, translations, defaultLocale }) => {
  useEffect(() => {
    i18n.init(translations, defaultLocale);
  }, [translations, defaultLocale]);

  return children;
};

export const withI18n = (Component) => {
  return (props) => {
    const i18nProps = useI18n();
    return <Component {...props} {...i18nProps} />;
  };
}; 