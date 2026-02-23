// Mock react-native-worklets (must come before reanimated)
jest.mock('react-native-worklets', () => ({
  __esModule: true,
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View, ScrollView } = require('react-native');
  return {
    __esModule: true,
    default: {
      View,
      ScrollView,
      createAnimatedComponent: (comp) => comp,
    },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    useAnimatedScrollHandler: () => () => {},
    interpolate: (...args) => 0,
    withSpring: (toValue) => toValue,
    withTiming: (toValue) => toValue,
    Extrapolation: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
    Easing: { linear: (v) => v, ease: (v) => v },
  };
});


