module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testPathIgnorePatterns: [
        '/helpers/'
    ],
    moduleFileExtensions: [
        'ts',
        'js'
    ],
}
