module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@react-redux|redux-persist|react-redux|@reduxjs/toolkit|immer)',
    ],
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        '!app/**/*.d.ts',
        '!app/**/index.{ts,tsx}',
        '!**/node_modules/**',
        '!**/__tests__/**',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: [
        '**/__tests__/**/*.test.{ts,tsx}',
        '**/*.test.{ts,tsx}',
    ],
};
