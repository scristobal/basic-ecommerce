const nextJest = require('next/jest');

const createJestConfig = nextJest({
    //  path to load next.config.js and .env files in your test environment
    dir: './'
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    }
};

module.exports = createJestConfig(customJestConfig);
