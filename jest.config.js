/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// Jest configuration
// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  // Modules can be explicitly auto-mocked using jest.mock(moduleName).
  // https://facebook.github.io/jest/docs/en/configuration.html#automock-boolean
  automock: false, // [boolean]

  // Respect Browserify's "browser" field in package.json when resolving modules.
  // https://facebook.github.io/jest/docs/en/configuration.html#browser-boolean
  browser: false, // [boolean]

  // This config option can be used here to have Jest stop running tests after the first failure.
  // https://facebook.github.io/jest/docs/en/configuration.html#bail-boolean
  bail: false, // [boolean]

  // The directory where Jest should store its cached dependency information.
  // https://facebook.github.io/jest/docs/en/configuration.html#cachedirectory-string
  // CacheDirectory: '/tmp/<path>', // [string]

  // Indicates whether the coverage information should be collected while executing the test.
  // Because this retrofits all executed files with coverage collection statements,
  // It may significantly slow down your tests.
  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean
  // CollectCoverage: false, // [boolean]

  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],

  // https://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string
  coverageDirectory: '<rootDir>/coverage', // [string]

  // CoveragePathIgnorePatterns: // [array<string>]
  // CoverageReporters: [], // [array<string>]
  // CoverageThreshold: {}, // [object]

  globals: {
    __DEV__: true
  },

  // https://facebook.github.io/jest/docs/en/configuration.html#mapcoverage-boolean
  // MapCoverage: false, // [boolean]

  // The default extensions Jest will look for.
  // https://facebook.github.io/jest/docs/en/configuration.html#modulefileextensions-array-string
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],

  // ModuleDirectories: // [array<string>]

  // A map from regular expressions to module names that allow to stub out resources,
  // Like images or styles with a single module.
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy'
  },

  // ModulePathIgnorePatterns: // [array<string>]
  // ModulePaths: // [array<string>]
  // Notify: false, // [boolean]
  // Preset: // [string]
  // Projects: // [array<string>]
  // ClearMocks: // [boolean]
  // Reporters: // [array<moduleName | [moduleName, options]>]
  // ResetMocks: // [boolean]
  // ResetModules: // [boolean]
  // Resolver: // [string]
  // RootDir: // [string]
  // Roots: // [array<string>]
  // SetupFiles: // [array]
  // SetupTestFrameworkScriptFile: // [string]
  // SnapshotSerializers: // [array<string>]
  // TestEnvironment: // [string]
  // TestMatch: // [array<string>]
  // TestPathIgnorePatterns: // [array<string>]
  // TestRegex: // [string]
  // TestResultsProcessor: // [string]
  // TestRunner: // [string]
  // TestURL: // [string]
  // Timers: // [string]

  transform: {
    '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)':
      '<rootDir>/tools/lib/fileTransformer.js'
  },

  // TransformIgnorePatterns: // [array<string>]
  // UnmockedModulePathPatterns: // [array<string>]

  verbose: true // [boolean]
}
