// Note: @testing-library/jest-native is deprecated
// React Native Testing Library v12.4+ includes built-in matchers

// Fix for React 19 compatibility with jest-expo
if (typeof globalThis.IS_REACT_ACT_ENVIRONMENT === 'undefined') {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    selectionAsync: jest.fn(),
}));

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
