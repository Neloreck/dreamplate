import * as path from "path";
import * as React from "react";

const ROOT_PATH: string = path.resolve(__dirname, "../../../");
const TS_CONFIG_PATH: string = path.resolve(__dirname, "./tsconfig.json");
const BABEL_TRANSFORMER_PATH: string = path.resolve(__dirname, "./babel_transformer.ts");

export const JEST_CONFIG = {
  // automock: false,
  // bail: false,
  // browser: false,
  cacheDirectory: "<rootDir>/target/test/cache",
  clearMocks: true,
  collectCoverage: true,
  // collectCoverageFrom: null,
  coverageDirectory: "<rootDir>/target/test/coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
   ],
  globals: {
    IS_DECORATOR_ENABLED: false,
    IS_DEV: false,
    React,
    "ts-jest": {
      diagnostics: false,
      tsConfig: TS_CONFIG_PATH
    }
  },
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],
  // coverageThreshold: null,
  // errorOnDeprecated: false,
  // forceCoverageMatch: [],
  // globalSetup: null,
  // globalTeardown: null,
  moduleDirectories: [
     "node_modules"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "@Api/(.*)$": "<rootDir>/src/api/$1",
    "@Application/(.*)$": "<rootDir>/src/application/$1",
    "@Build/(.*)$": "<rootDir>/cli/build/$1",
    "@Lib/(.*)$": "<rootDir>/src/lib/$1",
    "@Main/(.*)$": "<rootDir>/src/application/main/$1",
    "@Modules/(.*)$": "<rootDir>/src/application/modules/$1",
    "@Test/(.*)$": "<rootDir>/cli/test/$1",
    "\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__test__/mocks/nonJSModule.js",
  },
  // notify: false,
  // notifyMode: "always",
  // preset: null,
  // projects: null,
  // reporters: undefined,
  // resetMocks: false,
  // resetModules: false,
  // resolver: null,
  // restoreMocks: false,
  rootDir: ROOT_PATH,
  roots: [
    "<rootDir>"
  ],
  // runner: "jest-runner",
  setupFiles: [
    "<rootDir>/cli/test/config/setup_tests.ts"
  ],
  setupFilesAfterEnv: [
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  testEnvironment: "jest-environment-jsdom-fifteen",
  // testEnvironmentOptions: {},
  // testLocationInResults: false,
  testMatch: [
     "**/__tests__/**/*.ts?(x)",
     "**/?(*.)+(spec|__test__|__tests__).ts?(x)"
   ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  // testResultsProcessor: null,
  // testRunner: "jasmine2",
  // testURL: "about:blank",
  // timers: "real",
  transform: {
    "^.+\\.(js|jsx)$": BABEL_TRANSFORMER_PATH,
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(lit-element|lit-html)).+\\.js$"
  ],
  // unmockedModulePathPatterns: undefined,
  verbose: true,
  // watchPathIgnorePatterns: [],
  // watchman: true,
};
