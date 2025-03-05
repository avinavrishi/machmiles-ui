import { StyleSheet, Platform } from 'react-native';

// Common colors
export const colors = {
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
};

// Common spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Common typography
export const typography = {
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
};

// Common shadows
export const shadows = Platform.select({
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
});

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    ...shadows,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    ...typography.body,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    ...typography.body,
  },
  label: {
    ...typography.caption,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
});

// Platform-specific styles
export const platformStyles = {
  header: Platform.select({
    ios: {
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    android: {
      backgroundColor: colors.card,
      elevation: 0,
    },
  }),
  safeArea: Platform.select({
    ios: {
      paddingTop: spacing.xl,
    },
    android: {
      paddingTop: spacing.md,
    },
  }),
}; 