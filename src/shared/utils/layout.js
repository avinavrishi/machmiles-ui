import { Platform, View, ScrollView, SafeAreaView } from 'react-native';
import { theme } from './theme';

export const Container = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="container" style={style} {...props}>
        {children}
        <style jsx>{`
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 ${theme.spacing.md}px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={[{ padding: theme.spacing.md }, style]} {...props}>
      {children}
    </View>
  );
};

export const Row = ({ children, style, align = 'center', justify = 'flex-start', ...props }) => {
  const flexDirection = 'row';
  const alignItems = align;
  const justifyContent = justify;

  if (Platform.OS === 'web') {
    return (
      <div className="row" style={{ flexDirection, alignItems, justifyContent, ...style }} {...props}>
        {children}
        <style jsx>{`
          .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -${theme.spacing.sm}px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={[{ flexDirection, alignItems, justifyContent }, style]} {...props}>
      {children}
    </View>
  );
};

export const Col = ({ children, size = 12, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="col" style={style} {...props}>
        {children}
        <style jsx>{`
          .col {
            flex: 0 0 ${(size / 12) * 100}%;
            max-width: ${(size / 12) * 100}%;
            padding: 0 ${theme.spacing.sm}px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={[{ flex: size / 12 }, style]} {...props}>
      {children}
    </View>
  );
};

export const Card = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="card" style={style} {...props}>
        {children}
        <style jsx>{`
          .card {
            background-color: ${theme.colors.card};
            border-radius: ${theme.borderRadius.md}px;
            padding: ${theme.spacing.md}px;
            ${theme.shadows}
          }
        `}</style>
      </div>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          ...theme.shadows,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export const Section = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <section className="section" style={style} {...props}>
        {children}
        <style jsx>{`
          .section {
            padding: ${theme.spacing.xl}px 0;
          }
        `}</style>
      </section>
    );
  }

  return (
    <View style={[{ paddingVertical: theme.spacing.xl }, style]} {...props}>
      {children}
    </View>
  );
};

export const PageContainer = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="page-container" style={style} {...props}>
        {children}
        <style jsx>{`
          .page-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    );
  }

  return (
    <SafeAreaView style={[{ flex: 1 }, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

export const ScrollContainer = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="scroll-container" style={style} {...props}>
        {children}
        <style jsx>{`
          .scroll-container {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
        `}</style>
      </div>
    );
  }

  return (
    <ScrollView
      style={[{ flex: 1 }, style]}
      contentContainerStyle={{ flexGrow: 1 }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export const Grid = ({ children, columns = 12, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="grid" style={style} {...props}>
        {children}
        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: repeat(${columns}, 1fr);
            gap: ${theme.spacing.md}px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -theme.spacing.sm,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}; 