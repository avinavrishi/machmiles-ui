import React from 'react';
import { Platform } from 'react-native';
import { analytics } from './analytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to analytics
    analytics.trackError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.state.errorInfo)
      ) : (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={() => this.setState({ hasError: false, error: null, errorInfo: null })}
        />
      );
    }

    return this.props.children;
  }
}

export const ErrorFallback = ({ error, errorInfo, onReset }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{error?.message}</p>
        {process.env.NODE_ENV === 'development' && (
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error?.toString()}
            <br />
            {errorInfo?.componentStack}
          </details>
        )}
        <button onClick={onReset}>Try again</button>
        <style jsx>{`
          .error-boundary {
            padding: 20px;
            text-align: center;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 20px;
          }
          h2 {
            color: #dc3545;
            margin-bottom: 16px;
          }
          p {
            color: #666;
            margin-bottom: 16px;
          }
          details {
            margin: 16px 0;
            padding: 16px;
            background-color: #f8f9fa;
            border-radius: 4px;
            text-align: left;
          }
          button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          button:hover {
            background-color: #0056b3;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error?.message}</Text>
      {process.env.NODE_ENV === 'development' && (
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.details}>
            {error?.toString()}
            {'\n\n'}
            {errorInfo?.componentStack}
          </Text>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsContainer: {
    maxHeight: 200,
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  details: {
    fontSize: 14,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const withErrorBoundary = (Component, fallback = null) => {
  return (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export const useErrorBoundary = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    setError(error);
    analytics.trackError(error);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    resetError,
  };
}; 