import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { ActivityIndicator, View } from 'react-native';

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  const withLoading = useCallback(async (asyncFunction) => {
    try {
      startLoading();
      return await asyncFunction();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
};

export const LoadingSpinner = ({ size = 'large', color = '#007AFF' }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <style jsx>{`
          .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid ${color};
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export const LoadingOverlay = ({ visible, children }) => {
  if (!visible) return children;

  if (Platform.OS === 'web') {
    return (
      <div className="loading-overlay">
        <LoadingSpinner />
        {children}
        <style jsx>{`
          .loading-overlay {
            position: relative;
            pointer-events: none;
          }
          .loading-overlay > * {
            pointer-events: none;
          }
          .loading-overlay > .loading-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={{ position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <LoadingSpinner />
      </View>
      {children}
    </View>
  );
};

export const LoadingButton = ({ isLoading, onPress, children, style }) => {
  if (Platform.OS === 'web') {
    return (
      <button
        onClick={onPress}
        disabled={isLoading}
        className={`loading-button ${isLoading ? 'loading' : ''}`}
        style={style}
      >
        {isLoading ? <LoadingSpinner size="small" /> : children}
        <style jsx>{`
          .loading-button {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            border-radius: 4px;
            background-color: #007AFF;
            color: white;
            border: none;
            cursor: pointer;
          }
          .loading-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .loading-button.loading {
            color: transparent;
          }
        `}</style>
      </button>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
          backgroundColor: '#007AFF',
          borderRadius: 4,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}; 