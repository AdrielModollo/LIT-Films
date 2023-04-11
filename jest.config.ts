module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["reflect-metadata"],
    roots: [
        '<rootDir>/src',
        '<rootDir>/__tests__'
    ],
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: [
        '**/__tests__/**/*.spec.(ts|tsx)'
    ],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.ts'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text-summary',
        'lcov'
    ]
};
