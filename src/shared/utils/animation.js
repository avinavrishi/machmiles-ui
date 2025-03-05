import { Platform, Animated } from 'react-native';
import { theme } from './theme';

export const createAnimation = (initialValue = 0) => {
  return new Animated.Value(initialValue);
};

export const fadeIn = (value, duration = theme.animation.duration.normal) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const fadeOut = (value, duration = theme.animation.duration.normal) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const slideIn = (value, from = -100, duration = theme.animation.duration.normal) => {
  value.setValue(from);
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const slideOut = (value, to = 100, duration = theme.animation.duration.normal) => {
  return Animated.timing(value, {
    toValue: to,
    duration,
    useNativeDriver: true,
  });
};

export const scaleIn = (value, from = 0, duration = theme.animation.duration.normal) => {
  value.setValue(from);
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const scaleOut = (value, to = 0, duration = theme.animation.duration.normal) => {
  return Animated.timing(value, {
    toValue: to,
    duration,
    useNativeDriver: true,
  });
};

export const rotate = (value, toValue, duration = theme.animation.duration.normal) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

export const spring = (value, toValue, config = {}) => {
  return Animated.spring(value, {
    toValue,
    useNativeDriver: true,
    ...config,
  });
};

export const sequence = (animations) => {
  return Animated.sequence(animations);
};

export const parallel = (animations) => {
  return Animated.parallel(animations);
};

export const stagger = (animations, delay = 100) => {
  return Animated.stagger(delay, animations);
};

export const AnimatedView = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="animated-view" style={style} {...props}>
        {children}
        <style jsx>{`
          .animated-view {
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    );
  }

  return (
    <Animated.View style={style} {...props}>
      {children}
    </Animated.View>
  );
};

export const AnimatedText = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <div className="animated-text" style={style} {...props}>
        {children}
        <style jsx>{`
          .animated-text {
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    );
  }

  return (
    <Animated.Text style={style} {...props}>
      {children}
    </Animated.Text>
  );
};

export const AnimatedImage = ({ source, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <img className="animated-image" src={source} style={style} {...props} />
    );
  }

  return (
    <Animated.Image source={source} style={style} {...props} />
  );
};

export const useAnimation = (initialValue = 0) => {
  const animation = createAnimation(initialValue);

  const animate = (toValue, config = {}) => {
    return Animated.timing(animation, {
      toValue,
      duration: theme.animation.duration.normal,
      useNativeDriver: true,
      ...config,
    });
  };

  const springAnimate = (toValue, config = {}) => {
    return Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      ...config,
    });
  };

  return {
    value: animation,
    animate,
    springAnimate,
  };
};

export const withAnimation = (Component) => {
  return ({ animation, ...props }) => {
    if (Platform.OS === 'web') {
      return <Component {...props} style={[props.style, animation]} />;
    }
    return <Component {...props} style={[props.style, { transform: [{ translateX: animation }] }]} />;
  };
}; 