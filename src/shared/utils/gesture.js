import { Platform, PanResponder, GestureResponderEvent } from 'react-native';
import { theme } from './theme';

export const createPanResponder = (config) => {
  if (Platform.OS === 'web') {
    return {
      panHandlers: {
        onMouseDown: config.onStart,
        onMouseMove: config.onMove,
        onMouseUp: config.onEnd,
        onMouseLeave: config.onEnd,
        onTouchStart: config.onStart,
        onTouchMove: config.onMove,
        onTouchEnd: config.onEnd,
      },
    };
  }

  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: config.onStart,
    onPanResponderMove: config.onMove,
    onPanResponderRelease: config.onEnd,
    onPanResponderCancel: config.onEnd,
    onPanResponderTerminate: config.onEnd,
    onPanResponderTerminationRequest: () => true,
  });
};

export const useGesture = (config) => {
  const panResponder = createPanResponder({
    onStart: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      config.onStart?.({ x: pageX, y: pageY });
    },
    onMove: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      config.onMove?.({ x: pageX, y: pageY });
    },
    onEnd: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      config.onEnd?.({ x: pageX, y: pageY });
    },
  });

  return panResponder;
};

export const useSwipe = (config) => {
  const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50 } = config;
  let startX = 0;
  let startY = 0;

  const panResponder = createPanResponder({
    onStart: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      startX = pageX;
      startY = pageY;
    },
    onMove: () => {},
    onEnd: (event) => {
      const { pageX, pageY } = event.nativeEvent;
      const deltaX = pageX - startX;
      const deltaY = pageY - startY;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    },
  });

  return panResponder;
};

export const usePinch = (config) => {
  const { onPinchIn, onPinchOut, threshold = 0.1 } = config;
  let startDistance = 0;

  const getDistance = (event) => {
    const touches = event.nativeEvent.touches;
    if (touches.length < 2) return 0;

    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.hypot(
      touch2.pageX - touch1.pageX,
      touch2.pageY - touch1.pageY
    );
  };

  const panResponder = createPanResponder({
    onStart: (event) => {
      if (event.nativeEvent.touches.length === 2) {
        startDistance = getDistance(event);
      }
    },
    onMove: (event) => {
      if (event.nativeEvent.touches.length === 2) {
        const currentDistance = getDistance(event);
        const scale = currentDistance / startDistance;

        if (Math.abs(scale - 1) > threshold) {
          if (scale > 1) {
            onPinchOut?.(scale);
          } else {
            onPinchIn?.(scale);
          }
        }
      }
    },
    onEnd: () => {},
  });

  return panResponder;
};

export const useRotate = (config) => {
  const { onRotate, threshold = 0.1 } = config;
  let startAngle = 0;

  const getAngle = (event) => {
    const touches = event.nativeEvent.touches;
    if (touches.length < 2) return 0;

    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.atan2(
      touch2.pageY - touch1.pageY,
      touch2.pageX - touch1.pageX
    );
  };

  const panResponder = createPanResponder({
    onStart: (event) => {
      if (event.nativeEvent.touches.length === 2) {
        startAngle = getAngle(event);
      }
    },
    onMove: (event) => {
      if (event.nativeEvent.touches.length === 2) {
        const currentAngle = getAngle(event);
        const rotation = currentAngle - startAngle;

        if (Math.abs(rotation) > threshold) {
          onRotate?.(rotation);
        }
      }
    },
    onEnd: () => {},
  });

  return panResponder;
};

export const GestureView = ({ children, gesture, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="gesture-view" style={style} {...gesture.panHandlers} {...props}>
        {children}
        <style jsx>{`
          .gesture-view {
            touch-action: none;
            user-select: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={style} {...gesture.panHandlers} {...props}>
      {children}
    </View>
  );
}; 