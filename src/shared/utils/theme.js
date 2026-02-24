import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5856D6',
    light: '#F2F2F7',
    dark: '#1C1C1E',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#8E8E93',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    border: '#C6C6C8',
    notification: '#FF3B30',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
  shadows: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
    web: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  }),
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
};

export const createStyles = (styles) => {
  if (Platform.OS === 'web') {
    return styles;
  }
  return styles;
};

export const useTheme = () => {
  return theme;
};

export const withTheme = (Component) => {
  return (props) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

export const createThemedComponent = (Component, styles) => {
  return withTheme(({ theme, ...props }) => {
    const themedStyles = typeof styles === 'function' ? styles(theme) : styles;
    return <Component {...props} style={themedStyles} />;
  });
};

export const createResponsiveStyles = (styles) => {
  return (theme) => {
    const { breakpoints } = theme;
    return {
      ...styles,
      '@media (min-width: 768px)': {
        ...styles.tablet,
      },
      '@media (min-width: 1024px)': {
        ...styles.desktop,
      },
    };
  };
};

export const createDarkModeStyles = (lightStyles, darkStyles) => {
  return (theme) => ({
    ...lightStyles,
    '@media (prefers-color-scheme: dark)': {
      ...darkStyles,
    },
  });
}; 